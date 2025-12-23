// ES module: export tree data and a small renderer
export const smallTree = [
  "        *        ",
  "       .o.       ",
  "      ..o..      ",
  "     .o...o.     ",
  "    ..o.o.o..    ",
  "   .o..o..o..o.  ",
  "  ..o.o.o.o.o.o. ",
  " ............... ",
  "        ||       ",
  "        ||       ",
];

export const largeTree = [
  "             *             ",
  "            .o.            ",
  "           ..o..           ",
  "          .o...o.          ",
  "         ..o.o.o..         ",
  "        .o..o..o..o.       ",
  "       ..o.o.o.o.o.o..     ",
  "      .o..o..o..o..o..o.   ",
  "     ..o.o.o.o.o.o.o.o.o..  ",
  "    .o..o..o..o..o..o..o.. ",
  "   ..o.o.o.o.o.o.o.o.o.o.o.",
  "  ......................... ",
  "            |||||           ",
  "            |||||           ",
];

/**
 * Render the ASCII tree into a container element.
 * @param {HTMLElement} container
 * @param {object} options
 * @param {string} options.className - class to set on the generated <pre>
 */
export function renderTree(container = document.body, options = {}) {
  if (!container) return null;
  const data = options.data || smallTree;

  // clear container so re-render replaces existing tree
  container.innerHTML = "";

  // wrapper so we can place a star above the ASCII art
  const wrapper = document.createElement("div");
  wrapper.className = options.wrapperClass || "tree-wrapper";

  const starEl = document.createElement("div");
  starEl.className = "tree-star";
  starEl.textContent = "★";

  const pre = document.createElement("pre");
  pre.className = options.className || "ascii-tree";
  // preserve spacing and allow CSS styling per-character
  data.forEach((line) => {
    const lineNode = document.createElement("div");
    // simple parsing: wrap 'o' (lights) with span.light for easier styling/animation
    for (const ch of line) {
      const span = document.createElement("span");
      if (ch === "o" || ch === "O") {
        span.className = "light";
        span.textContent = "o";
      } else if (ch === "*") {
        span.className = "star";
        span.textContent = "*";
      } else if (ch === "|") {
        span.className = "trunk";
        span.textContent = "|";
      } else if (ch === ".") {
        span.className = "dot";
        span.textContent = ".";
      } else {
        span.textContent = ch;
      }
      lineNode.appendChild(span);
    }
    pre.appendChild(lineNode);
  });

  // insert star and pre into wrapper, then append
  wrapper.appendChild(starEl);
  wrapper.appendChild(pre);
  container.appendChild(wrapper);
  return { wrapper, pre, starEl };
}

/**
 * Render a CSS-styled 'fancy' tree (not ASCII) into the container.
 * options.size: 'small' | 'large'
 */
export function renderFancyTree(container = document.body, options = {}) {
  if (!container) return null;
  const size = options.size === "large" ? "large" : "small";
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "fancy-wrapper";

  // star
  const star = document.createElement("div");
  star.className = "fancy-star";
  star.textContent = "★";
  wrapper.appendChild(star);

  // determine layer count
  const layers = size === "large" ? 7 : 4;
  for (let i = 0; i < layers; i++) {
    const layer = document.createElement("div");
    layer.className = "fancy-layer";
    // width decreases each layer
    const w = 100 - i * (60 / layers);
    layer.style.width = w + "%";
    layer.style.zIndex = 100 - i;
    layer.style.transform = `translateY(${i * -6}px)`;

    // add some ornaments
    const ornamentCount = size === "large" ? 6 : 3;
    for (let j = 0; j < ornamentCount; j++) {
      const o = document.createElement("span");
      o.className = "fancy-ornament";
      const left = 10 + Math.random() * 80;
      const top = 20 + Math.random() * 60;
      const hue = 10 + Math.floor(Math.random() * 160);
      o.style.left = left + "%";
      o.style.top = top + "%";
      o.style.background = `hsl(${hue} 90% 60%)`;
      layer.appendChild(o);
    }

    wrapper.appendChild(layer);
  }

  // trunk
  const trunk = document.createElement("div");
  trunk.className = "fancy-trunk";
  wrapper.appendChild(trunk);

  container.appendChild(wrapper);
  return { wrapper, star };
}

// expose a quick helper for debugging when module loaded in console
export function logTree(which = "small") {
  const data = which === "large" ? largeTree : smallTree;
  data.forEach((l) => console.log(l));
}
