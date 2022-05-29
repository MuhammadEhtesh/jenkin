pipeline {
    agent any

    environment {
            Appcmd = "C:\\Windows\\System32\\inetsrv\\appcmd.exe"
            Nuget = credentials('Nuget')
            CURRENT_BRANCH = "${GIT_BRANCH}"
            PIPELINE_ERROR = ""
        }

    stages {

        stage("Stage 1") {
           steps {
               script {
                   def file = new File("${JENKINS_HOME}/jobs/${JOB_NAME}/branches/${GIT_BRANCH}/builds/${BUILD_NUMBER}/log").collect {it}
                   bat "echo ${file}"
               }
           }
        }

        stage("clean workspace"){
            steps{
                script {
                    try{
                        cleanWs();
                    }
                    catch(e){
                        PIPELINE_ERROR = e;
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
            emailext attachLog: false, attachmentsPattern: "${JENKINS_HOME}\\jobs\\${JOB_NAME}\\branches\\${GIT_BRANCH}\\builds\\${BUILD_NUMBER}\\log", body: "Pipeline failed.", subject: "Build Failed: ${JOB_NAME} | ${BUILD_NUMBER}.", to: "muhammadehteshambhatti@gmail.com", mimeType: "text/html"
        }
    }
}


// node {
//     try{
//         error 'This pipeline fail.'
//     }
//     catch(e){
        
        
//         emailext attachLog: true, body: "Pipeline failed with error: ${e}", subject: "Pipeline Failed, Job name: ${JOB_NAME} | ${BUILD_NUMBER}.", to: "muhammadehteshambhatti@gmail.com", mimeType: "text/html"
//     }
// }