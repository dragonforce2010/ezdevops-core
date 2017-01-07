"use strict";
/**
 * Created by michael.zhang on 1/5/17.
 */
class CommandManager {
    constructor() {
        this._commands = new Array();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CommandManager();
        }
        return this.instance;
    }
    attachCommandsToYargs(yargs) {
        this.commands.forEach(command => command.attachCommandToYargs(yargs));
    }
    registerCommand(command) {
        this.commands.push(command);
    }
    get commands() {
        return this._commands;
    }
    set commands(value) {
        this._commands = value;
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=CommandManager.js.map