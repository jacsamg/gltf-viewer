import { $ } from './helpers';

export function loadModel(callback) {
  const model = $('#model');

  model.addEventListener('change', () => {
    const fileSrc = model['files'][0],
      reader = new FileReader();

    reader.onloadstart = () => {
      console.log('start');
    };

    reader.onerror = () => {
      console.log('error');
    };

    reader.onload = e => {
      console.log(e);
      const render = $('#render');
      render.removeChild(render.childNodes[0]);
      callback(e.srcElement.result);
    };

    reader.readAsDataURL(fileSrc);
  });
}
