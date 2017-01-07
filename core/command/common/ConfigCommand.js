/**

 * Created by michael.zhang on 12/31/16.
 */
"use strict";
const BaseCommand_1 = require("./BaseCommand");
const ConfigManager_1 = require("../../config/ConfigManager");
class ConfigCommand extends BaseCommand_1.BaseCommand {
    constructor() {
        super();
        this.configManager = new ConfigManager_1.ConfigManager();
    }
    static load() {
        return new ConfigCommand();
    }
    attachCommandToYargs(yargs) {
        let self = this;
        yargs.command('config', 'configuration commands', function (yargs) {
            yargs.option('p', {
                alias: 'projectName',
                demand: false,
                descript: 'your project name',
                type: 'string'
            });
            yargs.option('m', {
                alias: 'deploy-mode',
                demand: false,
                descript: 'specify deploy mode',
                type: 'string'
            });
            yargs.option('i', {
                alias: 'remote-ip',
                demand: false,
                descript: 'specify remote ip',
                type: 'string'
            });
            yargs.option('u', {
                alias: 'remote-username',
                demand: false,
                descript: 'specify remote user name',
                type: 'string'
            });
            let projectName = yargs.argv.p;
            let deployMode = yargs.argv.m;
            let remoteIp = yargs.argv.i;
            let remoteUserName = yargs.argv.u;
            let configuration = self.configManager.getConfiguration();
            if (projectName)
                configuration.project_name = projectName;
            if (deployMode)
                configuration.deploy_mode = deployMode;
            if (remoteIp)
                configuration.remote_ip = remoteIp;
            if (remoteUserName)
                configuration.remote_username = remoteUserName;
            self.configManager.setConfiguration(configuration);
            self.configManager.printConfiguration();
        });
    }
}
exports.ConfigCommand = ConfigCommand;
`
Install node
For Enterprise linux（oracle/centos...）:
curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -
yum -y install nodejs

For Debian
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs

For Mac
brew install node

Install docker

Install Maven

Install svn
`;
//# sourceMappingURL=ConfigCommand.js.map