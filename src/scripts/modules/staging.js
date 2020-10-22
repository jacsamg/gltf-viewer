import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls';

export class Staging {
  constructor(options) {
    this.opts = {
      camera: {
        fov: options.camera.fov,
        aspect: options.camera.aspect,
        near: options.camera.near,
        far: options.camera.far,
        position: {
          x: options.camera.position.x,
          y: options.camera.position.y,
          z: options.camera.position.z
        }
      },
      dom: {
        main: options.dom.main
      }
    };

    // Definitions
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.opts.camera.fov,
      this.opts.camera.aspect,
      this.opts.camera.near,
      this.opts.camera.far
    );
    this.camera.position.z = this.opts.camera.position.z;
    this.controls = new OrbitControls(this.camera);
    this.model;

    // Render
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.domElement = document.getElementById(this.opts.dom.main);
    this.renderer.setSize(
      this.domElement.offsetWidth,
      this.domElement.offsetWidth
    );
    this.renderer.setClearColor(0xffffff, 0);
    this.domElement.appendChild(this.renderer.domElement);
  }

  onInit() {}

  addSimpleLight(options) {
    const opts = {
      color: options.color || 0xffffff,
      intencity: options.intencity || 1,
      distance: options.distance || 0,
      decay: options.decay || 1,
      x: options.x || 25,
      y: options.y || 25,
      z: options.z || 100
    };

    const light = new THREE.PointLight(
      opts.color,
      opts.intencity,
      opts.distance,
      opts.decay
    );

    light.position.set(opts.x, opts.y, opts.z);
    this.scene.add(light);

    return light;
  }

  addModel(model) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();

      loader.load(
        model ||
          'https://storage.googleapis.com/models-glb-for-test/out2-1.glb',
        onLoad.bind(this),
        onLoading.bind(this),
        onError.bind(this)
      );

      function onLoad(gltf) {
        this.model = gltf;
        this.scene.add(this.model.scene);
        resolve();
      }

      function onLoading(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      }

      function onError(error) {
        reject(error);
      }
    });
  }
}
