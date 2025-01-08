async function loadWannaLeaveWindow() {
  const cacheKey = 'wannaLeaveHtml';
  const cachedNavbar = sessionStorage.getItem(cacheKey);
  htmlz = document.getElementById("sure-u-wanna-leave")
  if (cachedNavbar) {
      htmlz.innerHTML = cachedNavbar;
  } else {
      try {
          const response = await fetch('/UI/components/wanna_leave.html');
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          const text = await response.text();
          htmlz.innerHTML = text;
          sessionStorage.setItem(cacheKey, text);
      } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
      }
  }
}

loadWannaLeaveWindow();


