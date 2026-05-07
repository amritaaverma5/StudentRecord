pipeline {
  agent any
  stages {
    stage('Install backend dependencies') {
      steps {
        dir('backend') {
          sh 'npm install'
        }
      }
    }
    stage('Install frontend dependencies') {
      steps {
        dir('frontend') {
          sh 'npm install'
        }
      }
    }
    stage('Build frontend') {
      steps {
        dir('frontend') {
          sh 'CI=true npm run build'
        }
      }
    }
    stage('Build Docker images') {
      steps {
        script {
          docker.build('lab27-backend', 'backend')
          docker.build('lab27-frontend', 'frontend')
        }
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'frontend/build/**', allowEmptyArchive: true
    }
  }
}
