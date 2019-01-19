"use strict";

class Key{
	let name;
	let down;
	let downNow;
	constructor(_name){
		this.name = _name;
		this.down = false;
		this.downNow = false;
	}
}

class InputEngine{
	let mouse = new THREE.Vector2();
	
	
	constructor(doc){
		doc.addEventListener( 'mousemove', this.MouseMove, false );
		doc.addEventListener( 'mousedown', this.MouseDown, false );
		doc.addEventListener( 'mouseup', this.MouseUp, false );
	}
	
	function update(delta){
		
	}
	
	function MouseDown(event){
		
	}
	
	function MouseUp(event){
		
	}
	
	function MouseMove(event){
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}
	
}