VERSION = ''
VERSION_NOT_EXIST = false

pipeline {
    agent { label 'docker-agent' }
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Get Git Info'){
            steps {
                script {
                    currentBuild.displayName = "#${BUILD_ID}-${env.GIT_COMMIT.take(7)}"
                    COMMIT_INFO = sh(returnStdout: true, script: """
                        git log -n 1 --format=full '${env.GIT_COMMIT}' | sed -r 's/^/                        /'
                    """).trim()
                    
                    echo """
                        
                        build cause: ${currentBuild.buildCauses[0].shortDescription}
                        
                        ${COMMIT_INFO}
                        
                    """
                }
            }
        }
        stage('Loading Configuration File'){        
            steps {
                script {
                    configFileProvider([configFile(fileId: 'conf', targetLocation: 'conf.groovy', variable: 'conf_path')]){
                        load conf_path
                        sh "rm -f '${conf_path}'"
                    }
                }    
            }
        }        
        stage('Check If Seed Version Exist') {
            when { branch 'master' }
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS, region: AWS_REGION){
                        VERSION = sh(returnStdout: true, script: """
                            jq -r '.version' package.json
                        """).trim()
                        VERSION_NOT_EXIST = sh(returnStdout: true, script: """
                            aws s3api head-object --bucket biot-plugin-seed --key seed_${VERSION}.zip || echo true
                        """).trim()
                        if (VERSION_NOT_EXIST != "true"){
                            VERSION_NOT_EXIST = false
                        }
                        echo """
                          VERSION_NOT_EXIST =  ${VERSION_NOT_EXIST}
                        """
                        if (VERSION_NOT_EXIST){
                            echo """
                                Version does not exist. continue
                                """
                        } else {
                            echo """
                                Version exist. stopping...
                                """
                        }
                    }
                }
            }
        }        
        stage('Install NPM') {
            when {
                expression { VERSION_NOT_EXIST } 
            }
            steps {
                withAWS(credentials: AWS_CREDENTIALS, region: AWS_REGION){
                    sh """
                        npm -version
                        node -v
                        npm install --global npm-cli-login rimraf cross-env
                        AWS_ACCOUNT_ID=\$(aws sts get-caller-identity | jq -r .Account)
                        aws codeartifact login --tool npm --repository ${NPM_REPOSITORY} --domain ${NPM_DOMAIN} --domain-owner \${AWS_ACCOUNT_ID}
                    """
                }
            }
        }
        stage('NPM Install Seed'){
            when {
                expression { VERSION_NOT_EXIST }
            }
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS, region: AWS_REGION){ 
                        sh """
                            export NODE_OPTIONS=--max_old_space_size=4096     
                            npm install
                        """
                    }
                }
            }
        }
        stage('Zip And Upload Build'){
            when {
                expression { VERSION_NOT_EXIST }
            }
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS, region: AWS_REGION){
                        sh """
                            zip -r seed_${VERSION}.zip ./  -x '*.git*' '*.gitignore*' 'CHANGELOG.md' '*.vscode*'
                            aws s3 cp seed_${VERSION}.zip s3://biot-plugin-seed/
                        """
                    }
                }
            }
        }
        stage('Git Tag'){
            when {
                branch 'master'
            }
            environment {
                GIT = credentials('github-pat')
            }
            steps {
                sh """
                    CURRENT_TAG=\$(git describe --abbrev=0 --always --tags)
                    if [ \${CURRENT_TAG} != ${VERSION} ]; then
                        set -x
                        git config --global credential.helper store
                        {
                            echo url=\$(git config --get remote.origin.url)
                            echo "username=\$GIT_USR"
                            echo "password=\$GIT_PSW"
                        } | git credential-store store
                        set +x
                        git tag "${VERSION}"
                        git push origin --tags
                    fi
                """
            }
        }
    }
    post {
        always {
            script {
                env.CURRENT_RESULT = currentBuild.currentResult
                env.BUILD_DATETIME = new Date(currentBuild.startTimeInMillis).toString()
                env.BUILD_DURATION = currentBuild.durationString.replace(' and counting', '')
                env.BUILD_CAUSE = currentBuild.buildCauses[0].shortDescription
                
                echo """
                        
                        build cause: ${env.BUILD_CAUSE}
                        started at: ${env.BUILD_DATETIME}
                        duration: ${env.BUILD_DURATION}
                        
                        ${COMMIT_INFO}
                        
                """
            }
        }
        aborted {
            echo "Pipeiline Aborted"
            slackSend (color: 'gray', message: "ABORTED: job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
        failure {
            echo "Pipeiline Faild"
            slackSend (color: 'bad', message: "FAIL: job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
        success {
            echo "Pipeiline Exited!!"
            slackSend (color: 'good', message: "DONE: job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }     
    }    
}