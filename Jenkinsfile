pipeline {
    agent any

    stages {
        stage('Log Node version') {
            steps {
                powershell 'node --version' 
                powershell 'npm --version'
            }
        }

        stage('Install Playwright and dependencies') {
            steps {
                powershell 'npm install -D @playwright/test'
                powershell 'npx playwright install'
            }
        }

        stage('List all test cases') {
            steps {
                powershell 'npx playwright test --list'
            }
        }
    }
}
