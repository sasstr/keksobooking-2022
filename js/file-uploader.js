const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__input');
const photoPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      let photo = photoPreview.querySelector('img');

      if (!photo) {
        photo = document.createElement('img');
        photo.width = '70';
        photo.height = '70';
        photo.src = reader.result;
        photoPreview.append(photo);
      } else {
        photo.src = reader.result;
      }
    });

    reader.readAsDataURL(file);
  }
});

/**
 *  Функция возвращает картинки на сайте в начальное состояние.
 * @returns {void}
 */
const clearImages = () => {
  avatarPreview.src = 'img/muffin-grey.svg';

  if (photoPreview.querySelector('img')) {
    photoPreview.querySelector('img').remove();
  }
}

export { clearImages };
