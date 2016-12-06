enchant();

window.onload = () => {

	let core = new Core(320,320);
	core.preload("../img/chara1.png");
	core.fps = 10;
	core.onload = () => {

		let bear = new Sprite(32,32);
		bear.image = core.assets["../img/chara1.png"];
		bear.x = 0;
		bear.y = 0;
		bear.frame = 1;

		//始まった時func
		bear.addEventListener("enterframe",() => {
			if (core.input.left) bear.x -= 5;
			if (core.input.right) bear.x += 5;
			if (core.input.up) bear.y -= 5;
			if (core.input.down) bear.y += 5;
			if (bear.within(enemy, 16)){
				core.pushScene(gameoverScene);
				core.stop();
			}
		});

		//何かをタッチしてfunc
		bear.on("touchstart", () => {
			core.rootScene.removeChild(bear);
		})


		let enemy = new Sprite(32,32);
		enemy.image = core.assets["../img/chara1.png"];
		enemy.x = 100;
		enemy.y = 0;
		enemy.frame = 5;


		let label = new Label();
		label.x = 200;
		label.y = 5;
		label.color = "red";
		label.font = "3px";
		label.text = "0"

		label.on("enterframe", () => {
			label.text = ( core.frame / core.fps ).toFixed(1);
		})


		class Bear extends Sprite {
			constructor(x,y){
				super(32,32);
				this.x = x;
				this.y = y;
				this.image = core.assets["../img/chara1.png"];
				this.on("enterframe", () => {
					this.x += 5;
					if ( this.x > 320 ) this.x = 0;
				});
				core.rootScene.addChild(this);
			}
		}


		let white = new Bear(0,50);


		let gameoverScene = new Scene();
		gameoverScene.backgroundColor = "black";


		core.rootScene.addChild(bear);
		core.rootScene.addChild(label);
		core.rootScene.addChild(enemy);
	}
	core.start();
};