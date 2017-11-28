pipeline {
    agent any
    stages{
        stage('Clone repository') {
            steps {
                script {
                    /* Let's make sure we have the repository cloned to our workspace */

                    checkout scm
                }
            }
        }
        
        stage('Get Key') {
            steps {
                sh 'cp /var/jenkins_home/secrets/id_rsa .'
                sh 'cp /var/jenkins_home/secrets/id_rsa.pub .'
            }
        }

        stage('Build image') {
            steps {
                script {
                    /* This builds the actual image; synonymous to
                     * docker build on the command line */

                    docker.build("quarantine-service:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Test image') {
            steps {
                script {
                    /* Ideally, we would run a test framework against our image.
                     * For this example, we're using a Volkswagen-type approach ;-) */

                    docker.image("quarantine-service:${env.BUILD_NUMBER}").inside {
                        sh 'cd /usr/src/app;npm run test'
                    }

                    docker.image("quarantine-service:${env.BUILD_NUMBER}").inside {
                        sh 'cd /usr/src/app;npm run deployMetrics'
                    }
                }
            }
        }

        stage('Push image') {
            steps {
                script {
                    /* Finally, we'll push the image with a tag:
                     * First, the incremental build number from Jenkins */
                    sh("eval \$(aws ecr get-login --no-include-email --region us-west-2| sed 's|https://||')")
                    docker.withRegistry('https://147180035125.dkr.ecr.us-west-2.amazonaws.com', 'ecr:us-west-2:test-ecr') {
                        docker.image("quarantine-service:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }
    }

    post
    {
        always
        {
            // make sure that the Docker image is removed
            sh "docker rmi quarantine-service:${env.BUILD_NUMBER} | true"
        }
    }
}