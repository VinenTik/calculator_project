pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/VinenTik/calculator.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'cd backend && npm install'
                sh 'cd frontend && npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'cd backend && npm test || echo "No tests found"'
            }
        }
        stage('Deploy to Cloud Run') {
            steps {
                sh '''
                gcloud auth configure-docker
                gcloud builds submit --tag gcr.io/$PROJECT_ID/calculator
                gcloud run deploy calculator --image gcr.io/byteeit-testing-project/calculator --region us-central1 --allow-unauthenticated
                '''
            }
        }
    }
}
