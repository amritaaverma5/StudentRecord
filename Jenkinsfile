pipeline {
  agent any
  options {
    skipDefaultCheckout(true)
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Deploy with Docker Compose') {
      steps {
        script {
          sh 'docker-compose -p lab27 up -d --build --remove-orphans'
        }
      }
    }
    stage('Verify Services') {
      steps {
        script {
          sh 'docker-compose -p lab27 ps'
          sh 'sleep 5'
          sh 'docker-compose -p lab27 logs backend | head -20'
          sh 'docker-compose -p lab27 logs frontend | head -20'
        }
      }
    }
  }
  post {
    always {
      sh 'docker-compose -p lab27 logs --no-color > pipeline-logs.txt || true'
      archiveArtifacts artifacts: 'pipeline-logs.txt', allowEmptyArchive: true
    }
    success {
      echo 'Pipeline completed successfully! Services are running on:'
      echo 'Frontend: http://localhost:3000'
      echo 'Backend: http://localhost:8000'
      echo 'MongoDB: mongodb://localhost:27018'
    }
    failure {
      echo 'Pipeline failed. Check the logs above.'
    }
  }
}

