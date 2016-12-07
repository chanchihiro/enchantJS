enchant();

window.onload = () => {

	let core = new Core(320,320);
	core.preload("../img/chara1.png");
	core.fps = 20;
	core.onload = () => {

		class Bear extends Sprite {
			constructor(x,y,z){
				super(32,32);
				this.x = x;
				this.y = y;
				this.frame = z;
				this.image = core.assets["../img/chara1.png"];
				core.rootScene.addChild(this);
			}
			move() {
				this.on("enterframe", () => {
					if (core.input.left) this.x -= 5;
					if (core.input.right) this.x += 5;
					if (core.input.up) this.y -= 5;
					if (core.input.down) this.y += 5;
				});
			}
		}


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


		class Bears extends Sprite {
			constructor(x,y){
				super(32,32);
				this.x = x;
				this.y = y;
				this.frame = rand(8);
				this.image = core.assets["../img/chara1.png"];
				this.tl.moveBy(rand(100),0,40,enchant.Easing.BOUNCE_EASEOUT)
					   .moveBy(-rand(100),0,40)
					   .fadeOut(20)
					   .fadeIn(10)
					   .loop();
				core.rootScene.addChild(this);
			}
		}


		let rand = n => {
			return Math.floor(Math.random() * n+1);
		}

		let bearing = [];
		for (let i = 0; i < 100; i++){
			bearing[i] = new  Bears(rand(320),rand(320));
		}


		let gameoverScene = new Scene();
		gameoverScene.backgroundColor = "black";


		// core.rootScene.addChild(bear);
		core.rootScene.addChild(label);
		core.rootScene.addChild(enemy);
		let white = new Bear(0,0,5);
		white.move();
		let black = new Bears(0,50);
	}
	core.start();
};