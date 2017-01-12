import {ICommand} from "./ICommand";
/**
 * Created by michael.zhang on 1/5/17.
 */
export class CommandManager {
    private _commands: Array<ICommand>
    private static instance: CommandManager

    constructor() {
        this._commands = new Array<ICommand>()
    }

    public static getInstance(): CommandManager {
        if(!this.instance) {
            this.instance = new CommandManager()
        }
        return this.instance
    }

    public attachCommandsToYargs(yargs) {
        this.commands.forEach(command => command.attachCommandToYargs(yargs))
    }

    public registerCommand(command: ICommand): void {
        this.commands.push(command)
    }

    get commands(): Array<ICommand> {
        return this._commands;
    }

    set commands(value: Array<ICommand>) {
        this._commands = value;
    }
}