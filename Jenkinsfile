pipeline {
    agent any

    stages {
        stage("log the node version") {
            steps {
                script {
                    bat 'node --version'
                    bat 'npm --version'
                }
            }
        }
        stage("install playwright and dependencies") {
            steps {
                script {
                    bat 'npm -D @playwright/test'
                    bat 'npx playwright install'
                    bat 'npx playwright install-deps'
                }
            }
        }
        stage("List all test cases") {
            steps {
                script {
                    bat 'npx playwright test --list'
                }
            }
        }
    }
}
