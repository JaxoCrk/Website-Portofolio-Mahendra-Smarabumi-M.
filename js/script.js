if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', function () {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});

const menuButton = document.querySelector('.hamburger');
const navigation = document.querySelector('.nav-links');

if (menuButton && navigation) {
  menuButton.addEventListener('click', function () {
    const isOpen = navigation.classList.toggle('active');
    menuButton.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navigation.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navigation.classList.remove('active');
      menuButton.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

document.addEventListener('pointerdown', function () {
  document.body.classList.add('is-clicking');
});

function stopClickCursor() {
  document.body.classList.remove('is-clicking');
}

document.addEventListener('pointerup', stopClickCursor);
document.addEventListener('pointercancel', stopClickCursor);
window.addEventListener('blur', stopClickCursor);

const nijikaClicker = document.querySelector('.nijika-clicker');
const doritoStage = document.querySelector('.dorito-stage');

if (nijikaClicker && doritoStage) {
  nijikaClicker.addEventListener('click', function () {
    const dorito = document.createElement('img');
    dorito.src = 'Gambar/dorito.png';
    dorito.alt = '';
    dorito.className = 'flying-dorito';
    const direction = Math.random() < 0.5 ? -1 : 1;
    const endDistance = Math.round(110 + Math.random() * 80);
    const endX = direction * endDistance;
    const launchX = direction * Math.round(10 + Math.random() * 35);
    const arcX = direction * Math.round(endDistance * (0.75 + Math.random() * 0.45));
    const launchY = -Math.round(85 + Math.random() * 35);
    const arcY = -Math.round(150 + Math.random() * 70);
    const endY = Math.round(170 + Math.random() * 70);
    dorito.style.offsetPath = `path("M 0 0 C ${launchX} ${launchY}, ${arcX} ${arcY}, ${endX} ${endY}")`;
    doritoStage.appendChild(dorito);
    const styles = getComputedStyle(dorito);
    const launchTime = parseFloat(styles.getPropertyValue('--dorito-launch-time')) || 350;
    const fallTime = parseFloat(styles.getPropertyValue('--dorito-fall-time')) || 350;
    const totalTime = launchTime + fallTime;

    dorito.animate(
      [
        { opacity: 0, offsetDistance: '0%' },
        { opacity: 1, offsetDistance: '18%' },
        { opacity: 1, offsetDistance: '42%' },
        { opacity: 1, offsetDistance: '64%' },
        { opacity: 1, offsetDistance: '82%' },
        { opacity: 0, offsetDistance: '100%' }
      ],
      { duration: totalTime, easing: 'linear', fill: 'forwards' }
    ).finished.then(function () {
      dorito.remove();
    });
  });
}

function copyEmail() {
  navigator.clipboard.writeText("mahendra.smarabumi.m@gmail.com");

  document.getElementById("copy-message").textContent = " Email copied!";
}