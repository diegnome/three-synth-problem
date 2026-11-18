let bpm = 120;
let beats = 4; // 4 beats in a measure
let subDiv = 4; // 4 notes to a beat
let steps = beats * subDiv;
let stepDuration = 60000 / (bpm*subDiv);
let stepNumber = 0;

let lastStepTime = 0;

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(230,160,180);

    if (isBeat()) {
        background(200,120,130);
        stepNumber += 1;
    }

    noStroke();
    if (stepNumber === floor(bpm * (millis() / 60000))) {
        fill('green');
    } else {
        fill('red');
    }
    rect(20, 20, width-40, height-40);

    fill(0);
    textAlign(CENTER);
    text(`${steps} notes to a measure at ${bpm} bpm is ${stepDuration} ms per note.`, width/2, height*0.25);
    text(`${steps*stepDuration/1000} sec for the whole sequence.`, width/2, height*0.5);
    text(`${stepNumber} steps counted vs ${floor(bpm * (millis() / 60000))} in theory.`,width/2, height*0.75);

}

function isBeat() {
    let beat = bpm * (millis() / 60000);
    let onBeat = (millis() - lastStepTime >= stepDuration*subDiv);
    if (onBeat) {
        lastStepTime += stepDuration*subDiv;
    }
    return onBeat
}