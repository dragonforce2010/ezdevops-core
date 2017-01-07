FROM ae/alnt-base:1.0
MAINTAINER Michael Zhang <michael.zhang@alertenterprise.com>

ARG DOCKER_JAR_REPOSITORY_URL

RUN mkdir -p /opt/AlertEnterprise/log

WORKDIR /app
ADD build/jars/alnt-mcpcredsvcwrapper-1.0.jar /app/alnt-mcpcredsvcwrapper-1.0.jar
VOLUME /app
ENTRYPOINT dockerize -wait tcp://alnt-configservice:${CONFIG_SERVICE_PORT} -timeout 600s && \
           dockerize -wait tcp://alnt-registry:${EUREKA_SERVICE_PORT} -timeout 600s && \
           dockerize -wait tcp://alnt-oauthservice:${OAUTH_SERVICE_PORT} -timeout 600s && \
           dockerize -wait tcp://mcp-redis:${REDIS_PORT} -timeout 600s && \
           java -DCONFIG_SERVICE_URI=http://alnt-configservice:${CONFIG_SERVICE_PORT} \
                -DCONFIG_SERVICE_PASSWORD=${CONFIG_SERVICE_PASSWORD} \
                -DCONFIG_CERTIFICATE_PATH=/app/AlertAdmin@sledevomcbapi.test.suprakim.com.pfx \
                -DARTEMIS_HOST=${ARTEMIS_HOST} \
                -DARTEMIS_PORT=${ARTEMIS_PORT} \
#                -DXdebug -Xrunjdwp:server=y,transport=dt_socket,address=${MCP_CREDENTIAL_SERVICE_DEBUG_PORT}, suspend=n \
                -jar /app/alnt-mcpcredsvcwrapper-1.0.jar