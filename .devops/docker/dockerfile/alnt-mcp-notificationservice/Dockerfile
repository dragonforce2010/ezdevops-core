FROM ae/alnt-base:1.0
MAINTAINER Michael Zhang <michael.zhang@alertenterprise.com>

ARG DOCKER_JAR_REPOSITORY_URL

RUN mkdir -p /opt/AlertEnterprise/log

WORKDIR /app
#Uncomment if you want to get the latest jar from Artifactory, By Default /app is mounted to host build folder.
#RUN wget ${DOCKER_JAR_REPOSITORY_URL}/alnt-mcp-notificationservice.jar
ADD build/jars/alnt-mcp-notificationservice-1.0.jar /app/alnt-mcp-notificationservice-1.0.jar
VOLUME /app
ENTRYPOINT dockerize -wait tcp://alnt-configservice:${CONFIG_SERVICE_PORT} -timeout 600s && \
           dockerize -wait tcp://alnt-registry:${EUREKA_SERVICE_PORT} -timeout 600s && \
           java -DCONFIG_SERVICE_URI=http://alnt-configservice:${CONFIG_SERVICE_PORT} \
                -DCONFIG_SERVICE_PASSWORD=${CONFIG_SERVICE_PASSWORD} \
                -DARTEMIS_HOST=${ARTEMIS_HOST} \
                -DARTEMIS_PORT=${ARTEMIS_PORT} \
                -jar /app/alnt-mcp-notificationservice-1.0.jar