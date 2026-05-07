pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build Docker Images') {
      steps {
        script {
          sh 'docker build -t lab27-backend:latest ./backend'
          sh 'docker build -t lab27-frontend:latest ./frontend'
        }
      }
    }
    stage('Deploy with Docker Compose') {
      steps {
        script {
          sh 'docker-compose down'
          sh 'docker-compose up -d'
        }
      }
    }
    stage('Verify Services') {
      steps {
        script {
          sh 'docker-compose ps'
          sh 'sleep 5'
          sh 'docker-compose logs backend | head -20'
          sh 'docker-compose logs frontend | head -20'
        }
      }
    }
  }
  post {
    always {
      sh 'docker compose logs > pipeline-logs.txt'
      archiveArtifacts artifacts: 'pipeline-logs.txt', allowEmptyArchive: true
    }
    success {
      echo 'Pipeline completed successfully! Services are running on:'
      echo 'Frontend: http://localhost:3000'
      echo 'Backend: http://localhost:8000'
      echo 'MongoDB: mongodb://localhost:27017'
    }
    failure {
      echo 'Pipeline failed. Check the logs above.'
    }
  }
}

