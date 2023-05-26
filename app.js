window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  const imageContainer = document.querySelector('.image-container');
  const dividerMinX = 0;
  const dividerMaxX = 407;
  // const urlImageBW = 'https://sites-cf.mhcache.com/e/1/az1zaXRlc192MSZzPWMzYzU1ZDM4MmYyMzY0NjY5MWE3MGRlNzZhNTEzNTg0MjIxNGMxMDAzNTc3MjQxN2NhZDdlY2RjZTQ5MmFmNjcmZT0xNjg0ODQ2ODAw/122/173/8202/500013_9387431j1x531w460100g1_A.jpg';
  // пока недоступна ЧБ, обе ссылки на цветную картинку
  const urlImageBW = 'https://sites-cf.mhcache.com/t/738/202/1221738202/500/500013_749062o406111cau6c32v0_A_1024x1536/filters:watermark(/watermarks/logo.png,-2p,-2p,0,0,5):watermark(/watermarks/palette.png,2p,-2p,5,0,5)/xuTjNZntCr2-JGE_6tio_ngljJ0=/.jpg';
  const urlImageColor = 'https://sites-cf.mhcache.com/t/738/202/1221738202/500/500013_749062o406111cau6c32v0_A_1024x1536/filters:watermark(/watermarks/logo.png,-2p,-2p,0,0,5):watermark(/watermarks/palette.png,2p,-2p,5,0,5)/xuTjNZntCr2-JGE_6tio_ngljJ0=/.jpg';
  loader.style.display = 'flex';
  imageContainer.style.display = 'none';

  // Загрузка изображений

  // Функция для загрузки картинки по URL и получения данных в формате Blob
  // async function fetchImage(url) {
  //   const response = fetch(url);
  //   const blob = await response.blob();
  //   return blob;
  // }

  // // Функция для проверки успешной загрузки картинки
  // function checkImageLoaded(imageElement) {
  //   return new Promise((resolve, reject) => {
  //     imageElement.onload = resolve;
  //     imageElement.onerror = reject;
  //   });
  // }

  // Функция для загрузки и добавления картинок к элементам <img>
  async function addImagesToElements() {
    try {
      const responseBW = fetch(urlImageBW);
      const blobImageBW = responseBW.blob();

      const responseColor = fetch(urlImageColor);
      const blobImageColor = responseColor.blob();

      // Получение ссылок на элементы <img> из HTML-кода
      const imageBW = document.getElementById('black-and-white');
      const imageColor = document.getElementById('color');

      // Установка src свойств элементов <img> с использованием полученных URL
      imageBW.src = URL.createObjectURL(blobImageBW);
      imageColor.src = URL.createObjectURL(blobImageColor);

      // Ожидание загрузки обеих картинок
      // await Promise.all([
      //   checkImageLoaded(imageBW),
      //   checkImageLoaded(imageColor)
      // ]);

      console.log('Обе картинки успешно загружены и добавлены к элементам <img>');

    } catch (error) {
      console.error('Ошибка загрузки или добавления картинок:', error);
    }

    () => {
      return new Promise((p) => {setTimeout(() => {p()}, 1500)});
    }
   loader.style.display = 'none';
   imageContainer.style.display = 'flex';

  }


  // ==============не работает============================================

  // async function fetchImage() {
  //   try {
  //   const responseBW = await fetch(urlBWImage);
  //   const blobBW = await responseBW.blob();
  //   const blackAndWhiteImage = document.getElementById('black-and-white');
  //   blackAndWhiteImage.src = URL.createObjectURL(blobBW);

  //   const responseColor = await fetch(urlColorImage);
  //   const blobColor = await responseColor.blob();
  //   const colorImage = document.getElementById('color');
  //   colorImage.src = URL.createObjectURL(blobColor);

  //   } catch (error) {
  //     console.error('Ошибка загрузки изображения:', error);
  //     throw error;
  //   }
  // }

  // if (fetchImage.ok) {
  //   loader.style.display = 'none';
  //   imageContainer.style.display = 'flex';
  // }

  // ===============не работает=============================

  // async function uploadImage() {
  //   try {
  //     const blackAndWhiteImage = await fetchImage(urlBWImage);  
  //     blackAndWhiteImage = document.getElementById('black-and-white');
  //     blackAndWhiteImage.src = URL.createObjectURL(blob);
  //     const colorImage = await fetchImage(urlColorImage);
  //     colorImage = document.getElementById('color');
  //     colorImage.src = URL.createObjectURL(blob);
      
  //   } catch (error) {
  //     console.error('Ошибка загрузки изображения:', error);
  //     throw error;
  //   }
  // }

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
