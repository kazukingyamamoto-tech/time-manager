let startTime = 0;
let elapsedTime = 0;
let timerId = null;

function updateTime() {

  const time = Date.now() - startTime + elapsedTime;
  const sectime = time / 1000;

  const hours = Math.floor(sectime / 3600);
  const minutes = Math.floor((sectime % 3600) / 60);
  const seconds = Math.floor(sectime % 60);

  document.getElementById("time").textContent =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}

document.getElementById("start").onclick = () => {
    if (timerId !== null) {
        clearInterval(timerId);
        document.getElementById("time").textContent = "00:00:00";
        startTime = Date.now();
        elapsedTime = 0;
        timerId = setInterval(updateTime, 1000);
        return;
    }
    startTime = Date.now();
    timerId = setInterval(updateTime, 1000);
};

document.getElementById("stop").onclick = () => {
    if (timerId === null) return;
    clearInterval(timerId);
    timerId = null;
    elapsedTime += Date.now() - startTime;
};

const modeRadios = document.getElementsByName("mode");
for (const radio of modeRadios) {
    radio.addEventListener("change", () => {
        document.querySelector("#back").className = radio.value;
    });
}