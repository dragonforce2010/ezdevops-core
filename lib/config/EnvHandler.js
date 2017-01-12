/**
 * Created by michael.zhang on 12/31/16.
 */
"use strict";
const BaseCommand_1 = require("../command/common/BaseCommand");
class EnvHandler {
    constructor() {
        this.baseCommand = new BaseCommand_1.BaseCommand();
    }
    exportEnvs() {
        let envObj = require('./ENV.json');
        for (var key in envObj) {
            this.addEnv(key, envObj[key]);
        }
        console.log('Environment variables are initialized!');
    }
    addEnv(key, value) {
        this.baseCommand.execCommand('export ' + key + '=' + value);
        console.log('export ' + key + '=' + value);
    }
}
exports.EnvHandler = EnvHandler;
