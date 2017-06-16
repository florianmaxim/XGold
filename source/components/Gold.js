import      React from 'react';

import * as THREE from 'three';
import {OrbitControls} from './OrbitControls';

import DiamondSquare from './DiamondSquare';

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

let renderer, camera, controls, scene, mesh;

let alpha, beta, gamma;

let mouseX = 0
let mouseY = 0

let YRotation = 0;
let XRotation = 0;

let valueY=0;
let valueX=0;

let lastValueY=0;
let lastValueX=0;

let oldYRotation = 0;
let oldXRotation = 0;

var windowHalfX;
var windowHalfY;

let mouseOut;

function degToRad(degrees){
	return degrees * Math.PI/180;
}

function rotate(){

  var gold = scene.getObjectByName('gold');

  if(isMobile.any())
  {
  	//LANDSCAPE
  	if(window.innerWidth>window.innerHeight)
  	{
  		//y value
  		var valueY=degToRad(Math.abs(alpha)+90);

  		if(valueY<7 && valueY>5)
  		{
  		    lastValueY = valueY;

            if(gold) gold.rotation.y=valueY;
  		}else if(valueY<5 && valueY>1)
  		{
  	        lastValueY = valueY+3.1;

  			if(gold) gold.rotation.y=valueY+3.1;
  		}else{
  			if(gold) gold.rotation.y=0;
  		}


  		//x value
  		var valueX=degToRad(Math.abs(gamma)-45)*.5;

  		if(valueX<0.4 && valueX>-0.4){
  			lastValueX = valueX;
  			if(gold) gold.rotation.x=valueX;
  		}else{
  			if(gold) gold.rotation.x=lastValueX;
  		}

  	}else{
  	//PORTRAIT

  	//gold.rotation.z=Math.degToRad(alpha);
  	if(gold) gold.rotation.x=degToRad(beta-45);
  	if(gold) gold.rotation.y=degToRad(gamma)*.5;

  	}
  }
		else
	{

		//TODO clean this up!

		let posX = 0;
		let posY = 0;

		posX = camera.position.x;
		posY = camera.position.y;
		//
		// console.log('posX'+posX)
		// console.log('posY'+posY)

		let newPosX = posX + ( mouseX - posX ) * .01;
		let newPosY = posY + ( - mouseY - posY ) * .01;

		// console.log('newPosX: '+newPosX)
		// console.log('newPosY: '+newPosY)

		camera.position.x = newPosX;
		camera.position.y = newPosY;

	}

}

function init(block){

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 10000 );
    camera.position.z = 50;
    camera.position.y = 0;
    camera.name = 'camera';
    camera.lookAt(scene.position);

    scene.add(camera);

    controls = new OrbitControls(camera);

    addEventListener('resize', () =>{
      console.log('three js resize')
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

    rotate();

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

  componentWillMount(){

    windowHalfX = innerWidth/2
    windowHalfY = innerHeight/2;

    addEventListener('deviceorientation', function (value){

    	alpha = value.alpha;
    	beta  = value.beta;
    	gamma = value.gamma;

    }, false);

    addEventListener( 'mousemove', function(event) {

    	mouseX = ( event.clientX - windowHalfX ) / 2;
    	mouseY = ( event.clientY - windowHalfY ) / 2;

    }, false );

    addEventListener( 'mouseout', function(event) {
    	mouseOut=true;
    }, false );

  }

  componentWillReceiveProps(props){

    console.error('NEW GOLD!')
    
    let number = this.props.input;

    let block = {}

    var url = 'https://etherchain.org/api/block/'+number;

    let params = {
                   method: 'GET',
                   headers: {
                      Accept: 'application/json'
                     }
                 }

    fetch(url, params).then(res => res.json()).then((out) => {

      block.number            = out.data[0].number;
      block.hash              = out.data[0].hash;
      block.size              = out.data[0].size;
      block.transactionAmount = out.data[0].tx_count;

      console.log(JSON.stringify(block.hash));

      let url = 'https://etherchain.org/api/block/'+number+'/tx';

      let params = {
                     method: 'GET',
                     headers: {
                        Accept: 'application/json'
                       }
                   }

      fetch(url, params).then(res => res.json()).then((out) => {

        block.transactions = out.data;

        init(block);
        animate();

      });

    });
  }

  componentDidMount(){

    var href = window.location.href.split('/');

    let number = this.props.input;

    let block = {}

    var url = 'https://etherchain.org/api/block/'+number;

    let params = {
                   method: 'GET',
                   headers: {
                      Accept: 'application/json'
                     }
                 }

    fetch(url, params).then(res => res.json()).then((out) => {

      block.number            = out.data[0].number;
      block.hash              = out.data[0].hash;
      block.size              = out.data[0].size;
      block.transactionAmount = out.data[0].tx_count;

      console.log(JSON.stringify(block.hash));

      let url = 'https://etherchain.org/api/block/'+number+'/tx'

      fetch(url, params).then(res => res.json()).then((out) => {

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
