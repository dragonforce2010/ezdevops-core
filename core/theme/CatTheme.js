"use strict";
const BaseTheme_1 = require("./BaseTheme");
/**
 * Created by michael.zhang on 1/5/17.
 */
class CatTheme extends BaseTheme_1.BaseTheme {
    constructor() {
        super();
    }
    printCommandDescription(cmdDesc, level, cb = null) {
    }
    printLanddingAsciiArt(cb = null) {
        this.PrintUtil.printRandomCat();
    }
    printLanddingTitle(title, cb = null) {
        this.PrintUtil.printAsciiArt('ezDevOps', 'larry3d', 'green', cb);
    }
    printRemoteCommandPrompt(cb = null) {
    }
    printAuthInfo(cb = null) {
        this.PrintUtil.print('Maintainer: Michael Zhang', 'grey');
        this.PrintUtil.print('Email: michael.zhang@alertenterprise.com', 'grey');
    }
    printSoftInfo(cb = null) {
        this.PrintUtil.print('Version: v0.1', 'grey');
        this.PrintUtil.print('Build Status: passing', 'grey');
        this.PrintUtil.print('TechStack: NodeJs, Javascript ES6, TypeScript, docker-compose', 'grey');
    }
}
exports.CatTheme = CatTheme;
//# sourceMappingURL=CatTheme.js.map