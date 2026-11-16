let bodies = [];
let numBodies = 5;
let blackHole;

function setup() {
    createCanvas(800, 600);

    // create Black Hole
    blackHole = new Body(width/2,height/2,100,color(255,255,255));
    blackHole.size = 40;

    // populate scene with Bodies
    for (let i = 0; i < numBodies; i++) {
        let body = new Body(random(width),
                            random(height),
                            random(1,15),
                            color(random(255),random(255),random(255))
                            );
        bodies.push(body);
    }
}

function draw() {
    background(5,3,20);

    blackHole.display();

    for (let i = 0; i < bodies.length; i++) {
        // apply basic downward force
        // bodies[i].addForce(createVector(0,0.1));
        
        // attract to blackHole
        let toBlackHole = blackHole.gravityAttractionForce(bodies[i]);
        bodies[i].addForce(toBlackHole);

        bodies[i].move();
        bodies[i].checkWrap();
        bodies[i].display();
    }
}

class Body {
    // a Body subjected to physical forces

    constructor(x,y,mass,color) {
        // initialize a new Body

        this.position = createVector(x,y);
        this.velocity = p5.Vector.random2D().mult(random(1,3));
        this.acceleration = createVector(0,0);

        this.mass = mass;

        this.size = 20;
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

    checkWrap() {
        // if out of bounds, then wrap to the other side
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    display() {
        // display Body as a simple circle
        noStroke();
        fill(this.color);
        circle(this.position.x,this.position.y,this.size);
    }

    gravityAttractionForce(other) {
        // Fab = (G * ma * mb) / (AB * AB)
        // so the direction of A attracting B is B to A
        let fvector = p5.Vector.sub(this.position,other.position);
        let dist = fvector.mag();
        let G = 3; // this is a value to tweak ? idk if i need it to be the actual constant
        let fmag = (G * this.mass * other.mass) / (dist * dist)
        
        fvector.setMag(fmag);
        return fvector;
    }
}