(function () {
    const theme = (document.cookie.match(/theme=(dark|light)/) || 'light')[1];
    try {
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
        }
    } catch (e) {
        console.error(`Возникала проблема при загрузки темы: ${e}`);
    }
})();