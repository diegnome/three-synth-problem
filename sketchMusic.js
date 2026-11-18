let bpm = 120;
let beats = 4; // x beats in a measure
let subDiv = 4; // x notes to a beat
let steps = beats * subDiv;
let stepDuration = 60000 / (bpm*subDiv);
let lastStepTime = 0;

let stepNumber = 0;
let sequenceTrigger = [true, false, false, true,
                       true, false, false, false,
                       true, true, false, false,
                       true, true, false, true]
let sequenceValue = ["blue", "violet", "white", "white",
                     "green", "green", "white", "white",
                     "black", "black", "black", "white",
                     "purple", "blue", "white", "white"]

if (sequenceTrigger.length < steps) {
    for (i = sequenceTrigger.length; i < steps; i++) {
        sequenceTrigger.push(false)
    }
}
if (sequenceValue.length < steps) {
    for (i = sequenceValue.length; i < steps; i++) {
        sequenceValue.push("white")
    }
}


function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(230,160,180);

    // if this frame is a beat, advance step
    if (isBeat()) {
        stepNumber = (stepNumber + 1) % steps;
    }

    // draw sequencer track
    for (i = 0; i < steps; i++) {
        stroke('black');
        if (sequenceTrigger[i]) {
            if (stepNumber === i) {
                fill(sequenceValue[i]);
            } else {
                fill('lightgreen');
            }
        } else {
            if (stepNumber === i) {
                fill(200,120,130);
            } else {
                fill(250,180,200);
            }
        }
        rect(i*(width/steps),(height-50)/2,width/steps,50);
        fill(sequenceValue[i]);
        rect(i*(width/steps),(height-50)/2+50+20,width/steps,10)
    }

    // display debugging text
    noStroke();
    fill(0);
    textAlign(CENTER);
    text(`${steps} notes to a measure at ${bpm} bpm is ${stepDuration} ms per note.`, width/2, height*0.25);
    text(`${steps*stepDuration/1000} sec for the whole sequence.`, width/2, height*0.25+40);
    text(`${stepNumber} / ${steps}`,width/2, height*0.75);

}

function isBeat() {
    let onBeat = (millis() - lastStepTime >= stepDuration);
    if (onBeat) {
        lastStepTime += stepDuration;
    }
    return onBeat
}