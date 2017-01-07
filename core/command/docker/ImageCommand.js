"use strict";
const BaseCommand_1 = require("../common/BaseCommand");
class ImageCommand extends BaseCommand_1.BaseCommand {
    constructor() {
        super();
        //console.log('Load subcommand: image')
    }
    static load() {
        return new ImageCommand();
    }
    attachCommandToYargs(yargs) {
        let self = this;
        yargs.command('images', 'images related commands', function (yargs) {
            self.registerSubcommandClean(yargs);
            self.registerSubcommandBuild(yargs);
            self.registerSubcommandLs(yargs);
        });
        return yargs;
    }
    registerSubcommandClean(yargs) {
        let self = this;
        yargs.command('clean', 'clean all the service images', function (yargs) {
            yargs.option('n', {
                alias: 'imageName',
                demand: false,
                type: 'string'
            }).option('c', {
                alias: 'clean-none',
                demand: false,
                boolean: true
            });
            let commands = new Array();
            if (yargs.argv.n) {
                commands.push(`
                    docker rmi -f ${yargs.argv.n}
                `);
            }
            if (yargs.argv.c) {
                commands.push(`docker rmi -f $(docker images | grep 'none' | awk '{print $3}')`);
            }
            if (!yargs.argv.n && !yargs.argv.c) {
                commands.push(`docker rmi -f $(docker images | grep 'ae/' | awk '{print $3}')`);
                commands.push(`docker rmi -f $(docker images | grep 'none' | awk '{print $3}')`);
            }
            self.execCommands(commands);
        });
    }
    registerSubcommandBuild(yargs) {
        let self = this;
        yargs.command('build', 'build docker images based on docker-compose yml file', function () {
            let command = `
                docker build -t ae/alnt-base:1.0 $(pwd)/docker/dockerfile/alnt-base && \
                docker-compose -f $(pwd)/docker/docker-compose.yml build
            `;
            self.execCommand(command);
        });
    }
    registerSubcommandLs(yargs) {
        let self = this;
        yargs.command('ls', 'ls all the images', function () {
            let command = `
                docker images
            `;
            self.execCommand(command);
        });
    }
}
exports.ImageCommand = ImageCommand;
//# sourceMappingURL=ImageCommand.js.map