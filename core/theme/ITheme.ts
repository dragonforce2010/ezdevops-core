/**
 * Created by michael.zhang on 1/5/17.
 */
export interface ITheme {
    printCommandDescription(cmdDesc: string, level: number, cb: Function)
    printLanddingAsciiArt(cb: Function)
    printLanddingTitle(title: string, cb: Function)
    printRemoteCommandPrompt(cb: Function)
    printAuthInfo(cb: Function)
    printSoftInfo(cb: Function)
}