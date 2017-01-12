
/**
 * Created by michael.zhang on 12/31/16.
 */

import {BaseCommand} from "../command/common/BaseCommand"

export class EnvHandler{
    private baseCommand : BaseCommand

    constructor() {
        this.baseCommand = new BaseCommand()
    }

    public exportEnvs() {
        let envObj = require('./ENV.json')
        for(var key in envObj) {
            this.addEnv(key, envObj[key])
        }
        console.log('Environment variables are initialized!')
    }

    public addEnv(key:string, value:string) {
        this.baseCommand.execCommand('export ' + key + '=' + value)
        console.log('export ' + key + '=' + value)
    }
}