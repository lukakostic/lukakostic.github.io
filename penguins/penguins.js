"use strict";

			let camera, scene= new THREE.Scene(), renderer;
			
let input = new InputEngine(window);			
			
			let player;
			
			
			let raycaster = new THREE.Raycaster();
			let pos = new THREE.Vector3(); // create once and reuse
			
let plane = new THREE.Mesh( new THREE.BoxGeometry( 10, 0.1, 10 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
//plane.rotation.x = Math.PI / 2+Math.PI;
//plane.visible = false;
			
			init();
			
			

			async function init() {

				//camera = new THREE.OrthographicCamera(-200,200,200,-200,1,5000);
				camera = new THREE.PerspectiveCamera( 38, window.innerWidth / window.innerHeight, 1, 1000 );
				
				camera.position.set( 0, 120, -150 );
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
	
	raycaster.setFromCamera( input.mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );
	for ( var i = 0; i < intersects.length; i++ )
		pos = intersects[i].point;//object.material.color.set( 0xe0ffff );

if(pos.distanceTo(player.position)>0.1){
player.rotation.y = Math.atan2( ( pos.x - player.position.x ), ( pos.z - player.position.z ) )+Math.PI;
player.position.add((pos.clone().sub(player.position)).normalize().multiplyScalar(delta*10));
}

if(input.IsKeyPressed('a'))player.position.set(3,0,0);

input.Update();
}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}


