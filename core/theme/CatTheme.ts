import {BaseTheme} from "./BaseTheme";
/**
 * Created by michael.zhang on 1/5/17.
 */
export class CatTheme extends BaseTheme {
    constructor() {
       super()
    }
    printCommandDescription(cmdDesc: string, level: number, cb: Function = null) {
    }

    printLanddingAsciiArt(cb: Function = null) {
        this.PrintUtil.printRandomCat()
    }

    printLanddingTitle(title: string, cb: Function = null) {
        this.PrintUtil.printAsciiArt('ezDevOps', 'larry3d', 'green', cb)
    }

    printRemoteCommandPrompt(cb: Function = null) {
    }

    printAuthInfo(cb: Function = null) {
        this.PrintUtil.print('Maintainer: Michael Zhang', 'grey')
        this.PrintUtil.print('Email: michael.zhang@alertenterprise.com', 'grey')
    }

    printSoftInfo(cb: Function = null) {
        this.PrintUtil.print('Version: v0.1', 'grey')
        this.PrintUtil.print('Build Status: passing', 'grey')
        this.PrintUtil.print('TechStack: NodeJs, Javascript ES6, TypeScript, docker-compose', 'grey')
    }
}