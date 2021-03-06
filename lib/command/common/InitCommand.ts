import {BaseCommand} from "./BaseCommand";
import {ICommand} from "./ICommand";
/**
 * Created by michael.zhang on 1/4/17.
 */
export class InitCommand extends BaseCommand implements ICommand {

    constructor() {
        super()
    }

    public static load(): InitCommand {
        return new InitCommand()
    }

    attachCommandToYargs(yargs) {
        let self = this
        yargs.command('init', 'init the deployment environment', function (yargs) {
            self.initDirs()
        })
    }

    printCommandDescription() {
        /*this.PrintUtil.print("[Init Command Example]", level1CommandColor);
        this.PrintUtil.print2(this.commandPrefix, pcolor, 'devops init', null, null, true);*/
    }

    public initDirs() {
        /**
         * Initalize the working directory
         * @type {string}
         */
        let self = this
        let initDirCommand = `
            rm -rf docker && \
            rm -rf build && \
            mkdir -p build/config && \
            mkdir -p build/jars && \
            mkdir -p build/logs && \
            mkdir -p build/sourceCode && \
            cp -r .devops/docker docker && \
            cp .devops/pom.xml build/sourceCode
        `
        if (this.configuration.deploy_mode.localeCompare('local') == 0) {
            this.execCommand(initDirCommand, () => console.log('Initialization is completed!'))
        } else {
            let uploadCommand = 'devops deploy upload-code'
            console.log('uploading devops code to remote server')
            let task = setInterval(()=>process.stdout.write('.'), 1000)

            this.execCommand(uploadCommand, () => {
                clearInterval(task)
                console.log('\nInitializing dirs on remote server...')
                this.executeInteractiveRemoteCommand(initDirCommand,'~/alnt-devops')
            })
        }
    }
}