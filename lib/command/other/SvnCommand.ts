///<reference path="../../typings/tsd.d.ts"/>

import {ICommand} from "../common/ICommand";
import shell = require('shelljs')
import {BaseCommand} from "../common/BaseCommand";
import {Configuration} from "../../config/Configuration";
import {ConfigManager} from "../../config/ConfigManager";
import {ServiceCommand} from "../docker/ServiceCommand";


export class SvnCommand extends BaseCommand implements ICommand {
    constructor() {
        super()
        this.configuration = ConfigManager.getInstance().getConfiguration()
    }

    public static load(): ServiceCommand {
        return new ServiceCommand()
    }

    attachCommandToYargs(yargs) {
        let self = this
        yargs.command('svn', 'svn related commands', function (yargs) {
            yargs.command('checkout', 'Check out projects from SVN', function () {
                let command = `
                rm -rf  build/sourceCode/alnt-* && \
                `

                for (let index in self.configuration.svn_projects) {
                    let projectName = self.configuration.svn_projects[index]
                    console.log(self.configuration.svn_projects[index])
                    command += `svn checkout ${self.configuration.svn_rooturl}/${projectName} build/sourceCode/${projectName} && \\`
                }

                command += `
                    rm -rf build/config/* && \
                    cp -r build/sourceCode/alnt-configservice/src/main/resources/shared/* build/config/
                `

                self.execCommand(command)
            })
        })

        return yargs
    }
}