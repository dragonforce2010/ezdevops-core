"use strict";
/**
 * Created by michael.zhang on 1/1/17.
 */
const fs = require("fs");
const path = require("path");
const Configuration_1 = require("./Configuration");
const typedjson_npm_1 = require("typedjson-npm");
class ConfigManager {
    constructor() {
        let configJson = require('../../.devops/config.json');
        this.configuration = typedjson_npm_1.TypedJSON.parse(JSON.stringify(configJson), Configuration_1.Configuration);
        /**
         * For now, JsonMember can not properly map Array, so here manually assign the array values
         * @type {Array<string>|any}
         */
        this.configuration.svn_projects = configJson.svn_projects;
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new ConfigManager();
        return this.instance;
    }
    setConfiguration(configuration) {
        this.configuration = configuration;
        let fileName = path.join(__dirname, '../../.devops/config.json');
        fs.writeFileSync(fileName, JSON.stringify(this.configuration, null, 2), 'utf-8');
    }
    getConfiguration() {
        return this.configuration;
    }
    printConfiguration() {
        console.log(JSON.stringify(this.configuration, null, 2));
    }
}
exports.ConfigManager = ConfigManager;
