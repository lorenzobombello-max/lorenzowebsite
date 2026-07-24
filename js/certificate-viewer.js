(() => {
  'use strict';
  const backLink = document.getElementById('backToCertificates');

  if (backLink) {
    backLink.addEventListener('click', (event) => {
      const referrer = document.referrer;
      let cameFromCertificates = false;

      if (referrer) {
        try {
          const previousUrl = new URL(referrer);
          cameFromCertificates =
            previousUrl.origin === window.location.origin &&
            /\/certificates\.html$/i.test(previousUrl.pathname);
        } catch {
          cameFromCertificates = false;
        }
      }

      if (cameFromCertificates && window.history.length > 1) {
        event.preventDefault();
        window.history.back();
      }
    });
  }

  const params = new URLSearchParams(window.location.search);
  const source = params.get('src') || '';
  const safeSource = /^certificates\/[A-Za-z0-9_().%\-]+\.(?:jpe?g|png|webp)$/i.test(source);
  const image = document.getElementById('certificateViewerImage');
  const error = document.getElementById('certificateViewerError');
  if (!safeSource) {
    image.hidden = true;
    error.hidden = false;
    return;
  }
  image.src = source;
  const filename = decodeURIComponent(source.split('/').pop() || 'Certificaat').replace(/[_-]+/g, ' ').replace(/\.(jpe?g|png|webp)$/i, '');
  image.alt = filename;
  document.title = `${filename} | Lorenzo Bombello`;
  image.addEventListener('error', () => {
    image.hidden = true;
    error.hidden = false;
  });
})();
