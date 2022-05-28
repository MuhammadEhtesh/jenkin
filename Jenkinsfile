pipeline {
    agent any
    
    environment {
            Appcmd = "C:\\Windows\\System32\\inetsrv\\appcmd.exe"
            Nuget = credentials('Nuget')
            CURRENT_BRANCH = "${GIT_BRANCH}"
            Error = ""
        }

    stages {
        stage("clean workspace"){
            steps{
                try{
                    bat 1/0;
                    cleanWs();
                }
                catch(e){
                    script {
                        Error = e;
                    }
                }
                
            }
        }

        stage ('git code checkout') {
            steps {
                    checkout scm
                }
            }
    }
    post {
        success {
            emailext attachLog: false, body: "Pipeline successful.", subject: "Build Success: ${JOB_NAME} | ${BUILD_NUMBER}.", to: "muhammadehteshambhatti@gmail.com", mimeType: "text/html"
        }
        failure {
            emailext attachLog: false, body: "Pipeline failed.", subject: "Build Failed: ${JOB_NAME} | ${BUILD_NUMBER}.", to: "muhammadehteshambhatti@gmail.com", mimeType: "text/html"
        }
    }
}
