(() => {
  'use strict';
  const params = new URLSearchParams(window.location.search);
  const source = params.get('src') || '';
  const safeSource = /^certificates\/[A-Za-z0-9_().%\-]+\.(?:jpe?g|png|webp)$/i.test(source);
  const image = document.getElementById('certificateViewerImage');
  const error = document.getElementById('certificateViewerError');
  const original = document.getElementById('openCertificateOriginal');
  if (!safeSource) {
    image.hidden = true;
    error.hidden = false;
    original.hidden = true;
    return;
  }
  image.src = source;
  original.href = source;
  const filename = decodeURIComponent(source.split('/').pop() || 'Certificaat').replace(/[_-]+/g, ' ').replace(/\.(jpe?g|png|webp)$/i, '');
  image.alt = filename;
  document.title = `${filename} | Lorenzo Bombello`;
  image.addEventListener('error', () => {
    image.hidden = true;
    error.hidden = false;
  });
})();
