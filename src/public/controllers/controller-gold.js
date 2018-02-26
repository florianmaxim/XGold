import * as config from '../../../config.json';

import {
  PlaneGeometry, 
  PointLight,
  DirectionalLight,
  AmbientLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  MeshPhongMaterial,
  CubeTextureLoader,
  SphereGeometry,
  CubeRefractionMapping,
  DoubleSide,
  MixOperation
} from 'three';

import {OrbitControls} from './controller-orbit-controls';
import DiamondSquare   from './controller-diamond-square';

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

let renderer, scene, camera, controls = false;

let gold = false;
let mesh = false;

let mouseX, mouseY = false;

let YRotation = 0;
let XRotation = 0;
let posX = 0;
let posY = 0;
let valueY=0;
let valueX=0;
let newPosX = 0;
let newPosY = 0;
let lastValueY=0;
let lastValueX=0;
let alpha, beta, gamma = 0;

function degToRad(degrees){
	return degrees * Math.PI/180;
}

/** 
 * 
 * This is the graphical canvas using the three js framework.
*/

export default class Gold{

  constructor(){}

  init(){

    /* System */

    renderer = new WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setClearColor(0x000000);

    scene = new Scene();

    camera = new PerspectiveCamera( config.camera.focus, window.innerWidth / window.innerHeight, .1, 10000 );
    camera.position.set(config.camera.position.x, config.camera.position.y, config.camera.position.z);
    camera.name = 'camera';

    camera.lookAt(scene.position);

    scene.add(camera);

    controls = new OrbitControls(camera);

    /* Lights */

/*     var light = new PointLight(0xffffff,2);
    light.position.y=100;
    light.position.x=-50;
    scene.add(light);

    var light = new PointLight(0xffffff,2);
    light.position.y=100;
    light.position.x=50;
    scene.add(light);

    var light = new DirectionalLight(0xffffff);
    light.position.set(0, 10, 1).normalize();
    scene.add(light);

    var ambient = new AmbientLight( 0xffffff );
    scene.add( ambient ); */

    var ambient = new AmbientLight( 0xeaf4f9, 1 );
    scene.add( ambient );

    var light = new PointLight(0xffffff, .5);
    light.position.y=100;
    light.position.x=-50;
    scene.add(light);

    var light = new PointLight(0xffffff, .5);
    light.position.y=100;
    light.position.x=50;
    scene.add(light);

    var light = new PointLight(0xffffff, .5);
    light.position.y=100;
    light.position.x=50;
    light.position.z=50;
    
    scene.add(light);

    var light = new DirectionalLight(0xffffff, .5);
    light.position.set(0, 10, 1).normalize();
    scene.add(light);

    /* --- Event Listener --- */

    addEventListener('resize', () =>{
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
      mouseX = ( event.clientX - innerWidth/2 ) / 2;
      mouseY = ( event.clientY - innerHeight/2 ) / 2;
    }, false );

    /* --- Helper --- */

/*     let mat = new MeshPhongMaterial({color: 0xffd700})
    let geo = new SphereGeometry(50,1,1);
    mesh = new Mesh(geo, mat);
    mesh.name = 'gold';
    scene.add(mesh); */

    /* --- Rotation --- */

    function rotate(){ 

      if(!scene.getObjectByName('camera')) return;
      if(!scene.getObjectByName('gold')) return;

      let object = scene.getObjectByName('gold');

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

                object.rotation.y=valueY;
          }else if(valueY<5 && valueY>1)
          {
                lastValueY = valueY+3.1;

            object.rotation.y=valueY+3.1;
          }else{
            object.rotation.y=0;
          }

          //x value
          var valueX=degToRad(Math.abs(gamma)-45)*.5;

          if(valueX<0.4 && valueX>-0.4){

            object.rotation.x=valueX;
            lastValueX = valueX;

          }else{
            object.rotation.x=lastValueX;
          }

        }else{

          object.rotation.x=degToRad(beta-45);
          object.rotation.y=degToRad(gamma)*.5;

        }
      }
        else
      {

        if(!mouseX) return;
        if(!mouseY) return;

        posX = camera.position.x;
        posY = camera.position.y;

        newPosX = posX + ( mouseX - posX ) * .05;
        newPosY = posY + ( - mouseY - posY ) * .05;

        camera.position.x = newPosX;
        camera.position.y = newPosY;

      }

    }

    /* --- Run --- */

    (function animate(){

        rotate();

        controls.update();

        requestAnimationFrame(animate);

        render();

    })();

    function render(){

        renderer.render( scene, camera );

    }

    return renderer.domElement;
  }

  /**
    Generates the gold mesh from a block object
    
    block.length = 
    block.height =
  */
  generate(block){

    console.log(`[GOLD] Block: ${block.number}`)

    const factor = isMobile.any()?.5:1;

    let width = 512*factor;
    let height = 512*factor;
    let segments = 512*factor;
    let smooth = 256*factor;

    //Generate surface data with DiamndSquare algorithm
    let surface  = new DiamondSquare(width, height, segments, smooth).generate();

    //Generate blank plane geometry
    let geometry = new PlaneGeometry(width, height, segments, segments);

    //Apply surface data on plane geometry
    let index = 0;
    for(var i = 0; i <= segments; i++) {
      for(var j = 0; j <= segments; j++) {
        geometry.vertices[index].z = surface[i][j];
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

    var reflectionCube = new CubeTextureLoader().load( urls );

    var refractionCube = new CubeTextureLoader().load( urls );
        refractionCube.mapping = CubeRefractionMapping;


    const materialSilver = new MeshPhongMaterial( {
      side: DoubleSide,
    /*   color: 0x564100,
      specular:0x937300,
      emissive:0xffffff, */
      color: 0x000000,
      specular:0x7c7c7c,
      emissive:0xffffff,
      emissiveIntensity:.1,
      envMap: reflectionCube,
     /*  displacementMap: reflectionCube,
      combine: MixOperation, */
      reflectivity: .1} );

    const materialGold = new MeshPhongMaterial( {
      side: DoubleSide,
      color: 0x564100,
     specular:0x937300,
      emissive:0xffffff,
      emissiveIntensity:.1,

      envMap: reflectionCube,
      //displacementMap: reflectionCube,
      //combine: THREE.MixOperation,

      reflectivity: .25} );

    //remove old mesh
    scene.remove(scene.getObjectByName('gold'));

    //Choose material according to block state
    let material;
    switch(block.state){
      case 'available':
        material = materialSilver;
      break;
      case 'owned':
        material = materialGold;
      break;
      default:
        material = materialSilver;
      break;  
    }

    gold = new Mesh( geometry, material );
    gold.name = 'gold';

    scene.add( gold );
  }

}