(function() {
    const startTime = performance.now();

    window.addEventListener('load', function() {
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        const loadTimeElement = document.createElement('div');
        loadTimeElement.textContent = `Страница загружена за ${loadTime.toFixed(2)} мс`;
        loadTimeElement.style.position = 'fixed';
        loadTimeElement.style.bottom = '0';
        loadTimeElement.style.right = '0';
        loadTimeElement.style.backgroundColor = 'black';
        loadTimeElement.style.color = 'white';
        loadTimeElement.style.padding = '5px';
        loadTimeElement.style.zIndex = '1000';

        document.body.appendChild(loadTimeElement);
    });
})();

(function() {
    const currentPage = document.location.pathname.split('/').pop();
    const activePage = document.getElementById(currentPage === '' ? 'index.html' : currentPage)
    activePage.children[0].classList.add('active')
})();
