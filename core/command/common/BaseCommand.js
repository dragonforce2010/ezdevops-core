/**
 * Created by michael.zhang on 12/30/16.
 */
"use strict";
const shell = require('shelljs');
const sshExec = require("ssh-exec");
const ConfigManager_1 = require("../../config/ConfigManager");
const readline_1 = require("readline");
const CommandManager_1 = require("./CommandManager");
const ThemeManager_1 = require("../../theme/ThemeManager");
class BaseCommand {
    constructor() {
        CommandManager_1.CommandManager.getInstance().registerCommand(this);
        this.configManager = new ConfigManager_1.ConfigManager();
        this.configuration = this.configManager.getConfiguration();
        this.remoteCommandPWD = this.configuration.remote_path;
        this.remoteTitleStartFlag = '╭─';
        this.remoteCommandStartFlag = '╰─➤  ';
        this.PrintUtil = require('../../utils/PrintUtil');
    }
    printCommandDescription() {
        let commands = CommandManager_1.CommandManager.getInstance().commands;
        commands.forEach(command => command.printCommandDescription());
    }
    static load() {
        return new BaseCommand();
    }
    attachCommandToYargs(yargs) {
        yargs.command('help', 'show helps of all the commands', function (yargs) {
            let currentTheme = ThemeManager_1.ThemeManager.getInstance().getCurrentTheme();
            currentTheme.printLanddingAsciiArt(null);
            currentTheme.printLanddingTitle('ezDevOps', () => {
                currentTheme.printAuthInfo(null);
                currentTheme.printSoftInfo(null);
            });
        });
    }
    execCommand(command, cb = null, skipErrors = false) {
        let self = this;
        shell.exec(command, function (err, stdout, stderr) {
            if (err && !skipErrors) {
                self.PrintUtil.print(stderr, 'error');
            }
            if (cb)
                cb();
        });
    }
    execCommandWithCallbacks(command, skipErrors, callback) {
        let self = this;
        shell.exec(command, function (err, stdout, stderr) {
            if (err && !skipErrors) {
                self.PrintUtil.print(stderr, 'error');
            }
            else {
                callback();
            }
        });
    }
    execCommands(commands) {
        if (!commands)
            return;
        commands.forEach(command => {
            this.execCommand(command);
        });
    }
    executeInteractiveRemoteCommand(command, initPath = null, cb = null) {
        let self = this;
        self.printRemoteCliTitle();
        let rl = readline_1.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        self.execRemoteCommand(command, cb, initPath);
        rl.on('line', line => {
            if ('exit'.localeCompare(line) == 0) {
                rl.close();
                process.exit(0);
            }
            let cmd = line;
            self.execRemoteCommand(cmd, () => self.printRemoteCliTitle());
        });
    }
    execRemoteCommand(command, cb = null, initPath = null) {
        // console.log('remote command:' + command)
        let self = this;
        if (initPath)
            this.remoteCommandPWD = initPath;
        let cmd = `cd ${this.remoteCommandPWD} && ${command}`;
        sshExec(cmd, this.configuration.remote_username + '@' + this.configuration.remote_ip, (err, stdout, stderr) => {
            if (err) {
                self.PrintUtil.print("Wrong command, error raised!", 'error');
                console.log("Command: " + command);
                this.printRemoteCliTitle();
                return;
            }
            if (command.trim().startsWith('cd ')) {
                let path = command.trim().split(' ')[1];
                if (path.trim().startsWith('/')) {
                    self.remoteCommandPWD = path;
                }
                else if ('..'.localeCompare(path) == 0) {
                    if (self.remoteCommandPWD.lastIndexOf('/') != -1)
                        self.remoteCommandPWD = self.remoteCommandPWD.substring(0, self.remoteCommandPWD.lastIndexOf('/'));
                    console.log('current path:' + self.remoteCommandPWD);
                }
                else {
                    self.remoteCommandPWD += '/' + path;
                    console.log('remoteCommandPWD:' + self.remoteCommandPWD);
                    console.log('current path:' + self.remoteCommandPWD);
                }
                console.log("path:" + path);
            }
            if (cb) {
                cb();
            }
        }).pipe(process.stdout);
    }
    printRemoteCliTitle() {
        this.PrintUtil.print2(`${this.remoteTitleStartFlag}`, 'yellow', `${this.configuration.remote_username}@${this.configuration.remote_ip}  ${this.remoteCommandPWD}  <devops*>\n${this.remoteCommandStartFlag}`, 'yellow', 'bold');
    }
    printHelpInfo() {
        this.commandPrefix = '   ╰─➤ ';
        let pcolor = 'red';
        let helpColor = 'blue';
        let level1CommandColor = 'cyan';
        this.PrintUtil.print("[Init Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops init', null, null, true);
        this.PrintUtil.print("[Services Command Example] ", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops service ls', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops service start-all', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops service stop-all', null, null, true);
        this.PrintUtil.print("[Config Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops config -m local -i 172.16.35.71 -p mcp -u root', null, null, true);
        this.PrintUtil.print("[Images Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops images ls', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops images clean -c', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops images build', null, null, true);
        this.PrintUtil.print("[Maven Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops mvn build', null, null, true);
        this.PrintUtil.print("[Svn Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops svn checkout', null, null, true);
        this.PrintUtil.print("[Container Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops container ls', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops container start-dockerui', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops container start -n alnt-registry', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops container stop -n alnt-registry', null, null, true);
        this.PrintUtil.print("[Deploy Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops deploy validate', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops deploy upload-code', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops deploy run', null, null, true);
        this.PrintUtil.print("[Log Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops logs show -s alnt-registry', null, null, true);
        this.PrintUtil.print("[Remote Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops remote login', null, null, true);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops remote -i exec ls -alt', null, null, true);
        console.log('\n');
        this.PrintUtil.print('More help for each command: ', helpColor);
        this.PrintUtil.print('devops (command) -help\n');
    }
}
exports.BaseCommand = BaseCommand;
//# sourceMappingURL=BaseCommand.js.map