pipeline {
    agent any

    environment {
            Appcmd = "C:\\Windows\\System32\\inetsrv\\appcmd.exe"
            Nuget = credentials('Nuget')
            CURRENT_BRANCH = "${GIT_BRANCH}"
            PIPELINE_ERROR = ""
        }

    stages {

        // stage('content'){
        //     steps {
        //         script {
        //             logFileContent = new File("${JENKINS_HOME}\\jobs\\jenkin\\branches\\${GIT_BRANCH}\\builds\\${BUILD_NUMBER}\\log").collect {it}
        //             bat "echo ${logFileContent}"
        //         }
        //     }
        // }
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
                    error 'Throw erro'
                }
            }
    }
    post {
        success {
            emailext attachLog: true, body: "Pipeline successful.", subject: "Build Success: ${JOB_NAME} | ${BUILD_NUMBER}.", to: "muhammadehteshambhatti@gmail.com", mimeType: "text/html"
        }
        failure {
            dir("${JENKINS_HOME}\\jobs\\jenkin\\branches\\${GIT_BRANCH}\\builds\\${BUILD_NUMBER}") {
                        fileOperations([
                            fileCopyOperation(excludes: "", flattenFiles: true, includes: "log", targetLocation: "${workspace}\\LogFileFolder")
                            ])
            }

            dir("${workspace}\\LogFileFolder"){
                    fileOperations([fileRenameOperation(destination: 'log.txt', source: 'log')])
                    emailext attachLog: true, attachmentsPattern: "log.txt", body: "Pipeline failed.", subject: "Build Failed: ${JOB_NAME} | ${BUILD_NUMBER}.", to: "muhammadehteshambhatti@gmail.com", mimeType: "text/html"
                }
        }
    }
}