(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const source = params.get('src') || '';
  const returnPage = params.get('return') || 'projecten.html';

  const safeSource = /^images\/[A-Za-z0-9_().%\-]+\.(?:jpe?g|png|webp)$/i.test(source);
  const safeReturn = /^project[1-3]\.html$/i.test(returnPage) ? returnPage : 'projecten.html';

  const image = document.getElementById('projectViewerImage');
  const error = document.getElementById('projectViewerError');
  const back = document.getElementById('backToProject');

  back.href = safeReturn;
  back.addEventListener('click', (event) => {
    const referrer = document.referrer;
    let sameOriginReferrer = false;

    try {
      sameOriginReferrer = Boolean(referrer) && new URL(referrer).origin === window.location.origin;
    } catch (_) {
      sameOriginReferrer = false;
    }

    if (sameOriginReferrer && window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  });

  if (!safeSource) {
    image.hidden = true;
    error.hidden = false;
    return;
  }

  image.src = source;
  const filename = decodeURIComponent(source.split('/').pop() || 'Projectafbeelding')
    .replace(/[_-]+/g, ' ')
    .replace(/\.(jpe?g|png|webp)$/i, '');

  image.alt = filename;
  document.title = `${filename} | Lorenzo Bombello`;

  image.addEventListener('error', () => {
    image.hidden = true;
    error.hidden = false;
  });
})();
