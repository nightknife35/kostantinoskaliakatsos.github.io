async function loadNavbar() {
    const cacheKey = 'navbarHtml';
    const cachedNavbar = sessionStorage.getItem(cacheKey);

    if (cachedNavbar) {
        document.getElementById("bottom-navbar").innerHTML = cachedNavbar;
    } else {
        try {
            const response = await fetch('/UI/components/nav.html');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const text = await response.text();
            document.getElementById("bottom-navbar").innerHTML = text;
            sessionStorage.setItem(cacheKey, text);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
}

loadNavbar();