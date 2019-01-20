"use strict";

class InputEngine{
    __mouseMove(event){
		this.mouse = 5;
	};
	
	constructor(_doc){
	this.mouse =3;
	_doc.addEventListener( 'mousemove', this.__mouseMove, false );
	}
}
	

	


