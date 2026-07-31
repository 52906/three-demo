import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 1. 创建场景
const scene = new THREE.Scene();
// 设置背景色为浅灰色
scene.background = new THREE.Color(0xaaaaaa);

// 2. 创建透视相机
// 参数: 视场角(FOV), 宽高比, 近裁切面, 远裁切面
const camera = new THREE.PerspectiveCamera(
    75, // 视角
    window.innerWidth / window.innerHeight, // 宽高比
    0.1, // 近裁切面
    1000 // 远裁切面
);
// 将相机向后移动5个单位，以便看到位于原点的物体
camera.position.z = 5;

// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 设置渲染尺寸为窗口大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将渲染器的canvas元素添加到页面中
document.body.appendChild(renderer.domElement);

// 添加坐标系辅助线
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 20;
controls.update();

// 第二部分
// 1. 创建一个立方体几何体 (宽, 高, 深度)
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 2. 创建一个基础材质，并设置颜色为红色
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// 3. 将几何体和材质组合成网格物体
const cube = new THREE.Mesh(geometry, material);

// 4. 将立方体添加到场景中
scene.add(cube);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

animate();
