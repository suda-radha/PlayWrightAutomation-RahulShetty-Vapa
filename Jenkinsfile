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
    }
}
