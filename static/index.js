iframe = true

//-----------------------------------Ultraviolet-----------------------------------\\

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

//-----------------------------------GAMES-----------------------------------\\

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

//-----------------------------------BALLS-----------------------------------\\

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

const colors = ["#47C1FF", "#A8E2F7", "#007AD9", "#2AA4F4", "#0C52BB"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("aBalls");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});
