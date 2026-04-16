// ── Press to Enter Logic ──
const overlay = document.getElementById('enterOverlay');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bgMusic');

overlay.addEventListener('click', () => {
    bgMusic.volume = 0.6;
    bgMusic.play();

    overlay.classList.add('hidden');
    mainContent.classList.add('visible');
});

// ── Rain Canvas ──
const canvas = document.getElementById('rainCanvas')
const ctx = canvas.getContext('2d')

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

const RAIN_COUNT = 150;        
const RAIN_COLOR = '#c64aff';  
const RAIN_WIDTH = 2;          
const RAIN_TILT = -0.5;        

const raindrops = [];

for (let i = 0; i < RAIN_COUNT; i++) {
    raindrops.push({
        x: Math.random() * canvas.width,      
        y: Math.random() * canvas.height,     
        length: 15 + Math.random() * 20,      
        speed: 3 + Math.random() * 7          
    });
}

function drawRaindrop(drop) {
    const endX = drop.x + RAIN_TILT * drop.length;
    const endY = drop.y + drop.length;
    
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);      
    ctx.lineTo(endX, endY);          
    ctx.strokeStyle = RAIN_COLOR;    
    ctx.lineWidth = RAIN_WIDTH;      
    ctx.stroke();                   
}

function updateRaindrop(drop) {
    drop.y += drop.speed;
    
    if (drop.y > canvas.height) {
        drop.y = -drop.length;                    
        drop.x = Math.random() * canvas.width;    
    }
}

function drawAllRaindrops() {
    for (let i = 0; i < raindrops.length; i++) {
        drawRaindrop(raindrops[i]);
    }
}

function updateAllRaindrops() {
    for (let i = 0; i < raindrops.length; i++) {
        updateRaindrop(raindrops[i]);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animateRain() {
    clearCanvas();           
    updateAllRaindrops();    
    drawAllRaindrops();      
    
    requestAnimationFrame(animateRain);
}

animateRain();