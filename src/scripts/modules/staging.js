import * as T from 'three';
import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader';

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

    this.scene = new T.Scene();
    this.camera = new T.PerspectiveCamera(
      this.opts.camera.fov,
      this.opts.camera.aspect,
      this.opts.camera.near,
      this.opts.camera.far
    );
    this.camera.position.z = this.opts.camera.position.z;
    this.renderer = new T.WebGLRenderer({ alpha: true });
    this.model;
    this.domElement = document.getElementById(this.opts.dom.main);
    this.onInit();
  }

  onInit() {
    this.renderer.setSize(
      this.domElement.offsetWidth,
      this.domElement.offsetWidth
    );
    this.renderer.setClearColor(0xffffff, 0);
    this.domElement.appendChild(this.renderer.domElement);
  }

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

    const light = new T.PointLight(
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
        model || 'https://storage.googleapis.com/models-glb-for-test/out2.glb',
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
