if(document.querySelector('#box')) {


var mark_con = [];
var img_src =window.runjianURL('assets/4a587a0d1fd2ad73.png');
$(".city div").each(function(){

    var name=$(this).attr("data-name");

    var j=Number($(this).attr("data-j"));
    var w=Number($(this).attr("data-w"));

    var des=$(this).attr('data-des');
    var img=$(this).attr('data-img');


    mark_con.push({
        'pos': [j,w],
        'imgSrc': img_src,
        'textEdit': '<h3 class=fnt_18 data-des="'+des+'" data-img="'+img+'">'+name+'</h3>',
      'name':name
    })

})

function IsPC() { 
   var userAgentInfo = navigator.userAgent; 
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
   var flag = true; 
   for (var v = 0; v < Agents.length; v++) { 
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
   } 
   return flag; 
} 


var markingPos = {
    "marking": mark_con
}

const labelParentElem = document.querySelector('#box_text');
var camera,container,scene,loader,renderer,ocontrols;
let options = {
    radius: 120, // 地球的半径
    segments: 100,
};

let mesh;
let earth = new THREE.Group();

let canvas;

const tempV = new THREE.Vector3();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var ball;
var marking = new THREE.Group();


if(document.querySelector('#box')) { init(); render(); }

function getPosition(longitude, latitude, radius) {
    var lg = THREE.Math.degToRad(longitude);
    var lt = THREE.Math.degToRad(latitude);
    var temp = radius * Math.cos(lt);
    var x = temp * Math.sin(lg);
    var y = radius * Math.sin(lt);
    var z = temp * Math.cos(lg);
    return {
        x: x,
        y: y,
        z: z
    }
}

function init(){
    container = document.querySelector('#box');
    scene = new THREE.Scene();

    loader = new THREE.TextureLoader();

    camera = new THREE.PerspectiveCamera(45,container.clientWidth/container.clientHeight,1,100000);
    camera.position.x = -100;
    camera.position.y = 100;
    camera.position.z = -300;




    scene.add(camera)

    renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true});
    renderer.setSize(container.clientWidth,container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.physicallyCorrectLights = true;
    renderer.setClearColor(0xffffff,0);
    canvas = renderer.domElement
    container.append(renderer.domElement);


    ocontrols = new THREE.OrbitControls(camera,renderer.domElement);
    ocontrols.minDistance = 200;
    ocontrols.maxDistance = 400;
    ocontrols.autoRotate= false;
    ocontrols.autoRotateSpeed = 0.5;
    ocontrols.enableZoom = false;

// 添加事件监听器，监听 OrbitControls 的变化
ocontrols.addEventListener('change', () => {
    // 隐藏 div 元素
    labelParentElem.style.display = 'none';
});

    initGlobe()
    dian();

}
function initGlobe() {
    // 地球
    var geo = new THREE.SphereGeometry(options.radius, options.segments, options.segments);
    var texture = new THREE.TextureLoader().load(window.runjianURL('assets/5294e60315564df2.webp'),function(){
        renderer.render(scene, camera);
    });
    texture.minFilter = THREE.LinearFilter;
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
    });
    mesh = new THREE.Mesh(geo, material);
    // mesh.rotation.y = THREE.MathUtils.degToRad(170);
    // mesh.rotation.x = THREE.MathUtils.degToRad(35);
    earth.add(mesh)
}



function dian(){



    markingPos.marking.forEach(function (markingItem) {

        const map = new THREE.TextureLoader().load( markingItem.imgSrc );
        var geometry = new THREE.PlaneBufferGeometry(4, 4);
        var material = new THREE.MeshBasicMaterial({
            map: map,
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite:true,
            color:0xffffff,
        });

        ball = new THREE.Mesh(geometry, material);
      

        var coord = getPosition(markingItem.pos[0] + 90, markingItem.pos[1], options.radius);
        var coordVec3 = new THREE.Vector3(coord.x, coord.y, coord.z).normalize();
        var meshNormal = new THREE.Vector3(0, 0, 1);

        markingItem.position = coord;

        ball.name=markingItem.name;
        ball.edit_tit = markingItem.textEdit;

        ball.position.set(coord.x, coord.y, coord.z);
        ball.quaternion.setFromUnitVectors(meshNormal, coordVec3);

        marking.add(ball);


    })


    earth.add(marking)
    scene.add(earth);


}




function onMouseMove( event ) {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    mouse.x = ( event.clientX / container.clientWidth ) * 2 - 1;
    mouse.y = - ( (event.clientY-container.getBoundingClientRect().top) / (container.clientHeight) ) * 2 + 1;

}
// 触摸移动事件处理函数
function onTouchStart(event) {
  
  if (event.touches.length > 0) {
    var touch = event.touches[0];
    mouse.x = (touch.clientX / container.clientWidth) * 2 - 1;
    mouse.y = -((touch.clientY - container.getBoundingClientRect().top) / container.clientHeight) * 2 + 1;
    render();
  }
}

function onTouchMove(event) {
  INTERSECTED = null;
}

function onTouchEnd(event) {
  INTERSECTED = null;
}


function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
var INTERSECTED = null;
var renderRequested=false;
function render() {
    raycaster.setFromCamera( mouse, camera);
    var childArray = []
    scene.children[1].children.forEach( function(child){
        if(child.type == 'Group'){
            childArray = child.children
        }
    })
    //console.log(childArray)
// 定义默认的交互对象
let defaultIntersected = scene.getObjectByName('印度尼西亚'); // 替换为你的默认对象的名称

    const intersects = raycaster.intersectObjects( childArray );

    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[ 0 ].object ) {
            if ( INTERSECTED ) labelParentElem.style.display='none';
            INTERSECTED = intersects[ 0 ].object;

            tempV.copy(INTERSECTED.position);
            tempV.project(camera);
          
            const x = (tempV.x *  .5 + .5) * canvas.clientWidth;
            const y = (tempV.y * -.5 + .5) * canvas.clientHeight;

            labelParentElem.getElementsByTagName("div")[0].innerHTML =INTERSECTED.edit_tit;
            labelParentElem.style.display='block'
            labelParentElem.style.transform = `translate(${x+20}px,${y-45}px)`;
            ocontrols.autoRotate= false;
        }
    }else{
   
        // 如果没有检测到交互对象，保持当前激活的对象
    if (!INTERSECTED) {
        // 如果从未有过激活对象，则使用默认对象
      if($(window).width()>768){
        INTERSECTED = defaultIntersected;
      }

        if (INTERSECTED) {
            tempV.copy(INTERSECTED.position);
            tempV.project(camera);

            const x = (tempV.x * .5 + .5) * canvas.clientWidth;
            const y = (tempV.y * -.5 + .5) * canvas.clientHeight;

            labelParentElem.getElementsByTagName("div")[0].innerHTML = INTERSECTED.edit_tit;
            labelParentElem.style.display = 'block';
            labelParentElem.style.transform = `translate(${x + 20}px, ${y - 45}px)`;
            ocontrols.autoRotate = false;
        }
    }
    }



    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

  //  ocontrols.update()
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function requestRenderIfNotRequested(){
    if (!renderRequested) {
        renderRequested = true;
    }
}


ocontrols.addEventListener('change', requestRenderIfNotRequested);
window.addEventListener('resize', requestRenderIfNotRequested);
window.addEventListener( 'mousemove', onMouseMove, false );

window.addEventListener('touchstart', onTouchStart, false);
window.addEventListener('touchmove', onTouchMove, false);
window.addEventListener('touchend', onTouchEnd, false);


}
