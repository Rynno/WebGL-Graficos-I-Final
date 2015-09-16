<<<<<<< HEAD
/**
 * Proyecto Final de la materia Gráficos por Computadora I 
   Utilizando WebGl.
 * ESPOL - Primer término 2015.
 *	Grupo # 2 
	- Charlie Medina
	- Ronny Morán
 */
 
=======
>>>>>>> origin/master
var gl, m4, lightWorldPosition, lightColor, camera;
var viewProjection, shapes;;
var programInfo, baseHue, textura, objects = [], drawObjects = [];
var requestId;
var positions=[], pendingTransformation = [];
var delanteatras=-28, izquidere=0;
var izquidere=0;
var animacion=false;
var encendido;
var chess = "textura/chess.jpg";
var beach = "textura/beach.jpg";
var cubo = "textura/cubo1.jpg";
var moon = "textura/moon.gif";
var text11 = "textura/texturez_4496.jpg";
var pyramid = "textura/pyramid2.jpg";
var madera = "textura/madera.jpg";
var tigre = "textura/piel2.jpg";
var pelo = "textura/pelo.jpg";
var metal = "textura/metal.JPG";
var cesped = "textura/cesped.jpg";
var lampara = "textura/lampara.jpg";
<<<<<<< HEAD
var especular =1;
=======
>>>>>>> origin/master

window.addEventListener("load", inicializar, false);

function inicializar(){

    //Se crean los sliders
    $('#sliderX').slider();
    $('#sliderY').slider();
    $('#sliderZ').slider();

    $('#sliderX').on("slide", function(slideEvt) {
        var cambio = slideEvt.value - $('#sliderX').attr("data-last");
        $('#sliderX').attr("data-last", slideEvt.value);
        var mat = getOperacionX(-(cambio));
        setTransformacion(getFigura(),mat);
    });

    $('#sliderY').on("slide", function(slideEvt) {
        var cambio = slideEvt.value - $('#sliderY').attr("data-last");
        $('#sliderY').attr("data-last", slideEvt.value);
        var mat = getOperacionY(cambio);
        setTransformacion(getFigura(),mat);
    });

    $('#sliderZ').on("slide", function(slideEvt) {
        var cambio = slideEvt.value - $('#sliderZ').attr("data-last");
        $('#sliderZ').attr("data-last", slideEvt.value);
        var mat = getOperacionZ(-(cambio));
        setTransformacion(getFigura(),mat);
    });

    "use strict";
    twgl.setAttributePrefix("a_");
    m4 = twgl.m4;
    gl = twgl.getWebGLContext(document.getElementById("c"));
    programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
  

    gl.canvas.addEventListener("mousedown", function(event){
      console.log("click");
      var pixels = new Uint8Array(4);     
      var x = event.clientX;
      var y = event.clientY;
      console.log(x + ', ' + y);
      gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
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
    }, false);


    shapes = [
      twgl.primitives.createPlaneBufferInfo(gl, 18, 25, 10, 10), //width, height, subdivision
      twgl.primitives.createCylinderBufferInfo(gl, 0.5, 10, 24, 2),
      twgl.primitives.createCubeBufferInfo(gl,3),
      twgl.primitives.createSphereBufferInfo(gl, 2, 24, 32),
      twgl.primitives.createTorusBufferInfo(gl, 1.5, 0.5, 24, 12),
      twgl.primitives.createTruncatedConeBufferInfo(gl, 2, 0, 4, 4, 1),
      twgl.primitives.createTruncatedConeBufferInfo(gl, 0.4, 0, 0.8, 24, 1),
    ];

    lightWorldPosition = [1, 8, -10];
    lightColor = [1, 1, 1, 1];
<<<<<<< HEAD
	encendido = [1, 1, 1, 1];
=======
>>>>>>> origin/master
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
    positions[4]=[-3,1,-7];//toroide
    positions[5]=[-6,2,6];//piramide
    positions[6]=[1, 9, -10];//FOCO 


    //0=plano, 1=tubo, 2=cubo, 3=esfera, 4=toroide, 5=piramide
    setTexturaFigura(0);
    setTexturaFigura(1);
    setTexturaFigura(2);
    setTexturaFigura(3);
    setTexturaFigura(4);
    setTexturaFigura(5);
    setTexturaFigura(6);
    requestAnimationFrame(render);

    var deltas=-0.12;
  
    var matd = m4.rotationZ(deltas);    
    setTransformacion(6,matd);
    
    var matX = m4.rotationX(deltas);  
    setTransformacion(6,matX);
}

function getOperacionX(value){
    op=$('select[name="operation"]').val()
    switch(op){
        case "trasladar":
          return m4.translation([value, 0, 0]);
          break;
        case "rotar":
          return m4.rotationX(value);
          break;
        case "escalar":
          return m4.scaling([value,1,1]);
          break;
    };
    return figura;
}

function getOperacionY(value){
    op=$('select[name="operation"]').val()
    switch(op){
        case "trasladar":
          return m4.translation([0, value, 0]);
          break;
        case "rotar":
          return m4.rotationY(value);
          break;
        case "escalar":
          return m4.scaling([1,value,1]);
          break;
    };
    return figura;
}

function getOperacionZ(value){
    op=$('select[name="operation"]').val()
    switch(op){
        case "trasladar":
          return m4.translation([0, 0, value]);
          break;
        case "rotar":
          return m4.rotationZ(value);
          break;
        case "escalar":
          return m4.scaling([1,1,value]);
          break;
    };
    return figura;
}
    
function setTransformacion(i, mat){
    pendingTransformation[i] = m4.multiply(pendingTransformation[i] , mat );
}

function getFigura(){
    figura=$('select[name="figura"]').val()
    return figura;
}

function getFiguraTextura(){
    figura=$('select[name="figura_text"]').val()
    return figura;
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

<<<<<<< HEAD

//Estableciendo textura del objeto segun el indice
function setTexturaFigura(i){

  initial_position=positions[i];

  if (i==0){//plano
=======
function setTexturaFigura(i){

  initial_position=positions[i];//esfera

  if (i==0){
>>>>>>> origin/master
    textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: chess,
    });  
<<<<<<< HEAD
  } else if (i==1) {//cilindro
=======
  } else if (i==1) {
>>>>>>> origin/master
    textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: beach,
    }); 
<<<<<<< HEAD
  } else if (i==2) {//cubo
=======
  } else if (i==2) {
>>>>>>> origin/master
    textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: cubo,
    }); 
<<<<<<< HEAD
  } else if (i==3) {//esfera
=======
  } else if (i==3) {
>>>>>>> origin/master
    textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: moon,
    }); 
<<<<<<< HEAD
  } else if (i==4) {//toroide
=======
  } else if (i==4) {
>>>>>>> origin/master
    textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: text11,
    }); 
  }
<<<<<<< HEAD
  else if (i==5) {//piramide
=======
  else if (i==5) {
>>>>>>> origin/master
    textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: pyramid,
    }); 
  }
<<<<<<< HEAD
  else if (i==6) {//lampara
=======
  else if (i==6) {
>>>>>>> origin/master
    textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: lampara,
    }); 
  }
  
  var uniforms = {
    u_lightWorldPos: lightWorldPosition,
    u_lightColor: lightColor,
    u_diffuseMult: [1,1,1,1],
    u_specular: [1, 1, 1, 1],
    u_shininess: 50,
<<<<<<< HEAD
    u_specularFactor: especular,
=======
    u_specularFactor: 1,
>>>>>>> origin/master
    u_diffuse: textura,
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

function render(time) {
  gl.canvas.width = window.innerWidth/1.5;
  gl.canvas.height = window.innerHeight/1.5;

  time *= 0.001;
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.5, 100);
<<<<<<< HEAD
  //delante atras
=======
  //,,delante atras
>>>>>>> origin/master
  var eye = [];
	  eye[0] = -1;
	  eye[1] = 4;
	  eye[2] = delanteatras;

  var target = [izquidere, 4, 0];
  var up = [0, 1, 0];

  m4.lookAt(eye, target, up, camera);
  m4.inverse(camera, view);
  m4.multiply(view, projection, viewProjection);
  drawFigure(time, 0);
  drawFigure(time, 1);
  drawFigure(time, 2);
  drawFigure(time, 3);
  drawFigure(time, 4);
  drawFigure(time, 5);
  drawFigure(time, 6);
  twgl.drawObjectList(gl, drawObjects);

  requestId= requestAnimationFrame(render);
}

function drawFigure(time,i){
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

    var transf = pendingTransformation[i];
    if(transf) m4.multiply(world, transf, world);
    m4.translate(world, obj.translation, world);
    m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);
}

function hacerVisible(elemento) {
    var i;
    var seccion;
    var seccionVisible;

    secciones = document.getElementsByTagName("section");
    seccionVisible = document.getElementById(elemento.getAttribute("data-seccion"));

    for (i = 0; i < secciones.length; i++) {
        seccion = secciones[i];
        if (seccion != seccionVisible) {
                seccion.setAttribute("class", "ocultar");
        } else {
            seccion.setAttribute("class", "mostrar");
        }
    }
}

<<<<<<< HEAD
//habilita o deshabilita la animacion de rotación 
function animated(element){
  if(element.checked){
    starAnimacion();    

  } else {
    stopAnimacion();

  } 
}


//función de animación - rotar objetos sobre cilindro
=======
function animate(element){
  if(element.checked){
    starAnimacion();    
  } else {
    stopAnimacion();
  } 
}

>>>>>>> origin/master
function starAnimacion(){
    var delta=0.01;
    animacion=true; 
    var mat = m4.rotationY(delta);  
    window.setInterval(function () {
        if(animacion==true){
            setTransformacion(2,mat);
            setTransformacion(3,mat);
            setTransformacion(4,mat);
            setTransformacion(5,mat);
        }
<<<<<<< HEAD
    },30); // repeat forever, cada 100 
=======
    },100); // repeat forever, cada 100 
>>>>>>> origin/master
}

function stopAnimacion (){
    animacion=false;
}

var ind;
<<<<<<< HEAD
//Cambiando la textura seleccionada
=======
>>>>>>> origin/master
function cambiartextura(indicefigura) {

  if(indicefigura==1){ 		
	ind = getFiguraTextura();	
	if (ind==2){
		cubo= beach;	
	}if (ind==3){
		moon= beach;	
	}if (ind==4){
		text11= beach;	
	}if (ind==5){
		pyramid= beach;	
	}    
    
  }  
  
  if(indicefigura==2){	
	ind = getFiguraTextura();	
	if (ind==2){
		cubo= madera;	
	}if (ind==3){
		moon= madera;	
	}if (ind==4){
		text11= madera;	
	}if (ind==5){
		pyramid= madera;	
	}    
    
  }
  if(indicefigura==3){ 
	ind = getFiguraTextura();	
	if (ind==2){
		cubo= moon;	
	}if (ind==3){
		moon= moon;	
	}if (ind==4){
		text11= moon;	
	}if (ind==5){
		pyramid= moon;	
	}    
    
  }
  if(indicefigura==4){ 	
	ind = getFiguraTextura();	
	if (ind==2){
		cubo= text11;	
	}if (ind==3){
		moon= text11;	
	}if (ind==4){
		text11= text11;	
	}if (ind==5){
		pyramid= text11;	
	}    
    
  } 
  if(indicefigura==5){ 	
	ind = getFiguraTextura();	
	if (ind==2){
		cubo= tigre;	
	}if (ind==3){
		moon= tigre;	
	}if (ind==4){
		text11= tigre;	
	}if (ind==5){
		pyramid= tigre;	
	}    
    
  }
  if(indicefigura==6){ 	
	ind = getFiguraTextura();	
	if (ind==2){
		cubo= cesped;	
	}if (ind==3){
		moon= cesped;	
	}if (ind==4){
		text11= cesped;	
	}if (ind==5){
		pyramid= cesped;	
	}    
    
  }
  if(indicefigura==7){ 	
	ind = getFiguraTextura();	
	if (ind==2){
		cubo= metal;	
	}if (ind==3){
		moon= metal;	
	}if (ind==4){
		text11= metal;	
	}if (ind==5){
		pyramid= metal;	
	}    
    
  }
  if(indicefigura==8){ 	
	ind = getFiguraTextura();	
	if (ind==2){
		cubo= pelo;	
	}if (ind==3){
		moon= pelo;	
	}if (ind==4){
		text11= pelo;	
	}if (ind==5){
		pyramid= pelo;	
	}    
    
  }
   setTexturaFigura(ind);  
   $(".modal-box, .modal-overlay").fadeOut(500, function() {
			$(".modal-overlay").remove();
		});
	beach = "textura/beach.jpg";
	cubo = "textura/cubo1.jpg";
	moon = "textura/moon.gif";
	text11 = "textura/texturez_4496.jpg";
	pyramid = "textura/pyramid2.jpg";
	madera = "textura/madera.jpg";
	tigre = "textura/piel2.jpg";
	pelo = "textura/pelo.jpg";
	metal = "textura/metal.JPG";
	cesped = "textura/cesped.jpg";
}



<<<<<<< HEAD


//Funcion para apagar la luz
function apagar(){

var is_same = lightColor.length == encendido.length && lightColor.every(function(element, index) {
    return element === encendido[index]; 
});
	if(is_same){	
	lightColor = [0.3, 0.3, 0.3, 1];
	especular=0;
		setTexturaFigura(0);
		setTexturaFigura(1);
		setTexturaFigura(2);
		setTexturaFigura(3);
		setTexturaFigura(4);
		setTexturaFigura(5); 
	}
	else{
	especular=1;
	lightColor=[1, 1, 1, 1];	
		setTexturaFigura(0);
		setTexturaFigura(1);
		setTexturaFigura(2);
		setTexturaFigura(3);
		setTexturaFigura(4);
		setTexturaFigura(5);
	}
}


// crearSolido(gl, 255,0,0,255);
function crearSolido(gl, r, g, b, a) {
    var data = new Uint8Array([r, g, b, a]);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    return texture;
}


function solido(){
setSolidosFigura(1);
setSolidosFigura(2);
setSolidosFigura(3);
setSolidosFigura(4);
setSolidosFigura(5);

}


function setSolidosFigura(i){

  initial_position=positions[i];

  if (i==0){//plano
    textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: chess,
    });  
  } else if (i==1) {//cilindro
    textura = crearSolido(gl, 0,255,255,255);
  } else if (i==2) {//cubo
    textura = crearSolido(gl, 255,0,0,255);
  } else if (i==3) {//esfera
    textura = crearSolido(gl, 0,255,0,255);
  } else if (i==4) {//toroide
    textura = crearSolido(gl, 0,0,255,255);
  }
  else if (i==5) {//piramide
    textura = crearSolido(gl, 255,255,0,255);
  }
  else if (i==6) {//lampara
    textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: lampara,
    }); 
  }
  
  var uniforms = {
    u_lightWorldPos: lightWorldPosition,
    u_lightColor: lightColor,
    u_diffuseMult: [1,1,1,1],
    u_specular: [1, 1, 1, 1],
    u_shininess: 50,
    u_specularFactor: especular,
    u_diffuse: textura,
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

=======
function apagar(){

if(lightColor==encendido){

alert("apagando "+lightColor);
alert(encendido);

lightColor = [0, 0, 0, 1];
}
else{
lightColor=[1, 1, 1, 1];

alert("encendido "+lightColor);
alert(encendido);
}



}
>>>>>>> origin/master
