let particles = [];
let colorModeIndex = 0;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    for (let i = 0; i < 150; i++) {
        particles.push(new AuroraParticle());
    }
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const landingPage = document.getElementById('landing-page');
            if (landingPage) {
                landingPage.classList.add('hidden');
            }
        });
    }
}

function draw() {
    background(5, 5, 16, 25); 
    for (let p of particles) {
        p.update();
        p.display();
    }
}

function mousePressed() {
    colorModeIndex = (colorModeIndex + 1) % 4;
}

function keyPressed() {
    for (let p of particles) {
        p.pos.set(random(width), random(height));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class AuroraParticle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = random(2, 5);
        this.size = random(2, 6);
    }
    update() {
        let n = noise(this.pos.x * 0.005, this.pos.y * 0.005, frameCount * 0.002);
        let angle = n * TWO_PI * 2;
        let flow = createVector(cos(angle), sin(angle)).mult(0.1);
        this.acc.add(flow);
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.pos);
        if (dir.mag() < 300) {
            dir.setMag(0.2);
            this.acc.add(dir);
        }
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }
    display() {
        noStroke();
        if (colorModeIndex === 0) fill(0, 255, 204, 150);
        else if (colorModeIndex === 1) fill(0, 119, 255, 150);
        else if (colorModeIndex === 2) fill(255, 0, 128, 150);
        else fill(200, 100, 255, 150);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
