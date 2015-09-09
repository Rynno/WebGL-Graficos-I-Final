var gl;
var m4;
var lightWorldPosition;
var lightColor ;
var camera;
var view;
var viewProjection;
var shapes ;
var programInfo;
var baseHue;
var textEsfera;
var objects = [];
var drawObjects = [];
var requestId;
var positions=[];
var pendingTransformation = [ ];
var delanteatras=-28;
var izquidere=0;

var color = new Uint8Array(4);
window.addEventListener("load", inicializar, false);

$("#rotar").click(function(){
    render(); 
});

function inicializar(){

    //Se crean los sliders
    $('#sliderX').slider();
    $('#sliderY').slider();
    $('#sliderZ').slider();

    $('#sliderX').on("slide", function(slideEvt) {
        var delta = slideEvt.value - $('#sliderX').attr("data-last");
        console.log("x: " + delta);
        $('#sliderX').attr("data-last", slideEvt.value);
        var mat = obtenerOpMatrixSelectX(delta);
        aplicarTransformacion(obtenerIndiceFigSelect(),mat);
		
		
    });

    $('#sliderY').on("slide", function(slideEvt) {
        var delta = slideEvt.value - $('#sliderY').attr("data-last");
        console.log("y: " + delta);
        $('#sliderY').attr("data-last", slideEvt.value);
		
        var mat = obtenerOpMatrixSelectY(delta);
        aplicarTransformacion(obtenerIndiceFigSelect(),mat);
    });

    $('#sliderZ').on("slide", function(slideEvt) {
        var delta = slideEvt.value - $('#sliderZ').attr("data-last");
        $('#sliderZ').attr("data-last", slideEvt.value);
        var mat = obtenerOpMatrixSelectZ(delta);
        aplicarTransformacion(obtenerIndiceFigSelect(),mat);
    });

    "use strict";
    twgl.setAttributePrefix("a_");
    m4 = twgl.m4;
    gl = twgl.getWebGLContext(document.getElementById("c"));
    programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
	

	gl.canvas.addEventListener("mousedown", function(event){
	console.log("click");
			var attachments = [
			  { format: gl.RGBA, type: gl.UNSIGNED_BYTE, min: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE },
			  { format: gl.DEPTH_STENCIL, },
			];
			var fbi = twgl.createFramebufferInfo(gl, attachments)
			
			var pixels = new Uint8Array(4);			
			var x = event.clientX;
			var y = event.clientY;
			console.log(x + ', ' + y);
			gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
		console.log(fbi);
		console.log(pixels);
    });
	
	
	
	
	document.addEventListener('keydown', function(event) {
		//arriba
        if(event.keyCode === 38) {
		delanteatras=delanteatras+0.5;
		//alert(delanteatras);
		}
		//abajo
		if(event.keyCode === 40) {
		delanteatras=delanteatras-0.5;
		}
		//izquierda
		if(event.keyCode === 37) {
		izquidere=izquidere+0.5;
		}
		//derecha
		if(event.keyCode === 39) {
		izquidere=izquidere-0.5;
		}
		if(event.keyCode === 38) {
		}
		if(event.keyCode === 40) {
		}		
		//a 65
		//d 68
		//w 87
		//s 83
		//z 90 
		//x 88
		//arriba 38
		//abajo 40
		//izq 37
		//dere 39
    }, false);


    shapes = [
      twgl.primitives.createPlaneBufferInfo(gl, 18, 25, 10, 10), //width, height, subdivision
      twgl.primitives.createCylinderBufferInfo(gl, 0.5, 9, 24, 2),
      twgl.primitives.createCubeBufferInfo(gl,3),
      twgl.primitives.createSphereBufferInfo(gl, 2, 24, 32),
      twgl.primitives.createTorusBufferInfo(gl, 2, 0.5, 24, 12),
	  twgl.primitives.createTruncatedConeBufferInfo(gl, 2, 0, 4, 24, 1),
    ];

    lightWorldPosition = [1, 8, -10];
    lightColor = [1, 1, 1, 1];
    camera = m4.identity();
    view = m4.identity();
    viewProjection = m4.identity();

    var numObjects = shapes.length;
    baseHue = rand(0, 360); //color que se usara
    baseHue = rand(0, 360); //color que se usara

    /*posiciones iniciales*/
    positions[0]=[0,0,0];//plano
    positions[1]=[0,4,0];//cilindro
    positions[2]=[4,2,4];//cubo
    positions[3]=[6,2,-6];//esfera
    positions[4]=[-4,1,-7];//toroide
	positions[5]=[1.3,2,-7];//piramide
	

    //0=plano, 1=tubo, 2=cubo, 3=esfera, 4=toroide
    settingsFiguraPorIndice(0);
    settingsFiguraPorIndice(1);
    settingsFiguraPorIndice(2);
    settingsFiguraPorIndice(3);
    settingsFiguraPorIndice(4);
	settingsFiguraPorIndice(5);
    requestAnimationFrame(render);
}
      

      function obtenerIndiceFigSelect(){
          figura=$('select[name="figura"]').val()
          return figura;
      }

      function obtenerOpMatrixSelectX(value){
          op=$('select[name="operation"]').val()
          switch(op){
              case "t":
				
                return m4.translation([value, 0, 0]);
                break;
              case "r":
                return m4.rotationX(value);
                break;
              case "e":
                return m4.scaling([value,1,1]);
                break;
          };
          return figura;
      }

      function obtenerOpMatrixSelectY(value){
          op=$('select[name="operation"]').val()
          switch(op){
              case "t":
                return m4.translation([0, value, 0]);
                break;
              case "r":
                return m4.rotationY(value);
                break;
              case "e":
                return m4.scaling([1,value,1]);
                break;
          };
          return figura;
      }

      function obtenerOpMatrixSelectZ(value){
          op=$('select[name="operation"]').val()
          switch(op){
              case "t":
                return m4.translation([0, 0, value]);
                break;
              case "r":
                return m4.rotationZ(value);
                break;
              case "e":
                return m4.scaling([1,1,value]);
                break;
          };
          return figura;
      }

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function render(time) {
  gl.canvas.width = window.innerWidth/1.5;
  gl.canvas.height = window.innerHeight/1.5;

  time *= 0.001;
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.5, 100);
  //,,delante atras
  var eye = [];
	  eye[0] = -1;
	  eye[1] = 4;
	  eye[2] = delanteatras;
  var target = [izquidere, 4, 0];
  var up = [0, 1, 0];

  m4.lookAt(eye, target, up, camera);
  m4.inverse(camera, view);
  m4.multiply(view, projection, viewProjection);
  drawFiguraPorIndice(time, 0);
  drawFiguraPorIndice(time, 1);
  drawFiguraPorIndice(time, 2);
  drawFiguraPorIndice(time, 3);
  drawFiguraPorIndice(time, 4);
  drawFiguraPorIndice(time, 5);
  twgl.drawObjectList(gl, drawObjects);

  requestId= requestAnimationFrame(render);
}

function cancelarAnimation(){
  if(requestId){
    cancelAnimationFrame(requestId);
    requestId=undefined;
  }
}

function settingsFiguraPorIndice(i){

  initial_position=positions[i];//esfera

  if (i==0){
    textEsfera = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/chess.jpg",
    });  
  } else if (i==1) {
    textEsfera = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/beach.jpg",
    }); 
  } else if (i==2) {
    textEsfera = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/cubo1.jpg",
    }); 
  } else if (i==3) {
    textEsfera = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/moon.gif",
    }); 
  } else if (i==4) {
    textEsfera = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/texturez_4496.jpg",
    }); 
  }
  else if (i==5) {
    textEsfera = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/pyramid2.jpg",
    }); 
  }
  
  var uniforms = {
    u_lightWorldPos: lightWorldPosition,
    u_lightColor: lightColor,
    u_diffuseMult: [1,1,1,1],
    u_specular: [1, 1, 1, 1],
    u_shininess: 50,
    u_specularFactor: 1,
    u_diffuse: textEsfera,
    u_viewInverse: camera,
    u_world: m4.identity(),
    u_worldInverseTranspose: m4.identity(),
    u_worldViewProjection: m4.identity(),
  };

  objects[i]={
    translation: initial_position,
    ySpeed: rand(0.1, 0.3),
    zSpeed: rand(0.1, 0.3),
    uniforms: uniforms,
  };

  pendingTransformation[i] = m4.identity();
}


function drawEsfera(time){
uniforms=objects[3].uniforms;
   drawObjects[3]={
        programInfo: programInfo,
        bufferInfo: shapes[3],
        uniforms: uniforms,
      };

        var obj=objects[3];

        var uni = obj.uniforms;
        var world = uni.u_world;
        m4.identity(world);
        m4.rotateY(world, time * obj.ySpeed, world);
        //m4.rotateZ(world, time * obj.zSpeed, world);
        m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
        m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);
   
   
   }
   

function drawPlano(time){
  

uniforms=objects[0].uniforms;
   drawObjects[0]={
        programInfo: programInfo,
        bufferInfo: shapes[0],
        uniforms: uniforms,
      };

        var obj=objects[0];

        var uni = obj.uniforms;
        var world = uni.u_world;
        m4.identity(world);
        //m4.rotateY(world, time * obj.ySpeed, world);
        //m4.rotateZ(world, time * obj.zSpeed, world);
        m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
      //  m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);
   
   
   }

   
function drawCubo(time){
  

uniforms=objects[2].uniforms;
   drawObjects[2]={
        programInfo: programInfo,
        bufferInfo: shapes[2],
        uniforms: uniforms,
      };

        var obj=objects[2];
        var uni = obj.uniforms;
        var world = uni.u_world;
        m4.identity(world);
        //m4.rotateY(world, time * obj.ySpeed, world);
        //m4.rotateZ(world, time * obj.zSpeed, world);
        m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
      //  m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);
   
   
   }

function drawFiguraPorIndice(time,i){
  

uniforms=objects[i].uniforms;
   drawObjects[i]={
        programInfo: programInfo,
        bufferInfo: shapes[i],
        uniforms: uniforms,
      };

        var obj=objects[i];
        var uni = obj.uniforms;
        var world = uni.u_world;
        m4.identity(world);
        
        //aplicar transformacion
        var transf = pendingTransformation[i];
        if(transf)
            m4.multiply(world, transf, world);

        //m4.rotateZ(world, time * obj.zSpeed, world);
        //console.log("aqui");
      //          console.log(i);
        //console.log(obj.translation);
        m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
        //m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);
   
   
   }

function trasladarFiguraEnX(i, x){
        obj=objects[i];
        obj.translation=[x,obj.translation[1],obj.translation[2]];
}

function aplicarTransformacion(i, mat){
    pendingTransformation[i] = m4.multiply(pendingTransformation[i] , mat );
}
function trasladarFiguraEnY(i, y){
        obj=objects[i];
        obj.translation=[obj.translation[0],y,obj.translation[2]];
}


function trasladarFiguraEnZ(i, z){
        obj=objects[i];
        obj.translation=[obj.translation[0],obj.translation[1],z];
}


var animacion=false;
function rotarsobrecilindro(){
 var delta=0.1;
 animacion=true; 
 var mat = m4.rotationY(delta);	
    window.setInterval(function () {
	if(animacion==true){
        aplicarTransformacion(2,mat);
		 aplicarTransformacion(3,mat);
		  aplicarTransformacion(4,mat);
			aplicarTransformacion(5,mat);
			}
    },100); // repeat forever, cada 100 
}

function deteneranimacion (){
animacion=false;

}
