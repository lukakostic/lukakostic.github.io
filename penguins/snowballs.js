"use strict";

let snowballs = [];

function middle(a,b){
return a.clone().sub(b).divideScalar(2).add(a);
//return ((a-b)/2+a);
}

function findParabola(top,point){
 return ((point.z-top.z)/((point.x-top.x)**2));
}

function lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
}

function parabolaY(x,a,h,k){
 return ((a*((x-h)**2)) + k);
}

class Snowball{
 constructor(_start,_end){
 this.start = _start.clone();
 this.end = _end.clone();
 this.end.setY(-1.1);
 this.vertex = middle(this.start,this.end);
 this.vertex.setY(this.vertex.y+(this.start.distanceTo(this.end)/4));
 //this.a = findParabola(this.vertex,this.start);
 this.object = new THREE.Mesh( new THREE.SphereGeometry( 0.3, 8, 8 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ) );
 this.object.position.set(this.start.x,this.start.y,this.start.z);
  this.alive = true;
 scene.add(this.object);
 }
}

function ThrowSnowball(start,end){
snowballs.push(new Snowball(start,end));
}

function UpdateSnowballs(delta){
for(let i = 0; i < snowballs.length; i++){
 if(!snowballs[i].alive)continue;
//snowballs[i].object.position.lerp(snowballs[i].end,delta*13);
 if(snowballs[i].object.position.distanceTo(snowballs[i].end)>0.15){
snowballs[i].object.position.add((snowballs[i].end.clone().sub(snowballs[i].object.position)).normalize().multiplyScalar(delta*40));
let d = snowballs[i].object.position.clone().setY(0).distanceTo(snowballs[i].end.clone().setY(0))/snowballs[i].start.clone().setY(0).distanceTo(snowballs[i].end.clone().setY(0));

  snowballs[i].object.position.setY(
 lerp(
  lerp(
  snowballs[i].end.y,
  snowballs[i].start.y,
  d
 ),
  snowballs[i].vertex.y,
  ((0.5-Math.abs(0.5-(d)))*2)
 )
);
  
// snowballs[i].object.position.setY(-parabolaY(snowballs[i].object.position.x,snowballs[i].a,snowballs[i].vertex.x,snowballs[i].vertex.z));
}else{
	snowballs[i].alive = false;
snowballs[i].object.position.copy(snowballs[i].end);
snowballs[i].object.material.color.setHex( 0x000fff );
	}
}
}
