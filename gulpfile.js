//////////////////////////////////////////////
// ----------- Used Modules ------------------
/////////////////////////////////////////////

const gulp = require("gulp");
const browserify = require("browserify"); //browserify support for js
const source = require("vinyl-source-stream"); //for transform browserify bundle into source
const buffer = require("vinyl-buffer"); //transform source into buffer
const uglify = require("gulp-uglify"); //minify JS
const plumber = require("gulp-plumber"); //error catcher
const gutil = require("gulp-util"); //console log - gulp
const scss = require("gulp-sass");
const cleanCss = require("gulp-clean-css");
const autoPrefixer = require("gulp-autoprefixer");

///////////////////////////////////////////////

///////////////////////////////////////////////
// --------------- Source Files ----------------
///////////////////////////////////////////////

const clientScripts = ["client/app/**/*.js"];
const scssFiles = ["client/src/scss/**/*.scss"];

////////////////////////////////////////////////

////////////////////////////////////////////////
// --------------- Tasks ----------------------
///////////////////////////////////////////////


//clientside javascript browserify/uglify
gulp.task("browserify",function(){
    return browserify("client/app/app.js")
        .transform("babelify",{presets:["es2015"]})
        .bundle()
        .on("error",function(err){ //browserify error handling
                gutil.log(err);
                this.emit("end");
            })
        .pipe(plumber({
            errorHandler:function(err){
                gutil.log(err);
                this.emit("end");
            }
        }))
        .pipe(source("app.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("public/dist/scripts/"));
});



//SCSS tasks
gulp.task("scss",function(){
    return gulp.src(scssFiles)
        .pipe(plumber({
            errorHandler:function(err){
                gutil.log(err);
                this.emit("end"); //end stream
            }
        }))
        .pipe(scss())
        .pipe(autoPrefixer({
            browsers:["last 2 versions"]
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest("public/dist/css/"));
});

////////////////////////////////////////////////
// -------- Gulp watch tasks -----------------
/////////////////////////////////////////////////

gulp.task("browserify-watch",function(){
    gulp.watch(clientScripts,["browserify"]);
});

gulp.task("scss-watch",function(){
    gulp.watch(scssFiles,["scss"]);
});

////////////////////////////////////////////////
// ---------- Gulp default --------------------
///////////////////////////////////////////////

gulp.task("default",["browserify-watch","scss-watch"]);