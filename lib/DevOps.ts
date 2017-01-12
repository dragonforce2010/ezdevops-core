import {ConfigCommand} from "./command/common/ConfigCommand";
import {ContainerCommand} from "./command/docker/ContainerCommand";
import {ImageCommand} from "./command/docker/ImageCommand";
import {LogCommand} from "./command/docker/LogCommand";
import {MavenCommand} from "./command/other/MavenCommand";
import {ServiceCommand} from "./command/docker/ServiceCommand";
import {SvnCommand} from "./command/other/SvnCommand";
import {DeployCommand} from "./command/common/DeployCommand";
import {InitCommand} from "./command/common/InitCommand";
import {RemoteCommand} from "./command/common/RemoteCommand";
import {CommandManager} from "./command/common/CommandManager";
import {BaseCommand} from "./command/common/BaseCommand";

export class DevOps {  
    private yargs

    constructor() {
        this.yargs = require('yargs')
    }

    public init() {         
        this.loadCommands()
        this.installCommands()
        /**
         * Activate commands that registered in yargs
         */
        this.yargs.argv
    }  

    public loadCommands() {
        BaseCommand.load()
        ConfigCommand.load()
        InitCommand.load()
        ContainerCommand.load()
        ImageCommand.load()
        LogCommand.load()
        MavenCommand.load()
        ServiceCommand.load()
        SvnCommand.load()
        DeployCommand.load()
        RemoteCommand.load()
    }

    public installCommands() {
        CommandManager.getInstance().attachCommandsToYargs(this.yargs)
    }
}  