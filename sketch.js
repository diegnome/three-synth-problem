let bodies = [];
let numBodies = 5;

function setup() {
    createCanvas(800, 600);

    // populate scene with Bodies
    for (let i = 0; i < numBodies; i++) {
        let body = new Body(random(width),
                            random(height),
                            color(random(255),random(255),random(255))
                            );
        bodies.push(body);
    }
}

function draw() {
    background(5,3,20);

    for (let i = 0; i < bodies.length; i++) {
        bodies[i].addForce(createVector(0,0.1));
        bodies[i].move();
        bodies[i].display();
    }
}

class Body {
    // a Body subjected to physical forces

    constructor(x,y,color) {
        // initialize a new Body

        this.position = createVector(x,y);
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);

        this.mass = 1;

        this.size = 30;
        this.color = color;
    }

    addForce(force) {
        // F = ma <=> a = F/m
        let a = p5.Vector.div(force,this.mass);
        this.acceleration.add(a);
    }

    move() {
        // apply movement
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        
        // clear acceleration
        this.acceleration.mult(0);
    }

    display() {
        // display Body as a simple circle
        noStroke();
        fill(this.color);
        circle(this.position.x,this.position.y,this.size);
    }
}