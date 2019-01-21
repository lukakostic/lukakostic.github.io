"use strict";

			let camera, scene= new THREE.Scene(), renderer;
			
let input = new InputEngine(window);			
			
			let player;
			
			
			let raycaster = new THREE.Raycaster();
			let pos = new THREE.Vector3(); // create once and reuse
			
let plane = new THREE.Mesh( new THREE.BoxGeometry( 100, 0.1, 100 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
plane.position.set(0,-1,0);
//plane.rotation.x = Math.PI / 2+Math.PI;
//plane.visible = false;
			
			init();
			
			

			async function init() {

				//camera = new THREE.OrthographicCamera(-30,30,30,-30,1,1000);
				camera = new THREE.PerspectiveCamera( 28, window.innerWidth / window.innerHeight, 1, 1000 );
				
				//camera.position.set( 0, 130, -150 );
				camera.position.set( 0, 130, -100 );
				camera.lookAt( 0, 0, 0 );

				
				scene.add(plane);
				
				/*
				let image = document.createElement( 'img' );
				image.addEventListener( 'load', function () {
				}, false );
				image.src = 'threejs/examples/textures/sprite.png';
*/
				let fbxloader = new THREE.FBXLoader();
			    let object = await (new Promise(function(resolve, reject) {
				fbxloader.load( 'models/Penguin.fbx', function ( loaded) {
				loaded.material = new THREE.MeshToonMaterial( {
								color: 0xffffff,
								specular: 0x000000,
								reflectivity: 0,
								shininess: 0,
							} );
							//loaded.scale.set(0.1,0.1,0.1);
				 resolve(loaded);
					/*
					object.traverse( function ( child ) {
						if ( child.isMesh ) {
							child.castShadow = true;
							child.receiveShadow = true;
						}
					} );
					*/
					});
					}));
					
					
							
						player = object;
						scene.add( object );

						
					    let sun = new THREE.DirectionalLight();
						sun.position.set(100,100,-100);
						scene.add( sun );
							
						let light = new THREE.AmbientLight( 0xffffff ); // soft white light
						scene.add( light );

        //scene.add( new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ), new THREE.MeshBasicMaterial( {color: 0xf00f00} ) ) );
		
				renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    //renderer.setClearColor( 0x000000, 0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.querySelector('#webgl').appendChild( renderer.domElement );
	
				window.addEventListener( 'resize', onWindowResize, false );

new RenderLoop(update,renderer,scene,camera);
}



function update(delta){	
	if(input.IsKeyDown(1)){
	raycaster.setFromCamera( input.mouse, camera );
	let intersects = raycaster.intersectObjects([plane]);
		if(intersects.length>0)
		pos = intersects[0].point;
		//intersects[i].object.material.color.set( 0xe0ffff );
	
	}

	if(input.IsKeyDown(2) || input.IsKeyDown('t')){
	raycaster.setFromCamera( input.mouse, camera );
	let intersects = raycaster.intersectObjects([plane]);
		if(intersects.length>0)
		ThrowSnowball(player.position,intersects[0].point);
		//intersects[i].object.material.color.set( 0xe0ffff );
	
	}
	
	
if(pos.distanceTo(player.position)>0.1){
player.rotation.y = Math.atan2( ( pos.x - player.position.x ), ( pos.z - player.position.z ) )+Math.PI;
player.position.add((pos.clone().sub(player.position)).normalize().multiplyScalar(delta*5));
	player.position.setY(0);
}

	UpdateSnowballs(delta);
	
input.Update();
}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}


