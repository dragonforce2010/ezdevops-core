FROM java:8

RUN mkdir -p /home/MCPBuilds
RUN cd /home/MCPBuilds && wget -q http://www-us.apache.org/dist/activemq/activemq-artemis/1.5.0/apache-artemis-1.5.0-bin.tar.gz && \
  wget -q http://www.us.apache.org/dist/activemq/activemq-artemis/1.5.0/apache-artemis-1.5.0-bin.tar.gz.asc && \
  wget -q http://apache.org/dist/activemq/KEYS && \
  gpg --import KEYS && \
  gpg apache-artemis-1.5.0-bin.tar.gz.asc && \
  tar xfz apache-artemis-1.5.0-bin.tar.gz && \
  ln -s apache-artemis-1.5.0 artemis && \
  rm -f apache-artemis-1.5.0-bin.tar.gz KEYS apache-artemis-1.5.0-bin.tar.gz.asc

#ADD docker/dockerfile/alnt-artemis/apache-artemis-1.5.0 /home/MCPBuilds/artemis/
ADD docker/dockerfile/alnt-artemis/artemis.sh /home/MCPBuilds/bin/
ADD docker/dockerfile/alnt-artemis/broker.xml /opt/

VOLUME /home/alertdev/MCPBuilds/artemis

EXPOSE 8161
EXPOSE 61616
EXPOSE 61617

RUN chmod 777 /home/MCPBuilds/bin/artemis.sh
ENTRYPOINT /home/MCPBuilds/bin/artemis.sh