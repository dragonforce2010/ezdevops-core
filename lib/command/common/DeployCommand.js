"use strict";
/**
 * Created by michael.zhang on 12/31/16.
 */
const BaseCommand_1 = require("./BaseCommand");
class DeployCommand extends BaseCommand_1.BaseCommand {
    constructor() {
        super();
    }
    static load() {
        return new DeployCommand();
    }
    attachCommandToYargs(yargs) {
        let self = this;
        yargs.command('deploy', 'deployment related commands', function (yargs) {
            self.registerSubcommandValidateComposeYml(yargs);
            self.registerSubcommandUploadCode(yargs);
            self.registerSubcommandLoginRemote(yargs);
            self.registerSubcommandRun(yargs);
        });
    }
    registerSubcommandValidateComposeYml(yargs) {
        let self = this;
        yargs.command('validate', 'validate yml files', function (yargs) {
            let command = 'docker-compose -f docker/docker-compose.yml config';
            self.execCommand(command);
        });
    }
    registerSubcommandUploadCode(yargs) {
        let self = this;
        yargs.command('upload-code', 'upload devops code', function (yargs) {
            let command = `
                scp -r ../alnt-devops ${self.configuration.remote_username}@${self.configuration.remote_ip}:${self.configuration.remote_path}
            `;
            self.execCommand(command);
        });
    }
    registerSubcommandLoginRemote(yargs) {
        let self = this;
        yargs.command('login', 'login remote server', function (yargs) {
            // self.executeInteractiveRemoteCommand(command)
            let command = `
                ssh -t -t ${self.configuration.remote_username}@${self.configuration.remote_ip}
            `;
            //self.execCommand(command)
            self.executeInteractiveRemoteCommand(command);
        });
    }
    registerSubcommandRun(yargs) {
        let self = this;
        yargs.command('run', 'Onekey deploy the the whold bulid', function (yargs) {
            yargs.option('m', {
                alias: 'mode',
                demand: false,
                type: 'string'
            });
            if (yargs.argv.m) {
                self.configuration.deploy_mode = yargs.argv.m;
            }
            let command = `
                    devops deploy validate && \
                    ${self.configuration.deploy_mode.localeCompare('remote') == 0 ? 'devops deploy upload-code && \\' : ''}
                    devops services remove-all && \
                    devops images clean -c && \
                    devops svn checkout && \
                    devops mvn build && \
                    devops services start-all
                `;
            if (self.configuration.deploy_mode.localeCompare('local') == 0) {
                self.execCommand(command);
            }
            if (self.configuration.deploy_mode.localeCompare('remote') == 0) {
                self.executeInteractiveRemoteCommand(command);
            }
        });
    }
}
exports.DeployCommand = DeployCommand;
