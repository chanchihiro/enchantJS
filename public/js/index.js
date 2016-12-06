"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
			if (bear.within(enemy, 16)) {
				core.pushScene(gameoverScene);
				core.stop();
			}
		});

		//何かをタッチしてfunc
		bear.on("touchstart", function () {
			core.rootScene.removeChild(bear);
		});

		var enemy = new Sprite(32, 32);
		enemy.image = core.assets["../img/chara1.png"];
		enemy.x = 100;
		enemy.y = 0;
		enemy.frame = 5;

		var label = new Label();
		label.x = 200;
		label.y = 5;
		label.color = "red";
		label.font = "3px";
		label.text = "0";

		label.on("enterframe", function () {
			label.text = (core.frame / core.fps).toFixed(1);
		});

		var Bear = function (_Sprite) {
			_inherits(Bear, _Sprite);

			function Bear(x, y) {
				_classCallCheck(this, Bear);

				var _this = _possibleConstructorReturn(this, (Bear.__proto__ || Object.getPrototypeOf(Bear)).call(this, 32, 32));

				_this.x = x;
				_this.y = y;
				_this.image = core.assets["../img/chara1.png"];
				_this.on("enterframe", function () {
					_this.x += 5;
					if (_this.x > 320) _this.x = 0;
				});
				core.rootScene.addChild(_this);
				return _this;
			}

			return Bear;
		}(Sprite);

		var white = new Bear(0, 50);

		var gameoverScene = new Scene();
		gameoverScene.backgroundColor = "black";

		core.rootScene.addChild(bear);
		core.rootScene.addChild(label);
		core.rootScene.addChild(enemy);
	};
	core.start();
};