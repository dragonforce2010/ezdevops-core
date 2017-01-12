///<reference path="../../typings/tsd.d.ts"/>
"use strict";
const BaseCommand_1 = require("../common/BaseCommand");
const ConfigManager_1 = require("../../config/ConfigManager");
const ServiceCommand_1 = require("../docker/ServiceCommand");
class SvnCommand extends BaseCommand_1.BaseCommand {
    constructor() {
        super();
        this.configuration = ConfigManager_1.ConfigManager.getInstance().getConfiguration();
    }
    static load() {
        return new ServiceCommand_1.ServiceCommand();
    }
    attachCommandToYargs(yargs) {
        let self = this;
        yargs.command('svn', 'svn related commands', function (yargs) {
            yargs.command('checkout', 'Check out projects from SVN', function () {
                let command = `
                rm -rf  build/sourceCode/alnt-* && \
                `;
                for (let index in self.configuration.svn_projects) {
                    let projectName = self.configuration.svn_projects[index];
                    console.log(self.configuration.svn_projects[index]);
                    command += `svn checkout ${self.configuration.svn_rooturl}/${projectName} build/sourceCode/${projectName} && \\`;
                }
                command += `
                    rm -rf build/config/* && \
                    cp -r build/sourceCode/alnt-configservice/src/main/resources/shared/* build/config/
                `;
                self.execCommand(command);
            });
        });
        return yargs;
    }
}
exports.SvnCommand = SvnCommand;
