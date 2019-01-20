"use strict";



function InputEngine(doc){

	this.mouse = new THREE.Vector2();
	this.keys = [];
		
	for(let i = 0; i < 223; i++){
		this.keys.push(new __key(i));
	}
		
	doc.addEventListener( 'mousemove', this.__mouseMove, false );
	doc.addEventListener( 'mousedown', this.__mouseDown, false );
	doc.addEventListener( 'mouseup', this.__mouseUp, false );
	
	
	function IsKeyPressed(k){
		return this.keys[__getKey(k)].pressed;
	}
	
	function IsKeyUp(k){
		return this.keys[__getKey(k)].up;
	}
	
    function IsKeyDown(k){
		return this.keys[__getKey(k)].down;
	}
	
	function Update(deltaTime){
		for(let i = 0; i < keys.Length; i++){
			this.keys[i].down = false;
			this.keys[i].up = false;
		}
	}
	
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
	

	function __key(_name){
		this.name = _name;
		this.pressed = false;
		this.down = false;
		this.up = false;
	}

	
}