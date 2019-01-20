"use strict";



function InputEngine(doc){

	
	function __key(_name){
		this.name = _name;
		this.pressed = false;
		this.down = false;
		this.up = false;
	}

	let mouse = new THREE.Vector2();
	let keys = [];
		
	for(let i = 0; i < 223; i++){
		keys.push(new __key(i));
	}
		
	
	
	let IsKeyPressed = function (k){
		return this.keys[__getKey(k)].pressed;
	};
	
	let IsKeyUp = function (k){
		return this.keys[__getKey(k)].up;
	};
	
    let IsKeyDown = function (k){
		return this.keys[__getKey(k)].down;
	};
	
	let Update = function (deltaTime){
		for(let i = 0; i < this.keys.Length; i++){
			this.keys[i].down = false;
			this.keys[i].up = false;
		}
	};
	
	function __getKey(c){
		if((typeof c) == 'string') return c.charCodeAt(0);
		else return c;
	}
	
	function __mouseDown(event){
		this.keys[event.button+1].pressed = true;
		this.keys[event.button+1].down = true;
	}
	
	function __mouseUp(event){
		this.keys[event.button+1].pressed = false;
		this.keys[event.button+1].up = true;
	}
	
    function __mouseMove(event){
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}
	

	doc.addEventListener( 'mousemove', __mouseMove, false );
	doc.addEventListener( 'mousedown', __mouseDown, false );
	doc.addEventListener( 'mouseup', __mouseUp, false );


	
}