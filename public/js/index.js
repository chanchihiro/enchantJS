"use strict";

enchant();

window.onload = function () {

	var core = new Core(320, 320);
	core.preload("../img/chara1.png");
	core.fps = 10;
	core.onload = function () {

		var bear = new Sprite(32, 32);
		bear.image = core.assets["../img/chara1.png"];
		bear.x = 0;
		bear.y = 0;
		bear.frame = 1;

		//始まった時func
		bear.addEventListener("enterframe", function () {
			if (core.input.left) bear.x -= 5;
			if (core.input.right) bear.x += 5;
			if (core.input.up) bear.y -= 5;
			if (core.input.down) bear.y += 5;
		});

		//何かをタッチしてfunc
		bear.on("touchstart", function () {
			core.rootScene.removeChild(bear);
		});

		core.rootScene.addChild(bear);
	};
	core.start();
};