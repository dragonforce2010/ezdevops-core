import {ConfigCommand} from "./core/command/common/ConfigCommand";
import {ContainerCommand} from "./core/command/docker/ContainerCommand";
import {ImageCommand} from "./core/command/docker/ImageCommand";
import {LogCommand} from "./core/command/docker/LogCommand";
import {MavenCommand} from "./core/command/other/MavenCommand";
import {ServiceCommand} from "./core/command/docker/ServiceCommand";
import {SvnCommand} from "./core/command/other/SvnCommand";
import {DeployCommand} from "./core/command/common/DeployCommand";
import {InitCommand} from "./core/command/common/InitCommand";
import {RemoteCommand} from "./core/command/common/RemoteCommand";
import {CommandManager} from "./core/command/common/CommandManager";
import {BaseCommand} from "./core/command/common/BaseCommand";

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

new DevOps().init()
