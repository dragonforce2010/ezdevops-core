#!/bin/bash
mkdir -p /home/broker/artemis
cd /home/MCPBuilds/artemis/bin
/home/MCPBuilds/artemis/bin/artemis create --encoding UTF-8 --home /home/MCPBuilds/artemis/ --password password --user user --directory /home/broker/artemis --role amq --allow-anonymous
yes|cp /opt/broker.xml /home/broker/artemis/etc/
"/home/broker/artemis/bin/artemis" run

