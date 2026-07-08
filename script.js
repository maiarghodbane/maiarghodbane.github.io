const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 2 + 1
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#00a99d";
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(0,169,157,${0.22 * (1 - dist / 130)})`;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* 3D rotating protein */
/* 3D rotating protein */
let viewer = $3Dmol.createViewer("protein-viewer", {
  backgroundColor: "rgba(255,255,255,0)"
});

fetch("assets/protein.cif")
  .then(response => response.text())
  .then(data => {
    viewer.addModel(data, "cif");

    // Protein in cartoon/ribbon representation
    viewer.setStyle({protein: true}, {
      cartoon: {
        color: "teal",
        opacity: 0.95
      }
    });

    // Ligands only in sticks
    viewer.setStyle({hetflag: true, not: {resn: "HOH"}}, {
      stick: {
        colorscheme: "greenCarbon",
        radius: 0.22
      }
    });

    // Optional: remove surface if you don't like the blob effect
    // viewer.addSurface($3Dmol.SurfaceType.VDW, {
    //   opacity: 0.25,
    //   color: "white"
    // }, {protein: true});

    viewer.zoomTo();
    viewer.spin("y", 0.7);
    viewer.render();
  });
