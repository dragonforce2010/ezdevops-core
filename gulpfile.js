/**
 * Created by michael.zhang on 1/6/17.
 */
let gulp = require('gulp')
let ts = require('gulp-typescript')
let minify = require('gulp-minify')
let tsConfig = {
    src: [
        'lib/**/*.ts',
        '!node_modules/**/*'
    ],
    compilerOptions: {
        "module": "commonjs",
        "moduleResolution": "node",
        "target": "es6",
        "noImplicitAny": false,
        "sourceMap": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    },
    out: {
        compileOut: 'lib',
        minifyOut: 'dist'
    }
}

gulp.task('build-ts', function () {
    return gulp.src(tsConfig.src)
        .pipe(ts(tsConfig.compilerOptions))
        .js
        .pipe(gulp.dest(tsConfig.out.compileOut))
})

gulp.task('minify', function() {
    return gulp.
        src(tsConfig.src)
        .pipe(minify({
        ext:{
            src:tsConfig.out.compileOut,
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
})

gulp.task('watch', function() {
    gulp.watch(tsConfig.src, ['build-ts'])
})

gulp.task('default', ['watch'])

