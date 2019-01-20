"use strict";

class __key{
	constructor(_name){
	this.name = _name;
	this.pressed = false;
	this.down = false;
	this.up = false;
	}
}

class InputEngine{
	
	IsKeyPressed (k){
		return this.keys[__getKey(k)].pressed;
	};
	
	IsKeyUp (k){
		return this.keys[__getKey(k)].up;
	};
	
    IsKeyDown (k){
		return this.keys[__getKey(k)].down;
	};
	
	Update (deltaTime){
		for(let i = 0; i < this.keys.Length; i++){
			this.keys[i].down = false;
			this.keys[i].up = false;
		}
	};
	
	__getKey (c){
		if((typeof c) == 'string') return c.charCodeAt(0);
		else return c;
	};
	
	__mouseDown(event){
		this.keys[event.button+1].pressed = true;
		this.keys[event.button+1].down = true;
	};
	
	__mouseUp(event){
		this.keys[event.button+1].pressed = false;
		this.keys[event.button+1].up = true;
	};
	
    __mouseMove(event){
		this.mouse.x = ( event.clientX / this.doc.innerWidth ) * 2 - 1;
		this.mouse.y = - ( event.clientY / this.doc.innerHeight ) * 2 + 1;
	};
	
	constructor(_doc){
	
	this.doc = _doc;
	this.mouse = new THREE.Vector2(0,0);
	this.keys = [];
		
	for(let i = 0; i < 223; i++){
		this.keys.push(new __key(i));
	}
		
	this.doc.addEventListener( 'mousemove', this.__mouseMove, false );
	this.doc.addEventListener( 'mousedown', this.__mouseDown, false );
	this.doc.addEventListener( 'mouseup', this.__mouseUp, false );
	}
	

	
}
	

	


