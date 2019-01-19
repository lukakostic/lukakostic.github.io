
class InputEngine{
	constructor(doc){
		doc.addEventListener( 'mousemove', this.MouseMove, false );
		doc.addEventListener( 'mousedown', this.MouseDown, false );
		doc.addEventListener( 'mouseup', this.MouseUp, false );
	}
}