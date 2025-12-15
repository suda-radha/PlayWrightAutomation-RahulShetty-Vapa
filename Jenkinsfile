pipeline {
    agent any

    environment {
        PLAYWRIGHT_SNAPSHOT_DIR = "${env.WORKSPACE}\\tests\\tests-udemy-vapa\\visual.spec.js-snapshots"
    }

    stages {

        stage('Log Node version') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Playwright and dependencies') {
            steps {
                bat 'npm install -D @playwright/test'
                bat 'npx playwright install'
            }
        }

        stage('Install HTTP Server') {
            steps {
                bat 'npm install -g http-server'
            }
        }

        stage('Start HTTP Server') {
            steps {
                bat '''
                    cd %WORKSPACE%
                    start "" /B cmd /c "npx http-server -p 5500 -c-1 > server.log 2>&1"
                '''
            }
        }

        stage('Wait for HTTP Server to start') {
            steps {
                powershell '''
                    $maxRetries = 30
                    $sleepSeconds = 2
                    $retryCount = 0
                    $serverReady = $false

                    while ($retryCount -lt $maxRetries -and -not $serverReady) {
                        try {
                            Invoke-WebRequest http://127.0.0.1:5500 -UseBasicParsing -TimeoutSec 1
                            $serverReady = $true
                        } catch {
                            Write-Host "Waiting for HTTP Server to start on port 5500..."
                            Start-Sleep -Seconds $sleepSeconds
                            $retryCount++
                        }
                    }

                    if (-not $serverReady) {
                        throw "Server is not ready after $($maxRetries * $sleepSeconds) seconds"
                    }
                '''
            }
        }

        stage('List all test cases') {
            steps {
                bat 'npx playwright test --list'
            }
        }

        stage('Run Playwright tests') {
            steps {
                // Generate HTML report
                bat 'npx playwright test tests/tests-udemy-vapa --reporter=html'
            }
        }

    }

    post {
        always {
            // Stop HTTP Server
            powershell '''
                $port = 5500
                $processIds = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
                              Select-Object -ExpandProperty OwningProcess -Unique
                foreach ($procId in $processIds) {
                    Write-Host "Stopping process with PID $procId listening on port $port"
                    Stop-Process -Id $procId -Force
                }
            '''

            // Archive Playwright HTML report for Jenkins
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            // Publish HTML report plugin (clickable link in Jenkins)
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report',
                keepAll: true,
                alwaysLinkToLastBuild: true, // <-- ensures report is not missing
                allowMissing: false
            ])
        }

        failure {
            echo 'Some tests failed! Check HTML report and console output for details.'
        }
    }
}

