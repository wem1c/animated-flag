customElements.define('pride-flag', class extends HTMLElement {
    static get observedAttributes() { return ['columns', 'delay', 'billow', 'speed']; }
    connectedCallback(HSLcolors = [[0, 0, 18], [30, 60, 30], [0, 90, 55], [30, 95, 65], [55, 90, 65], [100, 65, 45], [220, 80, 55], [265, 80, 50]]) {
        this.HSLcolors = HSLcolors;
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
            create = "div",// default element is a <div>
            append = [],// append array of child elements 
            styles = {},// optional styles
            classes = "", // optional classnames
            ...props // all remaing properties; innerHTML, id, title, etc.
        }) => {
            Object.assign(create = document.createElement(create), props).append(...append);
            Object.assign(create.style, styles);
            create.className = classes;
            return create
        };
        let colors = this.HSLcolors.map(([angle, saturation, lightness]) => `hsl(${angle}deg ${saturation}% ${lightness}%)`);
        // HTML attributes
        let attribute = (name, defaultValue) => parseFloat(this.getAttribute(name) || defaultValue);
        this.columns = attribute('columns', 60);
        this.delay = attribute('delay', ~~((this.columns * 10) / Math.pow(2, this.columns / 10 - 1)));
        this.billow = attribute('billow', 10) / 10;
        this.speed = attribute('speed', 600);
        // return DOM elements array
        return [createElement({
            create: "STYLE",
            innerHTML: `
                    :1host { display:inline-block; width: 100px}
                    @keyframes oscillate {
                        from {transform:translateY(var(--billow,2))}to{transform:translateY(calc(var(--billow,2)*-1))}
                    }
                    .flag {display:flex;aspect-ratio:3/2}
                    .column{flex:1;display:flex;flex-direction:column;animation:oscillate ${this.speed}ms alternate infinite ease-in-out both}
                    .column:first-child{border-top-left-radius:8px;border-bottom-left-radius:8px}
                    .column:last-child{border-top-right-radius:8px;border-bottom-right-radius:8px}`
        }),// createElement
        createElement({
            classes: "flag",
            append: Array(this.columns).fill().map((_, columnIndex) => {
                let el = createElement({
                    classes: "column",
                    styles: {
                        background: `linear-gradient(to bottom,${colors.map((color, index) =>
                            `${color} ${index * 100 / colors.length}% ${(index + 1) * 100 / colors.length}%`
                        ).join(',')})`,
                        animationDelay: -this.columns * this.delay + columnIndex * this.delay + 'ms'
                    } // styles
                }) // element
                el.style.setProperty('--billow', columnIndex * this.billow + 'px');
                return el;
            }) // append
        }) // createElement
        ] // return
    }// flag
}); // customElements.define

customElements.define('pride-pan-flag', class extends customElements.get('pride-flag') {
    connectedCallback() {
        super.connectedCallback([[331, 100, 55], [50, 100, 50], [200, 100, 55]]);
    }
});
customElements.define('pride-trans-flag', class extends customElements.get('pride-flag') {
    connectedCallback() {
        super.connectedCallback([[200, 85, 70], [350, 85, 85], [0, 0, 100], [350, 85, 85], [200, 85, 70]]);
    }
});