var gulp = require("gulp");
var sass = require("gulp-sass"); //sassのコンパイル
var autoprefixer = require("gulp-autoprefixer"); //弁ダープレフィックスつける
var frontnote = require("gulp-frontnote"); //スタイルガイドの作成
var uglify = require("gulp-uglify"); //jsの圧縮
var browser = require("browser-sync"); //ライブリロード
var plumber = require("gulp-plumber"); //途中で実行をやめてしまうのをやめる
var jade = require("gulp-jade"); //jadeのコンパイル

gulp.task("server",function(){
	browser({
		server:{
			baseDir:"./public"
		}
	});
});


gulp.task("sass",function(){
	gulp.src("src/styles/*.scss")
		.pipe(plumber())
		.pipe(frontnote({
			css:"public/css/style.css"
		}))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest("public/css"));
	browserSync.reload();
});


gulp.task("js",function(){
	gulp.src("src/js/*.js")
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest("public/js"));
	browserSync.reload();
});

gulp.task("jade",function(){
	gulp.src("src/views/*.jade")
		.pipe(plumber())
		.pipe(jade({
			pretty:true
		}))
		.pipe(gulp.dest("./public"));
	browserSync.reload();
});


gulp.task("default",["server"],function(){
	gulp.watch("src/js/*.js",["js"]);
	gulp.watch("src/styles/*.scss",["sass"]);
	gulp.watch("src/views/*.jade",["jade"]);
	gulp.watch("public/**",function(){
		browserSync.reload();
	});
});