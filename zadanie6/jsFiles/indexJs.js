const ctx = document.getElementById('my-chart');

const labels = [];
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Sínus',
            data: [],
            fill: false,
            borderColor: 'blue',
            tension: 0.1
        },
        {
            label: 'Kosínus',
            data: [],
            fill: false,
            borderColor: 'red',
            tension: 0.1
        }]
};


const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            zoom: {
                pan: {
                    enabled: true
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy',
                }
            }
        }
    }
};

const chart = new Chart(ctx, config)

let evtSource = new EventSource("https://iolab.sk/evaluation/sse/sse.php");
var stopData = false;

let errorMsg = document.getElementById("error-msg")

evtSource.addEventListener("message", (event) => {
    if (stopData)
        return;

    console.log(field.value);
    const data = JSON.parse(event.data);
    console.log(data);

    if (field.value > 15 || field.value < 1){
        console.log("zle cislo");
        errorMsg.innerText = "Zlé zadané číslo !";
        errorMsg.style.color = "red";
        return;
    }

    errorMsg.innerText = "";
    chart.data.labels.push(data.x);
    chart.data.datasets[0].data.push(field.value * data.y1);
    chart.data.datasets[1].data.push(field.value * data.y2);
    chart.update();
})

function pocetGrafov(){
    let vyber = document.getElementById("vyber-grafu");

}

//console.log("ide");
//document.getElementById("slider-label").innerText = "2"
function validateCheckbox() {

    if (!document.getElementById('sin').checked) {
        console.log("sin-off")
        chart.setDatasetVisibility(0, false); // hides dataset at index 1
        chart.update(); // chart now renders with dataset hidden
    }else if (document.getElementById('sin').checked){
        console.log("sin-on")
        chart.setDatasetVisibility(0, true); // hides dataset at index 1
        chart.update(); // chart now renders with dataset hidden
    }
    if (!document.getElementById('cos').checked) {
        console.log("cos-off")
        chart.setDatasetVisibility(1, false); // hides dataset at index 1
        chart.update(); // chart now renders with dataset hidden
    }else if (document.getElementById('cos').checked) {
        console.log("cos-on")
        chart.setDatasetVisibility(1, true); // hides dataset at index 1
        chart.update(); // chart now renders with dataset hidden
    }

}

function ukonci(){
    stopData = true;
    chart.stop();
}

var range = document.querySelector('.inputRange');
var field = document.getElementById('number-input');
var paragraf = document.getElementById('vystup');

range.addEventListener('input', function (e) {
    field.value = e.target.value;
    paragraf.innerText = e.target.value;

});
field.addEventListener('input', function (e) {
    range.value = e.target.value;
    paragraf.innerText = e.target.value;

});

function zobrazInput(id1, id2){
    document.getElementById(id1).style.display = "none";
    document.getElementById(id2).style.display = "block";

}

function prepinacRadioButton() {
    let vyberSlider = document.getElementById("slider");
    let vyberPole = document.getElementById("pole");

    if (vyberSlider.checked){
        zobrazInput("number-div", "slider-div");

    }else if (vyberPole.checked){
        zobrazInput("slider-div", "number-div");

    }
}



function validateNumberInput(){
    let cislo = document.getElementById("number-input");
    let errorMsg = document.getElementById("error-msg")
    if (cislo.value < 0 || cislo.value > 15){
        errorMsg.innerText = "Zlé zadané číslo !";
        errorMsg.style.color = "red";

    }else {
        errorMsg.innerText = "";
    }
}
