/* ==================================================
   HELPERS
================================================== */

function showViewerError(container, message) {
  if (!container) return;

  container.innerHTML = `
    <div class="viewer-error">
      <p>${message}</p>
    </div>
  `;
}

function fetchStructure(path) {
  return fetch(path).then((response) => {
    if (!response.ok) {
      throw new Error(`${path} — HTTP ${response.status}`);
    }

    return response.text();
  });
}

/* ==================================================
   ANIMATED PARTICLE BACKGROUND
================================================== */

function initializeParticles() {
  const canvas = document.getElementById("particles");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2 + 1
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }

      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        particle.r,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#00a99d";
      ctx.fill();

      for (
        let secondIndex = index + 1;
        secondIndex < particles.length;
        secondIndex++
      ) {
        const otherParticle = particles[secondIndex];

        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);

          ctx.strokeStyle =
            `rgba(0,169,157,${
              0.22 * (1 - distance / 130)
            })`;

          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  createParticles();
  animateParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}

/* ==================================================
   MAIN HERO PROTEIN — 1HVR
================================================== */

function initializeHeroProtein() {
  const container = document.getElementById("protein-viewer");

  if (!container) return;

  const viewer = $3Dmol.createViewer(container, {
    backgroundColor: "rgba(255,255,255,0)",
    antialias: true
  });

  fetchStructure("./assets/1HVR.pdb")
    .then((data) => {
      viewer.addModel(data, "pdb");
      viewer.setStyle({}, {});

      viewer.setStyle(
        { hetflag: false },
        {
          cartoon: {
            color: "teal",
            opacity: 0.95
          }
        }
      );

      viewer.addStyle(
        {
          hetflag: true,
          not: {
            resn: ["HOH", "WAT"]
          }
        },
        {
          stick: {
            colorscheme: "greenCarbon",
            radius: 0.22
          }
        }
      );

      viewer.zoomTo({ hetflag: false });
      viewer.zoom(0.9);
      viewer.render();
      viewer.spin("y", 0.6);

      window.setTimeout(() => {
        viewer.resize();
        viewer.render();
      }, 250);
    })
    .catch((error) => {
      console.error("Hero protein loading error:", error);

      showViewerError(
        container,
        "Main protein structure unavailable."
      );
    });
}

/* ==================================================
   HOME PROJECT — NUCLEOSOME
================================================== */

function initializeNucleosomeCard() {
  const container = document.getElementById(
    "home-nucleosome-viewer"
  );

  if (!container) return;

  const viewer = $3Dmol.createViewer(container, {
    backgroundColor: "rgba(255,255,255,0)",
    antialias: true
  });

  fetchStructure("./assets/nucleosome.pdb")
    .then((data) => {
      viewer.addModel(data, "pdb");
      viewer.setStyle({}, {});

      /* Histone proteins */
      viewer.setStyle(
        {
          resn: [
            "ALA", "ARG", "ASN", "ASP", "CYS",
            "GLN", "GLU", "GLY", "HIS", "ILE",
            "LEU", "LYS", "MET", "PHE", "PRO",
            "SER", "THR", "TRP", "TYR", "VAL"
          ]
        },
        {
          cartoon: {
            colorscheme: "chain",
            opacity: 0.97
          }
        }
      );

      /* DNA */
      viewer.addStyle(
        {
          resn: [
            "DA", "DT", "DG", "DC",
            "DA5", "DT5", "DG5", "DC5",
            "DA3", "DT3", "DG3", "DC3"
          ]
        },
        {
          cartoon: {
            color: "#7b8490",
            opacity: 0.9
          },
          stick: {
            color: "#a3abb4",
            radius: 0.08
          }
        }
      );

      viewer.zoomTo();
      viewer.zoom(0.72);
      viewer.render();
      viewer.spin("y", 0.25);

      window.setTimeout(() => {
        viewer.resize();
        viewer.render();
      }, 250);
    })
    .catch((error) => {
      console.error("Nucleosome loading error:", error);

      showViewerError(
        container,
        "Nucleosome structure unavailable."
      );
    });
}

/* ==================================================
   HOME PROJECT — BACE1
================================================== */

function initializeBace1Card() {
  const container = document.getElementById(
    "home-bace1-viewer"
  );

  if (!container) return;

  const viewer = $3Dmol.createViewer(container, {
    backgroundColor: "rgba(255,255,255,0)",
    antialias: true
  });

  fetchStructure("./assets/ai/bace1.pdb")
    .then((data) => {
      viewer.addModel(data, "pdb");
      viewer.setStyle({}, {});

      viewer.setStyle(
        { hetflag: false },
        {
          cartoon: {
            color: "#7255d9",
            opacity: 0.96
          }
        }
      );

      viewer.addStyle(
        {
          hetflag: true,
          not: {
            resn: ["HOH", "WAT"]
          }
        },
        {
          stick: {
            colorscheme: "greenCarbon",
            radius: 0.23
          },
          sphere: {
            scale: 0.18
          }
        }
      );

      viewer.zoomTo();
      viewer.zoom(0.78);
      viewer.render();
      viewer.spin("y", 0.3);

      window.setTimeout(() => {
        viewer.resize();
        viewer.render();
      }, 250);
    })
    .catch((error) => {
      console.error("BACE1 loading error:", error);

      showViewerError(
        container,
        "BACE1 structure unavailable."
      );
    });
}

/* ==================================================
   HOME PROJECT — DEXCHLORPHENIRAMINE
================================================== */

function initializeDexCard() {
  const container = document.getElementById(
    "home-dex-viewer"
  );

  if (!container) return;

  const viewer = $3Dmol.createViewer(container, {
    backgroundColor: "rgba(255,255,255,0)",
    antialias: true
  });

  fetchStructure(
    "./assets/formulation/dexchlorpheniramine.sdf"
  )
    .then((data) => {
      viewer.addModel(data, "sdf");

      viewer.setStyle(
        {},
        {
          stick: {
            colorscheme: "Jmol",
            radius: 0.2
          },
          sphere: {
            colorscheme: "Jmol",
            scale: 0.28
          }
        }
      );

      viewer.zoomTo();
      viewer.zoom(0.7);
      viewer.render();
      viewer.spin("y", 0.5);

      window.setTimeout(() => {
        viewer.resize();
        viewer.render();
      }, 250);
    })
    .catch((error) => {
      console.error(
        "Dexchlorpheniramine loading error:",
        error
      );

      showViewerError(
        container,
        "Molecular structure unavailable."
      );
    });
}

/* ==================================================
   PREVENT PROJECT LINKS WHILE ROTATING
================================================== */

function preventViewerLinkActivation() {
  const viewers = document.querySelectorAll(
    ".project-3d-viewer"
  );

  viewers.forEach((viewer) => {
    [
      "click",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "pointerdown",
      "pointerup"
    ].forEach((eventName) => {
      viewer.addEventListener(eventName, (event) => {
        event.stopPropagation();
      });
    });
  });
}

/* ==================================================
   FLIP TOOLKIT CARDS
================================================== */

function initializeFlipCards() {
  const cards = document.querySelectorAll(
    ".flip-tool-card"
  );

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });

    card.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        card.classList.toggle("is-flipped");
      }
    });
  });
}

/* ==================================================
   INITIALIZE EVERYTHING
================================================== */

window.addEventListener("load", () => {
  if (typeof $3Dmol === "undefined") {
    console.error(
      "3Dmol.js is not loaded. Check the script tag in index.html."
    );

    return;
  }

  initializeParticles();
  initializeHeroProtein();

  initializeNucleosomeCard();
  initializeBace1Card();
  initializeDexCard();

  preventViewerLinkActivation();
  initializeFlipCards();
});
