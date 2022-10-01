
gun = Gun(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);

var colorArray=generateDefaultCells();
copy = gun.get('test').get('colorArray');
head.oninput = () => { 
  colorArray[selectionIndex]=head.value;
  copy.put(colorArray.toString()) 

};
copy.on((data) => {
  colorArray = data.split(",")
});

var scene = new THREE.Scene();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
var pos = {x:0,y:0,z:0}
var selectionIndex = 0;
camera.position.set(0, 0, 10);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);




var canvas = document.createElement("canvas");
var map = new THREE.CanvasTexture(canvas);
canvas.width = 512;
canvas.height = 512;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawRectangle(index, width, height, r, g, b, a) {
  let x = index%11;
  let y = Math.trunc(index/11);
  let xUnit = canvas.width / 10;
  let yUnit = canvas.height / 10;

  let x_ = x * xUnit;
  let y_ = y * yUnit;
  let w_ = width * xUnit;
  let h_ = height * yUnit;
  gr = ctx.createLinearGradient(0, 0, 300, 0);
  // draw something with alpha channel to main canvas
  gr.addColorStop(0, `rgba(${r},${g},${b},${a})`);
  // gr.addColorStop(1, "rgba(255,0,0,0)");
  ctx.fillStyle = gr;
  ctx.fillRect(x_, y_, w_, h_);
  map.needsUpdate = true;
}


var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(11, 11), new THREE.MeshBasicMaterial({
  color: "white",
  map: map
}));
raycaster.setFromCamera(mouse, camera);


scene.add(plane);

document.addEventListener(
  "click",
  event => {
  console.log("ggggggggggggg")
  head.focus();
  head.value = "#FFCC00"; //Set the default color  NOTE: Remove the line to get the default of #000000
  head.click();
  },
  false
);

document.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
  selectionIndex=findIndex(pos.x,pos.y)
});




renderer.setAnimationLoop(() => {

  colorArray.forEach((item,key)=>{
    // console.log("ddddddddd ",key,item);
    evenhex = hexToRGB(item, 0.5);
    drawRectangle(key, 1, 1, evenhex.r,evenhex.g,evenhex.b,evenhex.a);
  });

  drawRectangle(selectionIndex, 1, 1, 50,30,79,0.5);

  renderer.render(scene, camera);
});

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

 
  return {r:r,g:g,b:b,a:alpha}
}

function findIndex(x, y) {
  x = x<=5.495? x:5.495;
  x = x>=-5.495? x:-5.495;
  let x_ = x + 5.495;
  let y_ = -(y -4.049);
  let index = (Math.trunc(y_)*11)+Math.trunc(x_);
  console.log("find index",Math.trunc(x_),Math.trunc(y_),x,index)

  return index;
}

function generateDefaultCells(){
  let result = []
  for (let index = 0; index < 121; index++) {
    
    if(index%2===0){
      result.push("#414142");
    }
    else{
      result.push("#b9b9bd");
  
    }
  }
  return result;
}





