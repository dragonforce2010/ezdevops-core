"use strict";
const BaseCommand_1 = require("./BaseCommand");
/**
 * Created by michael.zhang on 1/4/17.
 */
class RemoteCommand extends BaseCommand_1.BaseCommand {
    constructor() {
        super();
    }
    static load() {
        return new RemoteCommand();
    }
    attachCommandToYargs(yargs) {
        let self = this;
        yargs.command('remote', 'remote exection commands', function (yargs) {
            self.registerSubcommandLogin(yargs);
            self.registerSubcommandExec(yargs);
        });
    }
    registerSubcommandLogin(yargs) {
        let self = this;
        yargs.command('login', 'login into remote server', function (yargs) {
            let command = `echo 'Successfully login in to remote server'`;
            self.executeInteractiveRemoteCommand(command, null, () => self.printRemoteCliTitle());
        });
    }
    registerSubcommandExec(yargs) {
        let self = this;
        yargs.command('exec', 'exec remote command without login', function (yargs) {
            let args = yargs.argv._;
            if (args) {
                let command = args[args.length - 1];
                self.execRemoteCommand(command);
            }
        });
    }
}
exports.RemoteCommand = RemoteCommand;
//# sourceMappingURL=RemoteCommand.js.map