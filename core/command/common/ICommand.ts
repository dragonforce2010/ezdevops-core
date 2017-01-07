/**
 * Created by michael.zhang on 12/11/16.
 */
///<reference path="../../typings/tsd.d.ts"/>

export interface ICommand {
    attachCommandToYargs(yargs)
    printCommandDescription()
}


