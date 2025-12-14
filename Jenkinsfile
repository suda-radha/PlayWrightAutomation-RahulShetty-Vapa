pipeline {
    agent {
        docker {
            image 'node:20-windowsservercore'
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
