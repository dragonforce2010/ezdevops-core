import {ICommand} from "../common/ICommand"
import shell = require('shelljs')
import {BaseCommand} from "../common/BaseCommand"

export class ContainerCommand extends BaseCommand implements ICommand {
    private dockerUtil

    constructor() {
        super()
        //console.log('Load subcommand: container')
    }

    public static load(): ContainerCommand {
        return new ContainerCommand()
    }

    public attachCommandToYargs(yargs) {
        let self = this
        yargs.command('containers', 'container related commands', function(yargs) {
            self.registerSubcommandLs(yargs)
            self.registerSubcommandStartDockerUI(yargs)
            self.registerSubcommandStopContainer(yargs)
        })
        return yargs
    }

    public registerSubcommandLs(yargs) {
        let self = this
        yargs.command('ls', 'list all the containers', function() {
            var command = 'docker ps'
            self.execCommand(command)
        })
    }

    registerSubcommandStartDockerUI(yargs) {
        let self = this
        yargs.command('start-dockerui', 'start the docker ui services', function(){
            let command = `
                docker run -d --name dockerui -p 9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
            `
            self.execCommand(command)
        })
    }

    registerSubcommandStopDockerUI(yargs) {
        let self = this
        yargs.command('start-dockerui', 'start the docker ui services', function(){
            let command = `
                docker stop dockerui
            `
            self.execCommand(command)
        })
    }

    registerSubcommandStopContainer(yargs) {
        let self = this
        yargs.command('stop', 'stop docker container', function(yargs){
            yargs.option('n', {
                alias: 'container-name',
                demand: true,
                type: 'string'
            })

            let containerName = yargs.argv.n
            let command = `
                docker stop ${containerName} 
            `
            self.execCommand(command)
        })
    }

    registerSubcommandStartContainer(yargs) {
        let self = this
        yargs.command('start', 'start docker container', function(yargs){
            yargs.option('n', {
                alias: 'container-name',
                demand: true,
                type: 'string'
            })

            let containerName = yargs.argv.n
            let command = `
                docker start ${containerName} 
            `
            self.execCommand(command)
        })
    }

}