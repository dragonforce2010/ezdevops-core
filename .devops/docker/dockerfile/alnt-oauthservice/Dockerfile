FROM ae/alnt-base:1.0
MAINTAINER Michael Zhang <michael.zhang@alertenterprise.com>

ARG DOCKER_JAR_REPOSITORY_URL

RUN mkdir -p /opt/AlertEnterprise/log

WORKDIR /app
ADD build/jars/alnt-oauthservice-1.0.jar /app/alnt-oauthservice-1.0.jar
VOLUME /app

ENTRYPOINT dockerize -wait tcp://alnt-configservice:${CONFIG_SERVICE_PORT} -timeout 600s && \
           dockerize -wait tcp://alnt-registry:${EUREKA_SERVICE_PORT} -timeout 600s && \
           dockerize -wait tcp://alnt-setupservice:${SETUP_SERVICE_PORT} -timeout 600s && \
           dockerize -wait tcp://mcp-redis:${REDIS_PORT} -timeout 600s && \
           dockerize -wait tcp://app_db:${APP_DB_PORT} -timeout 600s && \
           java -DCONFIG_SERVICE_URI=http://alnt-configservice:${CONFIG_SERVICE_PORT} \
                -DCONFIG_SERVICE_PASSWORD=${CONFIG_SERVICE_PASSWORD} \
#                -DXdebug -Xrunjdwp:server=y,transport=dt_socket,address=${OAUTH_SERVICE_DEBUG_PORT}, suspend=n \
                -jar /app/alnt-oauthservice-1.0.jar
