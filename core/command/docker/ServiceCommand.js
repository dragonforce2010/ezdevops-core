"use strict";
const BaseCommand_1 = require("../common/BaseCommand");
class ServiceCommand extends BaseCommand_1.BaseCommand {
    constructor() {
        super();
        //console.log('Load subcommand: service')
    }
    static load() {
        return new ServiceCommand();
    }
    attachCommandToYargs(yargs) {
        let self = this;
        yargs.command('services', 'service related commands', function (yargs) {
            self.registerSubcommandLs(yargs);
            self.registerSubcommandStartAll(yargs);
            self.registerSubcommandStar(yargs);
            self.registerSubcommandStopAll(yargs);
            self.registerSubcommandStop(yargs);
            self.registerSubcommandRemoveAll(yargs);
            self.registerSubcommandEnter(yargs);
        });
        return yargs;
    }
    registerSubcommandLs(yargs) {
        let self = this;
        yargs.command('ls', 'list all the service', function (yargs) {
            let command = 'docker-compose -f $(pwd)/docker/docker-compose.yml ps';
            self.execCommand(command);
            yargs.option('-n', {
                alias: 'name',
                demand: false,
                describe: 'service name',
                type: 'string'
            })
                .help('h')
                .alias('h', 'help')
                .example('mcp service ls', 'mcp service ls example');
        });
    }
    registerSubcommandStartAll(yargs) {
        let self = this;
        yargs.command('start-all', 'start all the service', function (yargs) {
            let command = `
                docker-compose -f $(pwd)/docker/docker-compose.yml up -d && \
                docker-compose -f $(pwd)/docker/docker-compose.yml logs -f
            `;
            self.execCommand(command);
            yargs.option('-n', {
                alias: 'name',
                demand: false,
                describe: 'service name',
                type: 'string'
            })
                .help('h')
                .alias('h', 'help')
                .example('mcp service ls', 'mcp service ls example');
        });
    }
    registerSubcommandStopAll(yargs) {
        let self = this;
        yargs.command('stop-all', 'stop all the service', function (yargs) {
            let command = 'docker-compose -f $(pwd)/docker/docker-compose.yml stop';
            self.execCommand(command);
            yargs.option('-n', {
                alias: 'name',
                demand: false,
                describe: 'service name',
                type: 'string'
            })
                .help('h')
                .alias('h', 'help')
                .example('mcp service ls', 'mcp service ls example');
        });
    }
    registerSubcommandStar(yargs) {
        let self = this;
        yargs.command('start', 'start the specified service', function (yargs) {
            yargs.option('s', {
                alias: 'service-name',
                demand: true,
                describe: 'service name',
                type: 'string'
            }).option('c', {
                alias: 'clean',
                describe: 'service name',
                boolean: true
            })
                .help('h')
                .alias('h', 'help')
                .example('devops services start -s alnt-registry', 'start alnt-registry service');
            let command;
            if (yargs.argv.c) {
                command = `
                    docker-compose -f $(pwd)/docker/docker-compose.yml stop ${yargs.argv.s} && \
                    docker-compose -f $(pwd)/docker/docker-compose.yml rm -f ${yargs.argv.s} && \
                    docker-compose -f $(pwd)/docker/docker-compose.yml up -d ${yargs.argv.s}
                `;
            }
            else {
                command = `
                    docker-compose -f $(pwd)/docker/docker-compose.yml up -d ${yargs.argv.s}
                `;
            }
            self.execCommand(command);
        });
    }
    registerSubcommandStop(yargs) {
        let self = this;
        yargs.command('stop', 'stop the specified service', function (yargs) {
            yargs.option('-s', {
                alias: 'service-name',
                demand: true,
                describe: 'service name',
                type: 'string'
            })
                .help('h')
                .alias('h', 'help')
                .example('devops services stop -s alnt-registry', 'stop alnt-registry service');
            let command = 'docker-compose -f $(pwd)/docker/docker-compose.yml stop ' + yargs.argv.s;
            self.execCommand(command);
        });
    }
    registerSubcommandRemoveAll(yargs) {
        let self = this;
        yargs.command('remove-all', 'stop and remove all the services', function (yargs) {
            let command = `
                docker-compose -f $(pwd)/docker/docker-compose.yml stop && \
                docker-compose -f $(pwd)/docker/docker-compose.yml rm -f
            `;
            self.execCommand(command);
            yargs.option('-n', {
                alias: 'name',
                demand: false,
                describe: 'service name',
                type: 'string'
            })
                .help('h')
                .alias('h', 'help')
                .example('mcp service ls', 'mcp service ls example');
        });
    }
    registerSubcommandEnter(yargs) {
        let self = this;
        yargs.command('enter', 'enter the specified service', function (yargs) {
            yargs.option('-s', {
                alias: 'service-name',
                demand: true,
                describe: 'service name',
                type: 'string'
            })
                .help('h')
                .alias('h', 'help')
                .example('devops services enter -s alnt-registry', 'enter alnt-registry service');
            let command = 'docker-compose -f $(pwd)/docker/docker-compose.yml exec ' + yargs.argv.s + ' /bin/bash';
            console.log('command:' + command);
            self.execCommand(command);
        });
    }
    registerSubcommandPatch(yargs) {
        let self = this;
        yargs.command('patch', 'path the specified service and restart it', function (yargs) {
            yargs.option('-s', {
                alias: 'service-name',
                demand: true,
                describe: 'service name',
                type: 'string'
            }).option('l', {
                alias: 'jar-location',
                demand: true,
                type: 'string'
            })
                .help('h')
                .alias('h', 'help')
                .example('devops services patch -s alnt-registry -l /root/alnt-registry.jar', 'path the specified service and restart it')
                .example('devops services patch -s alnt-registry -l root@172.16.35.10:~/build/alnt-registry.jar', 'path the specified service and restart it');
            let serviceName = yargs.argv.s;
            let patchLocation = yargs.argv.l;
            let command = `
                    ${self.configuration.deploy_mode.localeCompare('local') == 0 ?
                'cp ' + patchLocation + 'build/jars' :
                'scp ' + patchLocation + self.configuration.remote_username
                    + '@'
                    + self.configuration.remote_ip
                    + ':'
                    + self.configuration.remote_path
                    + 'devops/build/jars'}  
                    && \
                    docker-compose -f $(pwd)/docker/docker-compose.yml up -d ${serviceName} --build
                `;
            console.log('command:' + command);
            self.execCommand(command);
        });
    }
}
exports.ServiceCommand = ServiceCommand;
//# sourceMappingURL=ServiceCommand.js.map