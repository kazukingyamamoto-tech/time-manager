let startTime = 0;
let elapsedTime = 0;
let timerId = null;
let drecords = [];
let lrecords = [];
let dnumber = 0;
let lnumber = 0;

function saveData() {
    localStorage.setItem("drecords", JSON.stringify(drecords));
    localStorage.setItem("lrecords", JSON.stringify(lrecords));
}

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

function laddRecord(timeString, detail) {
    lrecords.push([timeString, detail]);
    saveData();
}

function lrenderRecords() {
    let lhtml = "";

    for (let i = 0; i < lrecords.length; i++) {
        const lkiroku = lrecords[i][0];
        const ldetail = lrecords[i][1];

        lhtml += `
            <div class="record">
                <span class="number">${i + 1}.</span>
                <span class="time">${lkiroku}</span>
                <input id="ldetail-${i}" value="${ldetail}">
                <button onclick="ldeleteRecord(${i})">削除</button>
            </div>
        `;
    }

    document.getElementById("liveresult").innerHTML = lhtml;

    for (let i = 0; i < lrecords.length; i++) {
        document.getElementById(`ldetail-${i}`).addEventListener("input", () => {
            lrecords[i][1] = document.getElementById(`ldetail-${i}`).value;
            saveData();
        }); 
    };
}

function ldeleteRecord(index) {
    if (confirm(`${index+1}の記録を削除しますか？`)) {
        lrecords.splice(index, 1); // 指定した番号のデータを1つ削除
        saveData();                // ローカルストレージを更新
        lrenderRecords();          // 再描画
    }
}

function daddRecord(timeString, detail) {
    drecords.push([timeString, detail]);
    saveData();
}

function drenderRecords() {
    let dhtml = "";

    for (let i = 0; i < drecords.length; i++) {
        const dkiroku = drecords[i][0];
        const ddetail = drecords[i][1];
        dhtml += `
            <div class="record">
                <span class="number">${i + 1}.</span>
                <span class="time">${dkiroku}</span>
                <input id="ddetail-${i}" value="${ddetail}">
                <button onclick="ddeleteRecord(${i})">削除</button>
            </div>
        `;
    }

    document.getElementById("dieresult").innerHTML = dhtml;

    for (let i = 0; i < drecords.length; i++) {
        document.getElementById(`ddetail-${i}`).addEventListener("input", () => {
            drecords[i][1] = document.getElementById(`ddetail-${i}`).value;
            saveData();
        }); 
    };
}

function ddeleteRecord(index) {
    if (confirm(`${index+1}の記録を削除しますか？`)) {
        drecords.splice(index, 1);
        saveData();
        drenderRecords();
    }
}

document.getElementById("start").onclick = () => {
    if (timerId !== null) {
        clearInterval(timerId);
        if (document.querySelector("#back").className === "die") {
            daddRecord(document.getElementById("time").textContent,"");
            drenderRecords();
        }
        if (document.querySelector("#back").className === "live") {
            laddRecord(document.getElementById("time").textContent,"");
            lrenderRecords();
        }

        saveData();

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

window.addEventListener("DOMContentLoaded", () => {
    const ldata = localStorage.getItem("lrecords");
    const ddata = localStorage.getItem("drecords");

    if (ldata) {
        lrecords = JSON.parse(ldata);
        lrenderRecords();
    }

    if (ddata) {
        drecords = JSON.parse(ddata);
        drenderRecords();
    }
});