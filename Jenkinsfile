pipeline {
    agent any

    environment {
        PROJECT_ID = 'byteeit-testing-project'
        REGION = 'us-central1'
        SERVICE_NAME = 'calculator-service'  // Change if needed
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/VinenTik/calculator_project.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                script {
                    dir('backend') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                script {
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy Backend to Cloud Run') {
            steps {
                script {
                    sh """
                        gcloud builds submit --pack image=gcr.io/$PROJECT_ID/calculator-backend --region=$REGION
                        gcloud run deploy $SERVICE_NAME-backend --image=gcr.io/$PROJECT_ID/calculator-backend --region=$REGION --platform=managed --allow-unauthenticated
                    """
                }
            }
        }

        stage('Deploy Frontend to Cloud Run') {
            steps {
                script {
                    sh """
                        gcloud builds submit --pack image=gcr.io/$PROJECT_ID/calculator-frontend --region=$REGION
                        gcloud run deploy $SERVICE_NAME-frontend --image=gcr.io/$PROJECT_ID/calculator-frontend --region=$REGION --platform=managed --allow-unauthenticated
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful! Visit the Cloud Run URLs to access your app."
        }
        failure {
            echo "Deployment failed. Check Jenkins logs for details."
        }
    }
}
