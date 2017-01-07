FROM ae/alnt-base:1.0
MAINTAINER Michael Zhang <michael.zhang@alertenterprise.com>


WORKDIR /app
ADD build/jars/alnt-mcp-liquibase-1.0.jar /app/alnt-mcp-liquibase-1.0.jar
VOLUME /app

ENTRYPOINT dockerize -wait tcp://alnt-mcpcredsvcwrapper:${MCP_CREDENTIAL_SERVICE_PORT} -timeout 600s && \
           java -DAPP_DB_URL=${APP_DB_URL} \
                -DAPP_DB_USER=${APP_DB_USER} \
                -DAPP_DB_PASSWORD=${APP_DB_PASSWORD} \
                -DAPP_DB_DRIVER_CLASS=com.mysql.jdbc.Driver \
                -DFOLDER_NAME=mcp \
                -jar /app/alnt-mcp-liquibase-1.0.jar