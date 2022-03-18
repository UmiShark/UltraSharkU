const form = document.querySelector('form');
const input = document.getElementById('target');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

const btn = document.querySelector(".checkbox");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
	document.body.classList.toggle("dark-theme");

} else if (currentTheme == "light") {
	document.body.classList.toggle("light-theme");
}

btn.addEventListener("click", function() {
	if (prefersDarkScheme.matches) {
		document.body.classList.toggle("light-theme");
		var theme = document.body.classList.contains("light-theme") ?
			"light" :
			"dark";
	} else {
		document.body.classList.toggle("dark-theme");
		var theme = document.body.classList.contains("dark-theme") ?
			"dark" :
			"light";
	}
	localStorage.setItem("theme", theme);
});
