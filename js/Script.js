var gl, m4, lightWorldPosition, lightColor, camera;
var viewProjection, shapes;
var programInfo, baseHue, textura, objects = [], drawObjects = [];
var requestId;
var positions=[], pendingTransformation = [];
var delanteatras=-28, izquidere=0;
var color = new Uint8Array(4);
var animacion=false;

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
      twgl.primitives.createCylinderBufferInfo(gl, 0.5, 9, 24, 2),
      twgl.primitives.createCubeBufferInfo(gl,3),
      twgl.primitives.createSphereBufferInfo(gl, 2, 24, 32),
      twgl.primitives.createTorusBufferInfo(gl, 1.5, 0.5, 24, 12),
      twgl.primitives.createTruncatedConeBufferInfo(gl, 2, 0, 4, 4, 1),
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
    positions[4]=[-3,1,-7];//toroide
    positions[5]=[-6,2,6];//piramide


    //0=plano, 1=tubo, 2=cubo, 3=esfera, 4=toroide, 5=piramide
    setTexturaFigura(0);
    setTexturaFigura(1);
    setTexturaFigura(2);
    setTexturaFigura(3);
    setTexturaFigura(4);
    setTexturaFigura(5);
    requestAnimationFrame(render);
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

function rand(min, max) {
    return min + Math.random() * (max - min);
}

function setTexturaFigura(i){

  initial_position=positions[i];

  if (i==0){
      textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/chess.jpg",
    });  
  } else if (i==1) {
      textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/beach.jpg",
    }); 
  } else if (i==2) {
      textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/cubo1.jpg",
    }); 
  } else if (i==3) {
      textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/moon.gif",
    }); 
  } else if (i==4) {
      textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/texturez_4496.jpg",
    }); 
  }
  else if (i==5) {
      textura = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/pyramid1.jpg",
    }); 
  }
  
  var uniforms = {
    u_lightWorldPos: lightWorldPosition,
    u_lightColor: lightColor,
    u_diffuseMult: [1,1,1,1],
    u_specular: [1, 1, 1, 1],
    u_shininess: 50,
    u_specularFactor: 1,
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
    drawFigure(time, 0);
    drawFigure(time, 1);
    drawFigure(time, 2);
    drawFigure(time, 3);
    drawFigure(time, 4);
    drawFigure(time, 5);
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

function animate(element){
  if(element.checked){
    starAnimacion();    
  } else {
    stopAnimacion();
  } 
}

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
    },100); // repeat forever, cada 100 
}

function stopAnimacion (){
    animacion=false;
}
