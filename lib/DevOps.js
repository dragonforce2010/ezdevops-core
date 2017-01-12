"use strict";
const ConfigCommand_1 = require("./command/common/ConfigCommand");
const ContainerCommand_1 = require("./command/docker/ContainerCommand");
const ImageCommand_1 = require("./command/docker/ImageCommand");
const LogCommand_1 = require("./command/docker/LogCommand");
const MavenCommand_1 = require("./command/other/MavenCommand");
const ServiceCommand_1 = require("./command/docker/ServiceCommand");
const SvnCommand_1 = require("./command/other/SvnCommand");
const DeployCommand_1 = require("./command/common/DeployCommand");
const InitCommand_1 = require("./command/common/InitCommand");
const RemoteCommand_1 = require("./command/common/RemoteCommand");
const CommandManager_1 = require("./command/common/CommandManager");
const BaseCommand_1 = require("./command/common/BaseCommand");
class DevOps {
    constructor() {
        this.yargs = require('yargs');
    }
    init() {
        this.loadCommands();
        this.installCommands();
        /**
         * Activate commands that registered in yargs
         */
        this.yargs.argv;
    }
    loadCommands() {
        BaseCommand_1.BaseCommand.load();
        ConfigCommand_1.ConfigCommand.load();
        InitCommand_1.InitCommand.load();
        ContainerCommand_1.ContainerCommand.load();
        ImageCommand_1.ImageCommand.load();
        LogCommand_1.LogCommand.load();
        MavenCommand_1.MavenCommand.load();
        ServiceCommand_1.ServiceCommand.load();
        SvnCommand_1.SvnCommand.load();
        DeployCommand_1.DeployCommand.load();
        RemoteCommand_1.RemoteCommand.load();
    }
    installCommands() {
        CommandManager_1.CommandManager.getInstance().attachCommandsToYargs(this.yargs);
    }
}
exports.DevOps = DevOps;
