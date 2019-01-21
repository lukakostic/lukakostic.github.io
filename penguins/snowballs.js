"use strict";

let snowballs = [];

function middle(a,b){
return a.clone().sub(b).divideScalar(2).add(a);
//return ((a-b)/2+a);
}

function findParabola(top,point){
 return ((point.y-top.y)/((point.x-top.x)**2));
}


function parabolaY(x,a,h,k){
 return ((a*((x-h)**2)) + k);
}

class Snowball{
 constructor(_start,_end){
 this.start = _start;
 this.end = _end;
 this.vertex = middle(_start,_end);
 this.vertex.setY(this.vertex.y+(_start.distanceTo(_end)/4));
 this.a = findParabola(this.vertex,this.start);
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
snowballs[i].object.position.add((snowballs[i].end.clone().sub(snowballs[i].object.position)).normalize().multiplyScalar(delta*8));
  snowballs[i].object.position.setY(-parabolaY(snowballs[i].object.position.x,snowballs[i].a,snowballs[i].vertex.x,snowballs[i].vertex.y));
}
}
}
