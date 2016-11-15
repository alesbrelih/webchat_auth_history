//////////////////////////////////////////////
// ----------- Used Modules ------------------
/////////////////////////////////////////////

const gulp = require("gulp");
const browserify = require("browserify"); //browserify support for js
const sourcemaps = require("gulp-sourcemaps");
const source = require("vinyl-source-stream"); //for transform browserify bundle into source
const buffer = require("vinyl-buffer"); //transform source into buffer
const uglify = require("gulp-uglify"); //minify JS
const plumber = require("gulp-plumber"); //error catcher
const gutil = require("gulp-util"); //console log - gulp
const scss = require("gulp-sass"); //sass compiler
const cleanCss = require("gulp-clean-css"); //minify css
const autoPrefixer = require("gulp-autoprefixer"); //css prefixer
const browserSync = require("browser-sync");
const karma = require("karma").Server;
const fileUrl = require("file-url"); //gets file absolute path

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
    return browserify("client/app/app.js",{debug:true})
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
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(uglify())
        .pipe(sourcemaps.write({includeContent:false,sourceRoot:fileUrl(__dirname)})) //sourcemaps need to point to the file on disk so visual code debugger can use them
        .pipe(gulp.dest("public/dist/scripts/"));
});

//dependencies temporary
gulp.task("script-dependencies",()=>{

    return browserify("client/src/scripts/dependencies.js")
            .transform("babelify",{presets:["es2015"]})
            .bundle()
            .on("error",function(err){
                gutil.log(err);
                this.emit("end");
            })
            .pipe(source("dependencies.min.js"))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest("public/dist/scripts"));

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

////////////////////////////////////////////////
// -------- Gulp watch tasks -----------------
/////////////////////////////////////////////////

gulp.task("browserify-watch",["browserify"],function(done){
    //does browserify and then reloads
    browserSync.reload();
    done();
});

gulp.task("scss-watch",["scss"],function(done){
    //does scss and then reloads
    browserSync.reload();
    done();
});

///////////////////////////////////////////////////

////////////////////////////////////////////////
// ---------- Gulp default --------------------
///////////////////////////////////////////////

gulp.task("default",["browserify","scss"],function(){
    
    // initialize browser sync
    browserSync.init({
        proxy: "http://localhost:8001",
        files: ["views/Index.html","app/**/*.html"]
    });

    //watch files and trigger gulp tasks
    gulp.watch(scssFiles,["scss-watch"]);
    gulp.watch(clientScripts,["browserify-watch"]);

});



/////////////////////////////////////////
// ----- Unit test--------------------
//////////////////////////////////////

gulp.task("karma",function(done){
    new karma({
    configFile: __dirname + "/client/app/tests/karma.conf.js",
    singleRun: true
  }, done).start();
});