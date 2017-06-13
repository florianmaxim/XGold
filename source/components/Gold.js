import      React from 'react';

import * as THREE from 'three';
import {OrbitControls} from './OrbitControls';

import DiamondSquare from './DiamondSquare';

let renderer, camera, controls, scene, mesh;

function init(block){

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();

    //test guy
    // var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    // var geometry = new THREE.CubeGeometry(50,50,50);
    //     mesh     = new THREE.Mesh(geometry, material);
    //
    // scene.add(mesh)

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 10000 );
    camera.position.z = 50;
    camera.position.y = 0;
    camera.name = 'camera';
    camera.lookAt(scene.position);

    scene.add(camera);

    controls = new OrbitControls(camera);

    addEventListener('resize', () =>{
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix();
    });

    var ambient = new THREE.AmbientLight( 0xffffff );
  	scene.add( ambient );

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

    //gold

    var length   = block.transactions.length===0?1:block.transactions.length;

		var width    = length*2;
		var height   = length*2;

		var segments = Math.pow(2, Math.ceil(Math.log(length)/Math.log(2)));
		var transactions = block.transactions;

		//TODO USE! not used so far- stupid
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

		let gold = new THREE.Mesh( geometry, material );
		    gold.name = 'gold';

		scene.add( gold );

    document.getElementById("webgl").appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame(animate);

    render();
}

function render(){

    renderer.render( scene, camera );

    controls.update();
}

export default class Gold extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){

    var href = window.location.href.split('/');

    let number = this.props.input;

    let block = {}

    var url = 'https://etherchain.org/api/block/'+number;

    fetch(url).then(res => res.json()).then((out) => {

      block.number            = out.data[0].number;
      block.hash              = out.data[0].hash;
      block.size              = out.data[0].size;
      block.transactionAmount = out.data[0].tx_count;

      console.log(JSON.stringify(block.hash));

      let url = 'https://etherchain.org/api/block/'+number+'/tx'
      fetch(url).then(res => res.json()).then((out) => {

        block.transactions = out.data;

        init(block);
        animate();

      });

    });
  }

  render(){
    return(
      <div className="gold" id="webgl"></div>
    );
  }
}
