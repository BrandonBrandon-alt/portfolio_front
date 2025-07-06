// src/components/particles-config.js
const particlesOptions = {
  background: {
    color: {
      value: "#050510",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "trail",
      },
      resize: true,
    },
    modes: {
      trail: {
        delay: 0.005,
        quantity: 2,
        pauseOnStop: true,
        particles: {
          color: {
            value: ["#0FF", "#F0F", "#0F0"],
          },
          collisions: {
            enable: false,
          },
          links: {
            enable: false,
          },
          move: {
            speed: 10,
            outModes: {
              default: "destroy",
            },
          },
        },
      },
    },
  },
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: ["#0FF", "#F0F", "#0F0"],
    },
    links: {
      enable: true,
      distance: 120,
      color: "#0FF",
      opacity: 0.4,
      width: 2,
      triangles: {
        enable: true,
        opacity: 0.1,
      },
    },
    collisions: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "bounce",
      },
    },
    opacity: {
      value: 0.7,
      anim: {
        enable: true,
        speed: 1.5,
        opacity_min: 0.3,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};

export default particlesOptions;
