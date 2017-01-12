/**
 * Created by michael.zhang on 1/5/17.
 */
declare module 'PrintUtil' {
    export function print(content: string, color: string, style: string): void
    export function print2(prefix: string, pcolor: string, content: string, ccolor: string, style: string, isEnter:string): void
    export function printAsciiArt(content: string, font: string, style: string, cb: Function): void
    export function printRandomCat(): any
    export function printCat(catName: string): any
}