pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-u root:root'
        }
    }

    stages {
        stage("log the node version") {
            steps {
                script {
                    bat 'node --version'
                }
            }
        }
    }
}
