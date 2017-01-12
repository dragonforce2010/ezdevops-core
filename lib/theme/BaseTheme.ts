import {ITheme} from "./ITheme";
/**
 * Created by michael.zhang on 1/5/17.
 */
export abstract class BaseTheme implements ITheme {
    protected PrintUtil: any
    constructor() {
        this.PrintUtil = require('../utils/PrintUtil')
    }

    abstract printCommandDescription(cmdDesc: string, level: number, cb: Function)
    abstract printLanddingAsciiArt(cb: Function)
    abstract printLanddingTitle(title: string, cb: Function)
    abstract printRemoteCommandPrompt(cb: Function)
    abstract printAuthInfo(cb: Function)
    abstract printSoftInfo(cb: Function)
}