pipeline {
    agent any

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

        stage('List all test cases') {
            steps {
                bat 'npx playwright test --list'
            }
        }

        stage('Install HTTP Server') {
            steps {
                powershell '''
                    Start-Process "http-server" -ArgumentList "-p 8080" -NoNewWindow
                '''
            }
        }

        stage('Start HTTP Server') {
            steps {
                bat 'start /B http-server -p 8080'
            }
        }

        stage('Wait for HTTP Server to start') {
            steps {
                script {
                    def maxRetries = 5
                    def retryCount = 0
                    def serverReady = false

                    while (retryCount < maxRetries && !serverReady) {
                        def response = bat(
                            returnStatus: true,
                            script: 'curl -s -o nul http://127.0.0.1:8080'
                        )

                        if (response == 0) {
                            serverReady = true
                        } else {
                            echo "Waiting for HTTP Server to start..."
                            sleep(time: 1, unit: 'SECONDS')
                            retryCount++
                        }
                    }

                    if (!serverReady) {
                        error "Server is not ready after ${maxRetries} seconds"
                    }
                }
            }
        }

    }
}
