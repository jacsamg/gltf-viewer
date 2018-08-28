import * as T from 'three';
import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader';

// ===================
// Init
// ===================

let wWidth = window.innerWidth,
  wHeight = window.innerHeight,
  scene = new T.Scene(),
  camera = new T.PerspectiveCamera(75, wWidth / wHeight, 0.1, 1000),
  renderer = new T.WebGLRenderer();

// Configs
camera.position.z = 30;
renderer.setSize(wWidth, wHeight);
document.body.appendChild(renderer.domElement);

// ===================
// TESTS
// ===================

function simpleLight(options = {}) {
  const opt = {
    color: options.color || 0xffffff,
    intencity: options.intencity || 1,
    distance: options.distance || 0,
    decay: options.decay || 1,
    x: options.x || 25,
    y: options.y || 25,
    z: options.z || 100
  };

  const light = new T.PointLight(
    opt.color,
    opt.intencity,
    opt.distance,
    opt.decay
  );

  light.position.set(opt.x, opt.y, opt.z);
  scene.add(light);

  return light;
}

function loadModel() {
  const loader = new GLTFLoader();

  loader.load(
    'https://storage.googleapis.com/models-glb-for-test/out2.glb',
    function(gltf) {
      // onLoad

      const light = simpleLight({
        intencity: 3,
        decay: 2,
        z: 100
      });

      scene.add(gltf.scene);
    },
    function(xhr) {
      // onLoading
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function(error) {
      // onErrors
      console.log('An error happened', error);
    }
  );
}

// ===================
// Init elements
// ===================

let model = loadModel();
console.log('model', model);

// ===================
// Render
// ===================

function animate() {
  requestAnimationFrame(animate);

  // Animate here...

  // Add to render
  renderer.render(scene, camera);
}

animate();
