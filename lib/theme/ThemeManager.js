"use strict";
const CatTheme_1 = require("./CatTheme");
const ConfigManager_1 = require("../config/ConfigManager");
/**
 * Created by michael.zhang on 1/5/17.
 */
class ThemeManager {
    constructor() {
        this.themes = new Array();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ThemeManager();
        }
        return this.instance;
    }
    getCurrentTheme() {
        let configuration = ConfigManager_1.ConfigManager.getInstance().getConfiguration();
        let themeName = configuration.theme_name;
        return new CatTheme_1.CatTheme();
    }
}
exports.ThemeManager = ThemeManager;
