var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass"); //sassのコンパイル
var autoprefixer = require("gulp-autoprefixer"); //弁ダープレフィックスつける
var frontnote = require("gulp-frontnote"); //スタイルガイドの作成
var uglify = require("gulp-uglify"); //jsの圧縮
var browser = require("browser-sync"); //ライブリロード
var plumber = require("gulp-plumber"); //途中で実行をやめてしまうのをやめる
var jade = require("gulp-jade"); //jadeのコンパイル
var frontNote = require('gulp-frontnote'); //スタイルガイドの作成


gulp.task('babel', function() {
	gulp.src('./src/js/*.es6')
		.pipe(babel())
		.pipe(plumber())
		.pipe(gulp.dest('public/js'));
	browser.reload();
});


gulp.task("server",function(){
	browser({
		server:{
			baseDir:"./public"
		}
	});
});


gulp.src('public/**/guide.css')
	.pipe(frontNote({
	// options
}));


gulp.task("sass",function(){
	gulp.src("src/styles/*.scss")
		.pipe(plumber())
		.pipe(frontnote({
			css:"public/css/style.css"
		}))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest("public/css"));
	browser.reload();
});


gulp.task("jade",function(){
	gulp.src("src/views/*.jade")
		.pipe(plumber())
		.pipe(jade({
			pretty:true
		}))
		.pipe(gulp.dest("./public"));
	browser.reload();
});


gulp.task("default",["server","babel"],function(){
	gulp.watch("src/styles/*.scss",["sass"]);
	gulp.watch("src/views/*.jade",["jade"]);
	gulp.watch("src/js/*.es6",["babel"]);
	gulp.watch("public/**",function(){
		browser.reload();
	});
});