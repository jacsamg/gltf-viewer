import { Staging } from './modules/staging';
import { loadModel } from './modules/upload_model';

function main(model) {
  const staging = new Staging({
    camera: {
      fov: 75,
      aspect: 1,
      near: 0.1,
      fear: 1000,
      position: { z: 30 }
    },
    dom: { main: 'render' }
  });

  staging
    .addModel(model)
    .then(() => {
      const light = staging.addSimpleLight({
        intencity: 3,
        decay: 2,
        z: 100
      });

      function animate() {
        requestAnimationFrame(animate);

        staging.model.scene.rotation.y -= 0.01;
        staging.renderer.render(staging.scene, staging.camera);
      }

      animate();
    })
    .catch(error => {
      console.log('An error happened', error);
    });
}

main();
loadModel(main);
