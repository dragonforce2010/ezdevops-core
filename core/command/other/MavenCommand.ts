///<reference path="../../typings/tsd.d.ts"/>

import shell = require("shelljs")
import { ICommand } from "../common/ICommand"
import {BaseCommand} from "../common/BaseCommand";

export class MavenCommand extends BaseCommand implements ICommand{
    constructor() {
        super()
        //console.log("Load subcommand: build")
    }

    public static load(): MavenCommand {
        return new MavenCommand()
    }

    attachCommandToYargs(yargs) {
        let self = this
        yargs.command('mvn', 'maven related commands', function(yargs) {
            self.registerSubcommandBuild(yargs)
        })
        return yargs
    }

    registerSubcommandBuild(yargs) {
        let self = this
        yargs.command('build', 'build source code to jars', function(yargs) {
            let command = `
                rm -rf build/jars/* && \
                mvn -f $(pwd)/build/sourceCode/pom.xml package -Dbuild.output.directory=$(pwd)/build/jars -DskipTests=true
            `
            self.execCommand(command)

            yargs.help('help')
                .alias('h', 'help')
                .example('mcp build', 'build from source code and output jars')
        })
    }
}