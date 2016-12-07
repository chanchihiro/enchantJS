"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

enchant();

window.onload = function () {

	var core = new Core(320, 320);
	core.preload("../img/chara1.png");
	core.fps = 20;
	core.onload = function () {
		var Bear = function (_Sprite) {
			_inherits(Bear, _Sprite);

			function Bear(x, y, z) {
				_classCallCheck(this, Bear);

				var _this = _possibleConstructorReturn(this, (Bear.__proto__ || Object.getPrototypeOf(Bear)).call(this, 32, 32));

				_this.x = x;
				_this.y = y;
				_this.frame = z;
				_this.image = core.assets["../img/chara1.png"];
				core.rootScene.addChild(_this);
				return _this;
			}

			_createClass(Bear, [{
				key: "move",
				value: function move() {
					var _this2 = this;

					this.on("enterframe", function () {
						if (core.input.left) _this2.x -= 5;
						if (core.input.right) _this2.x += 5;
						if (core.input.up) _this2.y -= 5;
						if (core.input.down) _this2.y += 5;
					});
				}
			}]);

			return Bear;
		}(Sprite);

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

		var Bears = function (_Sprite2) {
			_inherits(Bears, _Sprite2);

			function Bears(x, y) {
				_classCallCheck(this, Bears);

				var _this3 = _possibleConstructorReturn(this, (Bears.__proto__ || Object.getPrototypeOf(Bears)).call(this, 32, 32));

				_this3.x = x;
				_this3.y = y;
				_this3.frame = rand(8);
				_this3.image = core.assets["../img/chara1.png"];
				_this3.tl.moveBy(rand(100), 0, 40, enchant.Easing.BOUNCE_EASEOUT).moveBy(-rand(100), 0, 40).fadeOut(20).fadeIn(10).loop();
				core.rootScene.addChild(_this3);
				return _this3;
			}

			return Bears;
		}(Sprite);

		var rand = function rand(n) {
			return Math.floor(Math.random() * n + 1);
		};

		var bearing = [];
		for (var i = 0; i < 100; i++) {
			bearing[i] = new Bears(rand(320), rand(320));
		}

		var gameoverScene = new Scene();
		gameoverScene.backgroundColor = "black";

		// core.rootScene.addChild(bear);
		core.rootScene.addChild(label);
		core.rootScene.addChild(enemy);
		var white = new Bear(0, 0, 5);
		white.move();
		var black = new Bears(0, 50);
	};
	core.start();
};