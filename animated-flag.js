// All credits to Josh Comeau for the original idea and implementation.
// See: https://www.joshwcomeau.com/animation/pride-flags/
//
// As well as to Danny Engelman for turning Josh's React implementation into a web component!
// See: https://dev.to/dannyengelman/web-component-19dl
//
// I just expanded the implementation to take a color bitmap as input.

customElements.define(
  "animated-flag",
  class extends HTMLElement {
    static get observedAttributes() {
      return ["delay", "billow", "speed"];
    }

    /**
     * @param {number[][][]} HSLcolorMap - Bitmap representation of the flag.
     */
    connectedCallback(
      // set HSLcolorMap default value (Minecraft Creeper)
      HSLcolorMap = [
        [
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [0, 0, 20],
          [0, 0, 20],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [0, 0, 20],
          [0, 0, 20],
          [138, 68, 41],
          [0, 0, 20],
          [0, 0, 20],
          [0, 0, 20],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [0, 0, 20],
          [0, 0, 20],
          [0, 0, 20],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [0, 0, 20],
          [0, 0, 20],
          [0, 0, 20],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [0, 0, 20],
          [0, 0, 20],
          [138, 68, 41],
          [0, 0, 20],
          [0, 0, 20],
          [0, 0, 20],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [0, 0, 20],
          [0, 0, 20],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [138, 68, 41],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
        ],
        [
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
          [139, 39, 32],
        ],
      ]
    ) {
      this.HSLcolorMap = HSLcolorMap;
      this.attachShadow({ mode: "open" }); // create shadowRoot so multiple instances can be used on the same page
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      // do not render when the element is not connected to the DOM YET (attributeChangedCallback is called before connectedCallback!!)
      if (this.isConnected) this.render();
    }

    render() {
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.append(...this.flag());
    }

    flag() {
      let createElement = ({
        create = "div", // default element is a <div>
        append = [], // append array of child elements
        styles = {}, // optional styles
        classes = "", // optional classnames
        ...props // all remaing properties; innerHTML, id, title, etc.
      }) => {
        Object.assign((create = document.createElement(create)), props).append(
          ...append
        );
        Object.assign(create.style, styles);
        create.className = classes;
        return create;
      };

      // parse HSL values into CSS color strings
      let colorMap = this.HSLcolorMap.map((col) =>
        col.map(
          ([angle, saturation, lightness]) =>
            `hsl(${angle}deg ${saturation}% ${lightness}%)`
        )
      );

      // calculate number of columns based on the number of arrays in colorMap
      let columns = colorMap.length;

      /**
       * Gets and parses an HTML attribute value.
       *
       * @param {string} name - Attribute name
       * @param {number} defaultValue - Default value if attribute is not set
       * @returns
       */
      let parseAttribute = (name, defaultValue) =>
        parseFloat(this.getAttribute(name) || defaultValue);

      // parse attribute values
      this.delay = parseAttribute(
        "delay",
        ~~((columns * 10) / Math.pow(2, columns / 10 - 1))
      );
      this.billow = parseAttribute("billow", 10) / 10;
      this.speed = parseAttribute("speed", 600);

      // return DOM elements array
      return [
        createElement({
          create: "STYLE",
          innerHTML: `
                    :1host { display:inline-block; width: 100px}
                    @keyframes oscillate {
                        from {transform:translateY(var(--billow,2))}to{transform:translateY(calc(var(--billow,2)*-1))}
                    }
                    .flag {display:flex;aspect-ratio:3/2}
                    .column{flex:1;display:flex;flex-direction:column;animation:oscillate ${this.speed}ms alternate infinite ease-in-out both}
                    .column:first-child{border-top-left-radius:8px;border-bottom-left-radius:8px}
                    .column:last-child{border-top-right-radius:8px;border-bottom-right-radius:8px}`,
        }),

        createElement({
          classes: "flag",
          append: Array(columns)
            .fill()
            .map((_, columnIndex) => {
              let el = createElement({
                classes: "column",
                styles: {
                  background: `linear-gradient(to bottom,${colorMap[columnIndex]
                    .map(
                      (color, index) =>
                        `${color} ${(index * 100) / colorMap[0].length}% ${
                          ((index + 1) * 100) / colorMap[0].length
                        }%`
                    )
                    .join(",")})`,
                  animationDelay:
                    -columns * this.delay + columnIndex * this.delay + "ms",
                },
              });

              el.style.setProperty(
                "--billow",
                columnIndex * this.billow + "px"
              );

              return el;
            }),
        }),
      ];
    }
  }
);
