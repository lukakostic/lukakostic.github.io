"use strict";

function __key(_name){
	this.name = _name;
	this.pressed = false;
	this.down = false;
	this.up = false;
}

function InputEngine(doc){

	this.mouse = new THREE.Vector2(0,0);
	this.keys = [];
		
	for(let i = 0; i < 223; i++){
		this.keys.push(new __key(i));
	}
	
	doc.addEventListener( 'mousemove', this.__mouseMove, false );
	doc.addEventListener( 'mousedown', this.__mouseDown, false );
	doc.addEventListener( 'mouseup', this.__mouseUp, false );
	
}
	
	InputEngine.prototype.IsKeyPressed = function (k){
		return this.keys[__getKey(k)].pressed;
	};
	
	InputEngine.prototype.IsKeyUp = function (k){
		return this.keys[__getKey(k)].up;
	};
	
    InputEngine.prototype.IsKeyDown = function (k){
		return this.keys[__getKey(k)].down;
	};
	
	InputEngine.prototype.Update = function (deltaTime){
		for(let i = 0; i < this.keys.Length; i++){
			this.keys[i].down = false;
			this.keys[i].up = false;
		}
	};
	
	InputEngine.prototype.__getKey = function (c){
		if((typeof c) == 'string') return c.charCodeAt(0);
		else return c;
	}
	
	InputEngine.prototype.__mouseDown = function(event){
		this.keys[event.button+1].pressed = true;
		this.keys[event.button+1].down = true;
	}
	
	InputEngine.prototype.__mouseUp = function(event){
		this.keys[event.button+1].pressed = false;
		this.keys[event.button+1].up = true;
	}
	
    InputEngine.prototype.__mouseMove = function(event){
		this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}
	


