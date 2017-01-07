"use strict";
const BaseCommand_1 = require("../common/BaseCommand");
class LogCommand extends BaseCommand_1.BaseCommand {
    constructor() {
        super();
        //console.log('Load subcommand: logs')
    }
    static load() {
        return new LogCommand();
    }
    attachCommandToYargs(yargs) {
        let self = this;
        yargs.command('logs', 'log related commands', function (yargs) {
            self.registerSubCommand(yargs);
        });
        return yargs;
    }
    registerSubCommand(yargs) {
        let self = this;
        yargs.command('show', 'show logs', function (yargs) {
            yargs.option('s', {
                alias: 'service',
                demand: true,
                describe: 'service name',
                type: 'string'
            })
                .help('h')
                .alias('h', 'help')
                .example('mcp service ls', 'mcp service ls example');
            let command = 'docker-compose -f $(pwd)/docker/docker-compose.yml logs -f ' + yargs.argv.s;
            self.execCommand(command);
        });
    }
}
exports.LogCommand = LogCommand;
//# sourceMappingURL=LogCommand.js.map