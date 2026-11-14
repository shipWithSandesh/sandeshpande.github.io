// Typing effect
const words = ["QA Automation Engineer", "AI Test Engineer", "Playwright Pro", "Pytest Builder", "Bug Hunter"];
const el = document.getElementById("typed");
let w = 0, c = 0, del = false;
function type() {
  const word = words[w];
  el.textContent = word.slice(0, c);
  if (!del && c < word.length) c++;
  else if (del && c > 0) c--;
  else if (!del) { del = true; return setTimeout(type, 1400); }
  else { del = false; w = (w + 1) % words.length; }
  setTimeout(type, del ? 45 : 95);
}
type();

// Mobile menu
const menu = document.getElementById("menu");
document.getElementById("burger").onclick = () => menu.classList.toggle("open");
menu.querySelectorAll("a").forEach(a => a.onclick = () => menu.classList.remove("open"));
document.getElementById("yr").textContent = new Date().getFullYear();

// Particle network background
const cv = document.getElementById("net"), ctx = cv.getContext("2d");
let pts = [], mouse = { x: -999, y: -999 };
function size() {
  cv.width = innerWidth; cv.height = innerHeight;
  const n = Math.min(110, Math.floor(innerWidth * innerHeight / 14000));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5
  }));
}
addEventListener("resize", size);
addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
size();
function draw() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  const all = pts.concat([mouse]);
  for (const p of pts) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > cv.width) p.vx *= -1;
    if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    ctx.fillStyle = "rgba(56,189,248,.85)";
    ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, 7); ctx.fill();
  }
  for (let i = 0; i < all.length; i++)
    for (let j = i + 1; j < all.length; j++) {
      const a = all[i], b = all[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        ctx.strokeStyle = `rgba(56,189,248,${(1 - d / 130) * .45})`;
        ctx.lineWidth = .8;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  requestAnimationFrame(draw);
}
draw();
