"use strict";

let snowballs = [];

function middle(a,b){
return ((a-b)/2+a);
}

class Snowball{
 constructor(_start,_end){
 this.start = _start;
 this.end = _end;
 this.vertex = new THREE.Vector3(middle(_start.x,_end.x),middle(_start.y,_end.y),middle(_start.z,_end.z));
 this.time = 0;
 this.object = new THREE.Mesh( new THREE.SphereGeometry( 0.3, 8, 8 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ) );
 this.object.position.set(_start.x,_start.y,_start.z);
  scene.add(this.object);
 }
}

function ThrowSnowball(start,end){
snowballs.push(new Snowball(start,end));
}

function UpdateSnowballs(delta){
for(let i = 0; i < snowballs.length; i++){
//snowballs[i].object.position.lerp(snowballs[i].end,delta*13);
 if(snowballs[i].object.position.distanceTo(snowballs[i].end)>0.1){
snowballs[i].object.position.add((snowballs[i].end.clone().sub(snowballs[i].object.position.position)).normalize().multiplyScalar(delta*13));
}
}
}
