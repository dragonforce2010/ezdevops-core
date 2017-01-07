import {ICommand} from "./ICommand";
import {BaseCommand} from "./BaseCommand";
/**
 * Created by michael.zhang on 1/4/17.
 */
export class RemoteCommand extends BaseCommand implements ICommand {

    constructor() {
        super()
    }

    public static load(): RemoteCommand {
        return new RemoteCommand()
    }

    attachCommandToYargs(yargs) {
        let self = this
        yargs.command('remote', 'remote exection commands', function(yargs) {
            self.registerSubcommandLogin(yargs)
            self.registerSubcommandExec(yargs)
        })
    }

    public registerSubcommandLogin(yargs) {
        let self = this
        yargs.command('login', 'login into remote server', function(yargs) {
            let command = `echo 'Successfully login in to remote server'`
            self.executeInteractiveRemoteCommand(command, null, () => self.printRemoteCliTitle())
        })
    }

    public registerSubcommandExec(yargs) {
        let self = this
        yargs.command('exec', 'exec remote command without login', function(yargs) {
            let args = yargs.argv._
            if(args) {
                let command = args[args.length - 1]
                self.execRemoteCommand(command)
            }

        })
    }
}