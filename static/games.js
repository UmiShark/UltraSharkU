iframe = true

function go() {
	var input = document.getElementById("url-target");
	if (input.value) {
		window.open("/main/" + input.value);
	} else {
		alert("Please provide a link. It does not require https://.");
	}
}

function x() {
	buttons.style.display = "none";
	bigContainer.style.display = "initial";
	if (iframe) {
    console.log('true')
		iframe_frame.style.display = "none";
		document.getElementById("iframe_frame").src = "";
	} else {
    console.log('false')
		document.getElementById("ruffle").removeChild(document.getElementById("ruffle").firstChild);
	}
}

function reload() {
	document.getElementById('iframe_frame').contentWindow.location.reload();
}


function loadIframe(url){
  iframe=true
  bigContainer.style.display = "none";
	iframe_frame.style.display = "initial";
	buttons.style.display = "flex";
	document.getElementById("iframe_frame").src = url;
}

function ruffle(url){
  iframe = false;
	bigContainer.style.display = "none";
	buttons.style.display = "flex";
	document.getElementById("ruffle").style.display = "initial";
	const ruffle = window.RufflePlayer.newest()
	const player = ruffle.createPlayer();
  player.config = {
    letterbox: "on",
    backgroundColor: "#000000",
};
  player.style.width = "100%";
  player.style.height = "100%";
	document.getElementById("ruffle").append(player);
	player.load(`/swf/${url}.swf`);
}

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