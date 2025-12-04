// ---------- CURSOR ----------

const cursor = document.getElementById('cursor-blob');
const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

if(isTouch){
  cursor.style.display = 'none';
  document.documentElement.style.cursor = 'default';
} else {
  document.documentElement.style.cursor = 'none';
}

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let posX = mouseX;
let posY = mouseY;

let trail = [];
const maxTrail = 12;

for(let i=0;i<maxTrail;i++){
  trail.push({x: posX,y: posY});
}

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  posX += (mouseX - posX) * 0.18;
  posY += (mouseY - posY) * 0.18;

  trail.push({x: posX, y: posY});
  if(trail.length > maxTrail) trail.shift();

  cursor.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;

  const colors = ['rgba(111,209,216,', 'rgba(124,107,255,'];
  let shadows = trail.map((t,i)=>{
    const alpha=((i+1)/trail.length)*0.4;
    const color=colors[i%colors.length]+alpha+')';
    return `${t.x-posX}px ${t.y-posY}px 20px ${color}`;
  }).join(', ');

  cursor.style.boxShadow = shadows;

  requestAnimationFrame(animateCursor);
}
animateCursor();

// ---------- MAGNET EFFECT ----------
const magnets = document.querySelectorAll('[data-magnet]');

magnets.forEach(el=>{
  el.addEventListener('mouseenter', ()=>{ gsap.to(cursor,{ scale:1.5, duration:0.3, ease:"power3.out" }); });
  el.addEventListener('mouseleave', ()=>{ gsap.to(cursor,{ scale:1, duration:0.3, ease:"power3.out" }); });

  el.addEventListener('mousemove', e=>{
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;

    const offsetX = (e.clientX - centerX) * 0.2;
    const offsetY = (e.clientY - centerY) * 0.2;

    gsap.to(cursor,{ x:mouseX - offsetX, y:mouseY - offsetY, duration:0.2, ease:"power2.out" });
  });
});

// ---------- GSAP HERO + SCROLL ----------

window.addEventListener('DOMContentLoaded', ()=>{
  gsap.registerPlugin(ScrollTrigger);

  // Hero title
  gsap.from('.hero-title span', {
    opacity:0,
    y:50,
    duration:1.2,
    ease:"power3.out",
    stagger:0.2
  });

  // Hero subtitle
  gsap.from(".hero-subtitle", {
    opacity:0,
    y:20,
    duration:1,
    ease:"power2.out",
    delay:1
  });

//about 
gsap.from(".section-title", {
  opacity: 0,
  y: 20,
  duration: 1,
  ease: "power2.out"
});

gsap.from(".about-text", {
  opacity: 0,
  y: 20,
  duration: 1.4,
  ease: "power2.out",
  delay: 0.2
});

gsap.from(".about-img", {
  opacity: 0,
  x: 50,
  duration: 1.4,
  ease: "power2.out",
  delay: 0.4
});



  // Resume button
  gsap.from(".resume-btn", {
    opacity:1,
    y:20,
    duration:1,
    ease:"power2.out",
    delay:1.4
  });

  // Scroll reveal
  gsap.utils.toArray('.reveal').forEach(el=>{
    gsap.from(el,{
      opacity:0,
      y:30,
      duration:1,
      ease:'power2.out',
      scrollTrigger:{
        trigger:el,
        start:'top 80%',
        toggleActions:'play none none none'
      }
    });
  });
});

// ---------- NAV SMOOTH SCROLL ----------
document.querySelectorAll('.navbar a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const target=document.querySelector(link.getAttribute('href'));
    window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  });
});

// Highlight active section
const sections=document.querySelectorAll('section');
const navLinks=document.querySelectorAll('.navbar a');

window.addEventListener('scroll', ()=>{
  let scrollPos = window.scrollY + window.innerHeight/2;
  sections.forEach((sec, index)=>{
    if(scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop+sec.offsetHeight){
      navLinks.forEach(link=>link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
});


