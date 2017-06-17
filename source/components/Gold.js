import * as THREE from 'three';
import {OrbitControls} from './OrbitControls';

import DiamondSquare from './DiamondSquare';


let renderer, scene, camera, controls;
let mouseX, mouseY;
let alpha, beta, gamma;
let windowHalfX, windowHalfY;

let mesh;
let gold;

export default class Gold{

  constructor(){}

  getContext(){
    return renderer.domElement;
  }

  init(){

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 10000 );
    camera.position.set(0,0,100);

    camera.lookAt(scene.position);

    scene.add(camera);

    controls = new OrbitControls(camera);

    /* --- Lights --- */

    var light = new THREE.PointLight(0xffffff,2);
    light.position.y=100;
    light.position.x=-50;
    scene.add(light);

    var light = new THREE.PointLight(0xffffff,2);
    light.position.y=100;
    light.position.x=50;
    scene.add(light);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 10, 1).normalize();
    scene.add(light);

    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    /* --- Event Listener --- */

    addEventListener('resize', () =>{
      windowHalfX = innerWidth/2
      windowHalfY = innerHeight/2;
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix();
    });

    addEventListener('deviceorientation', (value) => {
      alpha = value.alpha;
      beta  = value.beta;
      gamma = value.gamma;
    }, false);

    addEventListener( 'mousemove', function(event) {
      mouseX = ( event.clientX - windowHalfX ) / 2;
      mouseY = ( event.clientY - windowHalfY ) / 2;
    }, false );

    /* --- Helper --- */


    /* --- Run --- */

    (function animate(){

        controls.update();

        requestAnimationFrame(animate);

        render();
    })();

    function render(){

        renderer.render( scene, camera );

    }

    return renderer.domElement;
  }

  gold(block){

    var length   = block.transactions.length===0?1:block.transactions.length;

    var width    = length*2;
    var height   = length*2;

    var segments = Math.pow(2, Math.ceil(Math.log(length)/Math.log(2)));
    var transactions = block.transactions;

    //TODO NO MAGIC NUMBER - RANDOMNESS ALREADY COMES FROM TEH BLOCK
    var smooth   =  .25

    var ground = new DiamondSquare(width, height, segments, smooth, transactions);
    var ground = ground.generate();

    var geometry = new THREE.PlaneGeometry(width, height, segments, segments);

    var index = 0;
    for(var i = 0; i <= segments; i++) {
      for(var j = 0; j <= segments; j++) {
        geometry.vertices[index].z = ground[i][j];
        index++;
      }
    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var path = "static/textures/cube/";
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

    var reflectionCube = new THREE.CubeTextureLoader().load( urls );
        reflectionCube.format = THREE.RGBFormat;

    var refractionCube = new THREE.CubeTextureLoader().load( urls );
        refractionCube.mapping = THREE.CubeRefractionMapping;
        refractionCube.format = THREE.RGBAFormat;

    var material = new THREE.MeshPhongMaterial( {
      side: THREE.DoubleSide,
      color: 0x564100,
      specular:0x937300,
      emissive:0xffffff,
      emissiveIntensity:.1,
      envMap: reflectionCube,
      displacementMap: reflectionCube,
      combine: THREE.MixOperation,
      reflectivity: .25} );

      //remove the gold gold, its time for the new bar.

    if(gold) scene.remove(gold);

    gold = new THREE.Mesh( geometry, material );
    gold.name = 'gold';
    // gold.scale(.1,.1,.1);

    scene.add( gold );
  }

}
