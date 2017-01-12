/**
 * Created by michael.zhang on 12/30/16.
 */

import shell = require('shelljs')
import {Configuration} from "../../config/Configuration"
import sshExec = require("ssh-exec")
import {ConfigManager} from "../../config/ConfigManager"
import {createInterface} from "readline";
import {ICommand} from "./ICommand";
import {CommandManager} from "./CommandManager";
import {ThemeManager} from "../../theme/ThemeManager";

export class BaseCommand implements ICommand {
    protected PrintUtil: any
    protected configManager: ConfigManager
    protected configuration: Configuration
    protected remoteCommandPWD: string
    protected remoteCommandStartFlag: string
    protected remoteTitleStartFlag: string
    protected commandPrefix: string;

    constructor() {
        CommandManager.getInstance().registerCommand(this)

        this.configManager = new ConfigManager()
        this.configuration = this.configManager.getConfiguration()
        this.remoteCommandPWD = this.configuration.remote_path
        this.remoteTitleStartFlag = '╭─'
        this.remoteCommandStartFlag = '╰─➤  '
        this.PrintUtil = require('../../utils/PrintUtil')

    }

    printCommandDescription() {
        let commands: Array<ICommand> = CommandManager.getInstance().commands
        commands.forEach(command => command.printCommandDescription())
    }

    public static load(): BaseCommand {
        return new BaseCommand()
    }

    attachCommandToYargs(yargs) {
        yargs.command('help', 'show helps of all the commands', function (yargs) {
            let currentTheme = ThemeManager.getInstance().getCurrentTheme()
            currentTheme.printLanddingAsciiArt(null)
            currentTheme.printLanddingTitle('ezDevOps', () => {
                currentTheme.printAuthInfo(null)
                currentTheme.printSoftInfo(null)
            })
        })
    }

    public execCommand(command: string, cb: Function = null, skipErrors: boolean = false) {
        let self = this
        shell.exec(command, function (err, stdout, stderr) {
            if (err && !skipErrors) {
                self.PrintUtil.print(stderr, 'error')
                // throw err
            }
            if (cb)
                cb()
        })
    }

    public execCommandWithCallbacks(command: string, skipErrors: boolean, callback: Function) {
        let self = this
        shell.exec(command, function (err, stdout, stderr) {
            if (err && !skipErrors) {
                self.PrintUtil.print(stderr, 'error')
                // throw err
            } else {
                callback()
            }
        })
    }

    public execCommands(commands: string[]) {
        if (!commands)
            return

        commands.forEach(command => {
            this.execCommand(command)
        })
    }

    public executeInteractiveRemoteCommand(command: string, initPath: string = null, cb: Function = null) {
        let self = this
        self.printRemoteCliTitle()

        let rl = createInterface({
            input: process.stdin,
            output: process.stdout
        })

        self.execRemoteCommand(command, cb, initPath)
        rl.on('line', line => {
            if ('exit'.localeCompare(line) == 0) {
                rl.close()
                process.exit(0)
            }
            let cmd = line
            self.execRemoteCommand(cmd, ()=>
                self.printRemoteCliTitle()
            )
        })
    }

    public execRemoteCommand(command: string, cb = null, initPath: string = null) {
        // console.log('remote command:' + command)
        let self = this
        if (initPath)
            this.remoteCommandPWD = initPath
        let cmd = `cd ${this.remoteCommandPWD} && ${command}`
        sshExec(cmd, this.configuration.remote_username + '@' + this.configuration.remote_ip,
            (err, stdout, stderr) => {
                if (err) {
                    self.PrintUtil.print("Wrong command, error raised!", 'error')
                    console.log("Command: " + command)
                    this.printRemoteCliTitle();
                    return
                }
                if (command.trim().startsWith('cd ')) {
                    let path = command.trim().split(' ')[1]
                    if (path.trim().startsWith('/')) {
                        self.remoteCommandPWD = path
                    } else if ('..'.localeCompare(path) == 0) {
                        if (self.remoteCommandPWD.lastIndexOf('/') != -1)
                            self.remoteCommandPWD = self.remoteCommandPWD.substring(0, self.remoteCommandPWD.lastIndexOf('/'))
                        console.log('current path:' + self.remoteCommandPWD)
                    } else {
                        self.remoteCommandPWD += '/' + path
                        console.log('remoteCommandPWD:' + self.remoteCommandPWD)
                        console.log('current path:' + self.remoteCommandPWD)
                    }
                    console.log("path:" + path)
                }
                if (cb) {
                    cb()
                }
            }).pipe(process.stdout)
    }

    public printRemoteCliTitle() {
        this.PrintUtil.print2(
            `${this.remoteTitleStartFlag}`,
            'yellow',
            `${this.configuration.remote_username}@${this.configuration.remote_ip}  ${this.remoteCommandPWD}  <devops*>\n${this.remoteCommandStartFlag}`,
            'yellow',
            'bold')
    }

    public printHelpInfo() {
        this.commandPrefix = '   ╰─➤ ';
        let pcolor = 'red';
        let helpColor = 'blue'
        let level1CommandColor = 'cyan';

        this.PrintUtil.print("[Init Command Example]", level1CommandColor)

        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops init', null, null, true)
        this.PrintUtil.print("[Services Command Example] ", level1CommandColor)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops service ls', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops service start-all', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops service stop-all', null, null, true)

        this.PrintUtil.print("[Config Command Example]", level1CommandColor)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops config -m local -i 172.16.35.71 -p mcp -u root', null, null, true)

        this.PrintUtil.print("[Images Command Example]", level1CommandColor)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops images ls', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops images clean -c', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops images build', null, null, true)

        this.PrintUtil.print("[Maven Command Example]", level1CommandColor)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops mvn build', null, null, true)

        this.PrintUtil.print("[Svn Command Example]", level1CommandColor)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops svn checkout', null, null, true)

        this.PrintUtil.print("[Container Command Example]", level1CommandColor)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops container ls', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops container start-dockerui', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops container start -n alnt-registry', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops container stop -n alnt-registry', null, null, true)

        this.PrintUtil.print("[Deploy Command Example]", level1CommandColor)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops deploy validate', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops deploy upload-code', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops deploy run', null, null, true)

        this.PrintUtil.print("[Log Command Example]", level1CommandColor)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops logs show -s alnt-registry', null, null, true)

        this.PrintUtil.print("[Remote Command Example]", level1CommandColor)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops remote login', null, null, true)
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops remote -i exec ls -alt', null, null, true)

        console.log('\n')
        this.PrintUtil.print('More help for each command: ', helpColor)
        this.PrintUtil.print('devops (command) -help\n')
    }
}