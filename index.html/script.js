// 获取画布和上下文
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 窗口大小调整时更新画布尺寸
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// 烟花粒子类
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2 + 1;
        this.speed = Math.random() * 4 + 2;
        this.angle = Math.random() * Math.PI * 2;
        this.alpha = 1;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.02; // 逐渐透明
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// 粒子数组
let particles = [];

// 创建烟花
function createFirework(x, y) {
    const colors = ['#ff6f61', '#ffd700', '#00ccff', '#ff00ff', '#32cd32'];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
}

// 更新粒子
function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0); // 移除透明度为 0 的粒子
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(updateParticles);
}

// 点击触发烟花
function triggerFireworks() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5; // 控制烟花在屏幕上半部分
    createFirework(x, y);

    // 显示弹窗
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
 popup.classList.add('show'); // 添加弹窗显示的动画
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // 3秒后自动关闭弹窗

    // 3秒后自动关闭弹窗
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}
// 启动动画
updateParticles();

// ==== 新增代码：大头贴交互部分 ====
const swingImage = document.getElementById('swing-image'); // 获取大头贴图片元素
const message = "生日快乐哦，希望你天天开心，像我一样!"; // 提示信息

// 添加点击事件
swingImage.addEventListener('click', () => {
    // 切换加速晃动动画
    swingImage.classList.add('swing-fast');
    
    // 显示提示信息
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.style.position = 'absolute';
    popup.style.top = `${swingImage.offsetTop + 100}px`; // 位于大头贴下方
    popup.style.left = `${swingImage.offsetLeft}px`;
    popup.style.background = 'rgba(255, 255, 255, 0.9)';
    popup.style.color = '#ff6f61';
    popup.style.padding = '10px 20px';
    popup.style.borderRadius = '10px';
    popup.style.fontSize = '1.5em';
    popup.style.zIndex = '999';
    popup.style.textAlign = 'center';

    // 将提示文字添加到页面
    document.body.appendChild(popup);

    // 2秒后恢复正常晃动并移除提示
    setTimeout(() => {
        swingImage.classList.remove('swing-fast');
        popup.remove(); // 删除提示文字
    }, 2000);
});// 启动动画
updateParticles();

