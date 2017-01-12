/**
 * Created by michael.zhang on 1/4/17.
 */
const asciify = require('asciify')
const colors = require('colors')
const catMe = require('cat-me')

init()

function init(){
    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    })
}

// test()

function print(content, color, style) {
    if(color) {
        console.log(content[color])
    }else if(style) {
        console.log(content[color][style])
    } else {
        console.log(content)
    }
}

/*function print2(content, color, style) {
    if(color) {
        process.stdout.write(content[color])
    }else if(style) {
        process.stdout.write(content[color][style])
    } else {
        process.stdout.write(content)
    }
}*/

function print2(prefix = '', pcolor = 'orange', content, ccolor, style, isEnter = false) {
    if(prefix)
        process.stdout.write(prefix[pcolor])
    if(ccolor) {
        process.stdout.write(content[ccolor])
    }else if(style) {
        process.stdout.write(content[ccolor][style])
    } else {
        process.stdout.write(content)
    }
    if(isEnter)
        process.stdout.write('\n')
}

function printAsciiArt(context, font = 'larry3d', color = 'green', cb = null) {
    asciify(context, {font: font}, function (err, res) {
        console.log(res[color])
        if(cb)
            cb()
    })
}

function printCat(catName = 'nyan') {
    console.log(catMe(catName))
}

function printRandomCat() {
    console.log(catMe().random)
}

function test() {
    console.log("First some yellow text".yellow);
    console.log("Underline that text".yellow.underline);
    console.log("Make it bold and red".red.bold);
    console.log(("Double Raindows All Day Long").rainbow)
    console.log("Drop the bass".trap)
    console.log("DROP THE RAINBOW BASS".trap.rainbow)
    console.log('Chains are also cool.'.bold.italic.underline.red); // styles not widely supported
    console.log('So '.green + 'are'.underline + ' ' + 'inverse'.inverse + ' styles! '.yellow.bold); // styles not widely supported
    console.log("Zebras are so fun!".zebra);
//
// Remark: .strikethrough may not work with Mac OS Terminal App
//
    console.log("This is " + "not".strikethrough + " fun.");
    console.log('Background color attack!'.black.bgWhite)
    console.log('Use random styles on everything!'.random)
    console.log('America, Heck Yeah!'.america)
    console.log('Setting themes is useful')
// outputs red text
    console.log("this is an error".error);
// outputs yellow text
    console.log("this is a warning".warn);
// outputs grey text
    console.log("this is an input".input);
    console.log('Generic logging theme as file'.green.bold.underline);
// outputs red text
    console.log("this is an error".error);
// outputs yellow text
    console.log("this is a warning".warn);

// outputs grey text
    console.log("this is an input".input);
}
//console.log("Don't summon".zalgo)

exports.print = print
exports.printAsciiArt = printAsciiArt
exports.printCat = printCat
exports.printRandomCat = printRandomCat
exports.print2 = print2
exports.test = test
