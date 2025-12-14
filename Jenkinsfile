pipeline {
    agent any

    stages {
        stage('Log Node version') {
            steps {
                poweshell 'node --version' 
                poweshell 'npm --version'
            }
        }

        stage('Install Playwright and dependencies') {
            steps {
                poweshell 'npm install -D @playwright/test'
                poweshell 'npx playwright install'
            }
        }

        stage('List all test cases') {
            steps {
                poweshell 'npx playwright test --list'
            }
        }
    }
}
