new p5(sketch => {
	const COLORS = [
		"#bb00af", "#00feff", "#ff8300", "#0026ff",
		"#fffa01", "#ff2600", "#ff008b", "#25ff01"
	];
	let colorIndex = 0;
	let dvdImage;
	let position;
	let velocity;

	sketch.preload = () => {
		dvdImage = sketch.loadImage("logo.svg");
	};

	sketch.setup = () => {
		sketch.createCanvas(window.innerWidth, window.innerHeight);
		position = sketch.createVector(0, 0);
		velocity = p5.Vector.fromAngle(sketch.radians(45)).mult(5);
	};

	sketch.draw = () => {
		sketch.background("#111");
		if (checkBoundaryCollision()) {
			colorIndex = (colorIndex + 1) % COLORS.length;
		}
		sketch.tint(COLORS[colorIndex]);
		position.add(velocity);
		sketch.image(dvdImage, position.x, position.y);
		sketch.noTint();
	};

	sketch.keyPressed = () => {
		// F11キーまたはfキーで全画面切り替え
		if (sketch.key === 'f' || sketch.key === 'F' || sketch.keyCode === 122) {
			toggleFullscreen();
		}
		// ESCキーで全画面終了
		if (sketch.keyCode === 27) {
			exitFullscreen();
		}
	};

	// 全画面切り替え関数
	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen().catch(err => {
				console.log(`全画面表示エラー: ${err.message}`);
			});
		} else {
			document.exitFullscreen();
		}
	}

	// 全画面終了関数
	function exitFullscreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		}
	}

	// ウィンドウサイズ変更時の処理
	sketch.windowResized = () => {
		sketch.resizeCanvas(window.innerWidth, window.innerHeight);
		// 境界を超えている場合は位置を調整
		if (position.x + dvdImage.width > sketch.width) {
			position.x = sketch.width - dvdImage.width;
		}
		if (position.y + dvdImage.height > sketch.height) {
			position.y = sketch.height - dvdImage.height;
		}
	};

	function checkBoundaryCollision() {
		let collided = false;
		if (position.x < 0 || position.x + dvdImage.width > sketch.width) {
			velocity.x *= -1;
			collided = true;
		}
		if (position.y < 0 || position.y + dvdImage.height > sketch.height) {
			velocity.y *= -1;
			collided = true;
		}
		return collided;
	}
});
