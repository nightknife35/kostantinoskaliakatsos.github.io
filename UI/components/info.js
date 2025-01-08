async function loadNavbar() {
  const cacheKey = 'ingoWindowHTML';
  const cachedNavbar = sessionStorage.getItem(cacheKey);

  if (cachedNavbar) {
      document.getElementById("info-window").innerHTML = cachedNavbar;
  } else {
      try {
          const response = await fetch('/UI/components/info.html');
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          const text = await response.text();
          document.getElementById("info-window").innerHTML = text;
          sessionStorage.setItem(cacheKey, text);
      } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
      }
  }
}

loadNavbar();
