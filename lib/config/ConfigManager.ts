/**
 * Created by michael.zhang on 1/1/17.
 */
import fs = require('fs')
import path = require('path')
import {Configuration} from "./Configuration";
import {TypedJSON} from "typedjson-npm";

export class ConfigManager {
    private static instance: ConfigManager
    private configuration: Configuration

    constructor() {
        let configJson = require('../../.devops/config.json')
        this.configuration = TypedJSON.parse(JSON.stringify(configJson), Configuration)
        /**
         * For now, JsonMember can not properly map Array, so here manually assign the array values
         * @type {Array<string>|any}
         */
        this.configuration.svn_projects = configJson.svn_projects
    }

    public static getInstance() {
        if(!this.instance)
            this.instance = new ConfigManager()
        return this.instance
    }

    public setConfiguration(configuration: Configuration) {
        this.configuration = configuration
        let fileName = path.join(__dirname, '../../.devops/config.json')
        fs.writeFileSync(fileName, JSON.stringify(this.configuration, null, 2), 'utf-8')
    }

    public getConfiguration(): Configuration {
        return this.configuration
    }

    public printConfiguration() {
        console.log(JSON.stringify(this.configuration, null, 2))
    }
}
