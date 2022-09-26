
gun = Gun(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);
copy = gun.get('test').get('paste');
paste.oninput = () => { copy.put(paste.value) };
copy.on((data) => { paste.value = data });

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 0, 10);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

function mousePressed(e){
  console.log("clicked")
}


var canvas = document.createElement("canvas");
canvas.addEventListener("click", mousePressed, false);
var map = new THREE.CanvasTexture(canvas);
canvas.width = 512;
canvas.height = 512;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawRectangle(index, width, height, color) {
  let x = index%11;
  let y = Math.trunc(index/11);
  let xUnit = canvas.width / 10;
  let yUnit = canvas.height / 10;

  let x_ = x * xUnit;
  let y_ = y * yUnit;
  let w_ = width * xUnit;
  let h_ = height * yUnit;

  ctx.fillStyle = color;
  ctx.fillRect(x_, y_, w_, h_);
  map.needsUpdate = true;
}
for (let index = 0; index < 121; index++) {

  if(index%2===0){
    drawRectangle(index, 1, 1, "white");
  }
  else{
    drawRectangle(index, 1, 1, "gray");

  }
}


var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(11, 11), new THREE.MeshBasicMaterial({
  color: "white",
  map: map
}));
scene.add(plane);

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});

