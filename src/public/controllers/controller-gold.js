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
  MixOperation,
  TextureLoader,
  ShaderMaterial,
  Clock,
  RepeatWrapping,
  MeshStandardMaterial,
  MeshBasicMaterial
} from 'three';

import {OrbitControls} from './controller-orbit-controls';
import DiamondSquare   from './controller-diamond-square';

const vertexShader = `
  varying vec2 vUv;

  void main()
  {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
  }
`;
const fragmentShader = `

  uniform float time;

  uniform sampler2D texture;

  varying vec2 vUv;

  void main( void ) {

    vec2 position = - 1.0 + 2.0 * vUv;

    float a = atan( position.y, position.x );
    float r = sqrt( dot( position, position ) );

    vec2 uv;
    uv.x = cos( a ) / r;
    uv.y = sin( a ) / r;
    uv /= 10.0;
    uv += time * 0.05;

    vec3 color = texture2D( texture, uv ).rgb;

    gl_FragColor = vec4( color * r * 1.5, 1.0 );

}`;

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

let mesh = false;
var clock = new Clock();
var uniforms1, uniforms2;

let materialNebula;

let gold;
let material;

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

let rotationEnabled = true;
let controlsEnabled = true;

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

    controls = new OrbitControls(camera, renderer.domElement);

    /* Lights */
 
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


    /* 
      Init materials
    */

      clock = new Clock();

      uniforms1 = {
        time: { value: 1.0 }
      };
    
      uniforms2 = {
        time: { value: 1.0 },
        texture: { value: new TextureLoader().load( 'static/disturb1.jpg' ) }
      };
  
      uniforms2.texture.value.wrapS = uniforms2.texture.value.wrapT = RepeatWrapping;
  
      materialNebula = new ShaderMaterial( {
    
        uniforms: [ 'fragmentShader', uniforms2 ][ 1 ],
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    
        side: DoubleSide,
        combine: MixOperation,
        reflectivity: 1
    
      } );

      materialNebula.needsUpdate = true;
    
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

    renderer.domElement.addEventListener( 'mousemove', function(event) {
      mouseX = ( event.clientX - innerWidth/2 ) / 2;
      mouseY = ( event.clientY - innerHeight/2 ) / 2;
    }, false );

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

      var delta = clock.getDelta();

      if(rotationEnabled)
      if(gold){
        gold.rotation.x += delta/config.gold.autoRotateSpeed
        gold.rotation.z += delta/config.gold.autoRotateSpeed
      }

      if(uniforms1)
      uniforms1.time.value += delta * 5;
      if(uniforms2)
      uniforms2.time.value = clock.elapsedTime;


        if(controlsEnabled){
          rotate();
          controls.update();
        }

        requestAnimationFrame(animate);

        render();

    })();

    function render(){

        renderer.render( scene, camera );

    }

    return renderer.domElement;
  }

  getGold(){
    return gold;
  }

  updateRotation(mode){
    rotationEnabled = mode;
  }

  updateGold(block){

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
      reflectivity: .1} 
    );
    
    const materialGold = new MeshPhongMaterial( {
      side: DoubleSide,
      color: 0x564100,
     specular:0x937300,
      emissive:0xffffff,
      emissiveIntensity:.1,
    
      envMap: reflectionCube,
      //displacementMap: reflectionCube,
      //combine: THREE.MixOperation,
      reflectivity: .25} 
    );
    
    
        //Choose material according to block state
    switch(block.state){
      case 'nebula':
        material = materialNebula;
      break;
      case 'available':
        material = materialSilver;
      break;
      case 'gold':
        material = materialGold;
      break;
    }

    material.needsUpdate = true;

    gold.material = material;
    
  }

  generateGold(block){

    let factor = isMobile.any()?.5:1;

    const start = 512 // 512

    let width = start*factor;
    let height = start*factor;
    let segments = start*factor;
    let smooth = start*factor;

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

    const materialBlue = new MeshPhongMaterial( {
      side: DoubleSide,
      color: 0x0000ff,
      specular:0x937300,
      emissive:0xffffff,
      emissiveIntensity:.1,
    
      envMap: reflectionCube,
      //displacementMap: reflectionCube,
      //combine: THREE.MixOperation,
    
      reflectivity: .25} 
    );
    
    const materialGold = new MeshPhongMaterial( {
      side: DoubleSide,
      color: 0x564100,
     specular:0x937300,
      emissive:0xffffff,
      emissiveIntensity:.1,
    
      envMap: reflectionCube,
      //displacementMap: reflectionCube,
      //combine: THREE.MixOperation,
    
      reflectivity: .25} 
    );

    //Choose material according to block state
    switch(block.state){
      case 'available':
        material = materialSilver;
      break;
      case 'gold':
        material = materialGold;
      break;
      case 'nebula':
        material = materialNebula;
      break;
      default:
        material = materialSilver;
      break;  
    }

    gold = new Mesh( geometry, material );
    gold.name = 'gold';

    scene.remove(scene.getObjectByName('gold'));
    scene.add( gold );

  }

}