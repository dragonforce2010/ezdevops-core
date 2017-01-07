FROM ae/alnt-base:1.0
MAINTAINER Michael Zhang <michael.zhang@alertenterprise.com>

ARG DOCKER_JAR_REPOSITORY_URL

RUN mkdir -p /opt/AlertEnterprise/log

WORKDIR /app
ADD build/jars/alnt-configservice-1.0.jar /app/alnt-configservice-1.0.jar
VOLUME /tmp
ENTRYPOINT java -DCONFIG_SERVICE_PORT=${CONFIG_SERVICE_PORT} \
                -DEXTERNAL_CONFIG_PATH=${EXTERNAL_CONFIG_PATH} \
                -DCONFIG_SERVICE_PASSWORD=${CONFIG_SERVICE_PASSWORD} \
                -DEUREKA_SERVICE_PORT=${EUREKA_SERVICE_PORT} \
                -DCREDENTIAL_WRAPPER_SERVICE_PORT=${CREDENTIAL_WRAPPER_SERVICE_PORT} \
                -DMCP_CREDENTIAL_SERVICE_PORT=${MCP_CREDENTIAL_SERVICE_PORT} \
                -DMCPUM_SERVICE_PORT=${MCPUM_SERVICE_PORT} \
                -DGATEWAY_SERVICE_PORT=${GATEWAY_SERVICE_PORT} \
                -DOAUTH_SERVICE_PORT=${OAUTH_SERVICE_PORT} \
                -DOPENID_SSO_SERVICE_PORT=${OPENID_SSO_SERVICE_PORT} \
                -DSETUP_SERVICE_PORT=${SETUP_SERVICE_PORT} \
                -DSPU_SERVICE_PORT=${SPU_SERVICE_PORT} \
                -DREDIS_PORT=${REDIS_PORT} \
                -DACTIVEMQ_PORT=${ACTIVEMQ_PORT} \
                -DAPP_DB_PORT=${APP_DB_PORT} \
                -DAPP_DB_URL=${APP_DB_URL} \
                -DAPP_DB_USER=${APP_DB_USER} \
                -DAPP_DB_PASSWORD=${APP_DB_PASSWORD} \
                -DEUREKA_SERVICE_URL=${EUREKA_SERVICE_URL} \
                -DREDIS_HOST=${REDIS_HOST} \
                -DACTIVEMQ_HOST=${ACTIVEMQ_HOST} \
                -DACTIVEMQ_USER=${ACTIVEMQ_USER} \
                -DACTIVEMQ_PASSWORD=${ACTIVEMQ_PASSWORD} \
                -DOAUTH_ACCESS_TOKEN_URL=${OAUTH_ACCESS_TOKEN_URL} \
                -DOAUTH_USER_INFO_URL=${OAUTH_USER_INFO_URL} \
                -DLOGOUT_URL=${LOGOUT_URL} \
                -DSMTP_HOST=${SMTP_HOST} \
                -DSMTP_USER=${SMTP_USER} \
                -DSMTP_PASSWORD=${SMTP_PASSWORD} \
                -DSMTP_FROM=${SMTP_FROM} \
                -DARTEMIS_HOST=${ARTEMIS_HOST} \
                -DARTEMIS_PORT=${ARTEMIS_PORT} \
                -jar /app/alnt-configservice-1.0.jar