"use strict";

			let camera, scene= new THREE.Scene(), renderer;
			let input = new InputEngine(window);
			

			let clock = new THREE.Clock();
			let delta;
			
			let player;
			
			
			let raycaster = new THREE.Raycaster();
			let pos = new THREE.Vector3(); // create once and reuse
			
let plane = new THREE.Mesh( new THREE.PlaneGeometry( 300, 300 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
plane.rotation.x = Math.PI / 2+Math.PI;
//plane.visible = false;
			
			init();
			
			

			async function init() {

				//camera = new THREE.OrthographicCamera(-200,200,200,-200,1,5000);
				camera = new THREE.PerspectiveCamera( 8, window.innerWidth / window.innerHeight, 1, 1000 );
				
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

						let grid = new THREE.GridHelper( 10, 1, 0x0000ff, 0x808080 );
						grid.position.set(0,-1,0);
						scene.add( grid );
						
					    let sun = new THREE.DirectionalLight();
						sun.position.set(100,100,-100);
						scene.add( sun );
							
						let light = new THREE.AmbientLight( 0xffffff ); // soft white light
						scene.add( light );

        scene.add( new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ), new THREE.MeshBasicMaterial( {color: 0xf00f00} ) ) );
		
				renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    //renderer.setClearColor( 0x000000, 0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.querySelector('#webgl').appendChild( renderer.domElement );
	
				window.addEventListener( 'resize', onWindowResize, false );

				render();
}


function render() {
			requestAnimationFrame( render );
			delta = clock.getDelta();
			
			update();
			
			renderer.render( scene, camera );

}

function update(){
raycaster.setFromCamera( input.mouse, camera );
let intersects = raycaster.intersectObjects( scene.children );
if(intersects.Length>0){console.log('pos');pos = intersects[0].point;}

player.rotation.y = Math.atan2( ( pos.x - player.position.x ), ( pos.z - player.position.z ) )+Math.PI;
player.position.add((player.position.clone().sub(pos)).normalize().multiplyScalar(delta*10));
//player.position.copy(pos);

input.Update(delta);
}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}


