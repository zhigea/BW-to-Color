window.addEventListener('load', function() {
      const loader = document.querySelector('.loader');
      const imageContainer = document.querySelector('.image-container');
      const downloadError = document.querySelector('.download-error');
      const dividerMinX = 0;
      const dividerMaxX = 407;

      // Загрузка изображений
      const promise1 = fetch('https://sites-cf.mhcache.com/t/738/202/1221738202/500/500013_749062o406111cau6c32v0_A_1024x1536/filters:watermark(/watermarks/logo.png,-2p,-2p,0,0,5):watermark(/watermarks/palette.png,2p,-2p,5,0,5)/xuTjNZntCr2-JGE_6tio_ngljJ0=/.jpg')
      .then(responce => responce.blob())
        .then(blob => {
          const blackAndWhiteImage = document.getElementById('black-and-white');
          blackAndWhiteImage.src = URL.createObjectURL(blob);
        })
        .catch(error => {
          console.log('Ошибка:', error);
          downloadError.style.display = 'block';
          loader.style.display = 'none';
          throw new Error(('Не удалось загрузить ЧБ картинку'));

        });

      const promise2 = fetch('https://sites-cf.mhcache.com/t/738/202/1221738202/500/500013_749062o406111cau6c32v0_A_1024x1536/filters:watermark(/watermarks/logo.png,-2p,-2p,0,0,5):watermark(/watermarks/palette.png,2p,-2p,5,0,5)/xuTjNZntCr2-JGE_6tio_ngljJ0=/.jpg')
        .then(responce => responce.blob())
        .then(blob => {
          const colorImage = document.getElementById('color');
          colorImage.src = URL.createObjectURL(blob);
        })
        .then(() => {
          return new Promise((r) => {setTimeout(() => {r()}, 1500)});
        })
        .catch(error => {
          console.log('Ошибка:', error);
          downloadError.style.display = 'block';
          loader.style.display = 'none';
          throw new Error(('Не удалось загрузить цветную картинку'));
        })

        Promise.all([promise1, promise2])
        .then(() => {
          loader.style.display = 'none';
          imageContainer.style.display = 'flex';
        })

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
         dividerPosition = dividerMaxX  ;
        }
        divider.style.left = dividerPosition + 'px';
      });
    
      window.addEventListener('mouseup', function() {
        isResizing = false;
      });
    });
    