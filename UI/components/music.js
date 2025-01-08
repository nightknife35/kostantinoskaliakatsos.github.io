async function loadNavbar() {
  const cacheKey = 'musicWindowHTML';
  const cachedNavbar = sessionStorage.getItem(cacheKey);

  if (cachedNavbar) {
      document.getElementById("music-player-window").innerHTML = cachedNavbar;
  } else {
      try {
          const response = await fetch('/UI/components/music.html');
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          const text = await response.text();
          document.getElementById("music-player-window").innerHTML = text;
          sessionStorage.setItem(cacheKey, text);
      } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
      }
  }
}

loadNavbar();