window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  const imageContainer = document.querySelector('.image-container');
  const downloadError = document.querySelector('.download-error');
  const dividerMinX = 0;
  const dividerMaxX = 407;
  const urlImageBW = 'https://sites-cf.mhcache.com/e/1/az1zaXRlc192MSZzPTZlNzA5ZTA2Y2FmYjA0YTE3ZGZhYjYxYzZlYzBmYzQ0NjEyMDdjNzVlOTY4MTgyNGE2YTA3NmY0ZDMzMTZmYTEmZT0xNjg1NzE4MDAw/122/173/8202/500013_9387431j1x531w460100g1_A.jpg';
  const urlImageColor = 'https://sites-cf.mhcache.com/t/738/202/1221738202/500/500013_749062o406111cau6c32v0_A_1024x1536/filters:watermark(/watermarks/logo.png,-2p,-2p,0,0,5):watermark(/watermarks/palette.png,2p,-2p,5,0,5)/xuTjNZntCr2-JGE_6tio_ngljJ0=/.jpg';

  loader.style.display = 'flex';
  imageContainer.style.display = 'none';
  downloadError.style.display = 'none';

  // Функция для загрузки и добавления картинок к элементам <img>
  async function addImagesToElements() {
    try {
      // Получение ссылок на элементы <img> из HTML-кода
      const imageBW = document.getElementById('black-and-white');
      const imageColor = document.getElementById('color');

      // Ожидание загрузки обеих картинок
      const [responseBW, responseColor] = await Promise.all([
        fetch(urlImageBW),
        fetch(urlImageColor),
        new Promise((p) => {setTimeout(() => {p()}, 1500)})
      ]);

       // Установка src свойств элементов <img> с использованием полученных URL
      const blobImageBW = await responseBW.blob();
      const blobImageColor = await responseColor.blob();
      imageBW.src = URL.createObjectURL(blobImageBW);
      imageColor.src = URL.createObjectURL(blobImageColor);

      console.log('Обе картинки успешно загружены и добавлены к элементам <img>');

    } catch (error) {
            console.error('Ошибка загрузки или добавления картинок:', error);
            downloadError.style.display = 'flex';
    } finally {
      loader.style.display = 'none';
      imageContainer.style.display = 'flex';
    }
  }

  addImagesToElements();

  // Обработчик для изменения полосы-разделителя
    let divider = document.getElementById('divider');
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    divider.addEventListener('mousedown', function(e) {
      isResizing = true;
      startX = e.clientX;
      startWidth = parseInt(document.defaultView.getComputedStyle(color).width, 10);
    });

  window.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    let newWidth = startWidth + e.clientX - startX;
    color.style.width = newWidth + 'px';
    let dividerPosition = startWidth + e.clientX - startX;

    // Ограничение движения разделителя внутри контейнера
    if (dividerPosition < dividerMinX) {
      dividerPosition = dividerMinX;
    }
    if (dividerPosition > dividerMaxX) {
     dividerPosition = dividerMaxX;
    }
    divider.style.left = dividerPosition + 'px';
  });

  window.addEventListener('mouseup', function() {
    isResizing = false;
  });
});