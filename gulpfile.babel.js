import gulp from "gulp"
import sass from "gulp-sass" //sassのコンパイル
import autoprefixer from "gulp-autoprefixer" //弁ダープレフィックスつける
import frontnote from "gulp-frontnote" //スタイルガイドの作成
import uglify from "gulp-uglify" //jsの圧縮
import browser from "browser-sync" //ライブリロード
import plumber from "gulp-plumber" //途中で実行をやめてしまうのをやめる
import jade from "gulp-jade" //jadeのコンパイル
import frontNote from 'gulp-frontnote' //スタイルガイドの作成

gulp.task("server",function(){
	browser({
		server:{
			baseDir:"./public"
		}
	});
});


gulp.src('public/**/*.css')
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


gulp.task("js",function(){
	gulp.src("src/js/*.js")
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest("public/js"));
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


gulp.task("default",["server"],function(){
	gulp.watch("src/js/*.js",["js"]);
	gulp.watch("src/styles/*.scss",["sass"]);
	gulp.watch("src/views/*.jade",["jade"]);
	gulp.watch("public/**",function(){
		browser.reload();
	});
});