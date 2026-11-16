let bodies = [];
let numBodies = 5;

function setup() {
    createCanvas(800, 600);

    // populate scene with Bodies
    for (let i = 0; i < numBodies; i++) {
        let body = new Body(random(width),random(height));
        bodies.push(body);
    }
}

function draw() {
    background("white");

    // show Bodies
    for (let i = 0; i < numBodies; i++) {
        bodies[i].display();
    }
}

class Body {
    // a Body subjected to physical forces

    constructor(x,y) {
        // initialize a new Body

        this.position = createVector(x,y);
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);

        this.mass = 1;

        this.size = 20;
        this.color = "cornflowerblue";
    }

//    move() {
//        
//    }

    display() {
        // display Body as a simple circle
        noStroke();
        fill(this.color);
        circle(this.position.x,this.position.y,this.size);
    }
}