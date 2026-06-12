let particles = [];
let isRunning = false;
let globalColor;

function setup() {
    // 將畫布建立在指定容器內
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    
    globalColor = color(0, 200, 255);
    
    // 初始化粒子
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    // 監聽 Landing Page 的按鈕
    const startBtn = document.getElementById('start-btn');
    const landingPage = document.getElementById('landing-page');
    
    startBtn.addEventListener('click', () => {
        landingPage.classList.add('hidden'); // 隱藏 Landing Page
        isRunning = true; // 啟動 p5 互動邏輯
    });
}

function draw() {
    background(11, 11, 26, 30); // 帶有殘影效果的背景

    // 更新並繪製所有粒子
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(isRunning);
        particles[i].display();
    }
}

// 互動 1：滑鼠點擊改變顏色
function mousePressed() {
    if (!isRunning) return;
    globalColor = color(random(100, 255), random(100, 255), random(100, 255));
}

// 互動 2：鍵盤按下生成更多粒子
function keyPressed() {
    if (!isRunning) return;
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(mouseX, mouseY));
    }
}

// 視窗大小改變時重設畫布
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// 粒子類別定義
class Particle {
    constructor(x, y) {
        this.pos = createVector(x || random(width), y || random(height));
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.size = random(4, 12);
        this.speedLimit = random(3, 6);
    }

    update(active) {
        if (active) {
            // 滑鼠吸引力
            let target = createVector(mouseX, mouseY);
            let dir = p5.Vector.sub(target, this.pos);
            dir.setMag(0.1);
            this.vel.add(dir);
        }
        
        this.vel.limit(this.speedLimit);
        this.pos.add(this.vel);

        // 邊界碰撞檢查
        if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
        if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
    }

    display() {
        noStroke();
        fill(globalColor);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
