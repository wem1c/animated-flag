customElements.define('flag-configurator', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
            .innerHTML = `
            <style>
                #flag{ margin:2em auto; width:300px }
                #flags{
                    display:grid; grid: 1fr/repeat(3, 1fr); gap:1em;
                    margin:1em;
                    font-size:small; text-align:center;
                }
                #presets { text-align:center; margin:0em 0 0em 0}
                #flags,button,input{ cursor:pointer}
            </style>
            <div id="flag"><pride-flag></pride-flag></div>
            <div id="flags">
                ${["pride-flag", "pride-pan-flag", "pride-trans-flag"]
                .map(tag => {
                    return `<div><h4>&lt;${tag}></h4><${tag}  speed=2000 billow=1 ></${tag}></div>`
                }).join('')
            }
            </div>
            <h3>Presets:</h3>
            <div id="presets">
                <button preset="10,100,300,10">10,100,300,10</button>
                <button preset="60,18,600,1">60,18,600,1</button>
                <button preset="200,20,1700,2">200,20,1700,2</button>
            </div>
            <br>
            <attribute-range id="columns" values="10-200"></attribute-range>
            <attribute-range id="delay" values="0-100"></attribute-range>
            <attribute-range id="speed" values="0-2000"></attribute-range>
            <attribute-range id="billow" values="0-10"></attribute-range>`;

        this.shadowRoot.querySelector('#presets').onclick = (event) => {
            this.setpreset(event.target.getAttribute('preset'));
        };
        this.shadowRoot.querySelector('#flags').onclick = (event) => {
            let tag = event.target.tagName.toLowerCase();
            this.flag.parentNode.innerHTML = `<${tag}></${tag}>`;
            this.setpreset(this.preset);
        };
    }
    get flag() {
        return this.shadowRoot.querySelector('#flag').firstChild;
    }
    setpreset(csv='60,18,600,1'){
        this.preset = csv;
        csv.split(',').forEach((value, index) => {
            this.shadowRoot.querySelector(`#${['columns', 'delay', 'speed', 'billow'][index]}`).value = value;
        });
    }
}
);
customElements.define('attribute-range', class extends HTMLElement {
    connectedCallback() {
        let [min, max] = this.getAttribute('values').split('-');
        this.innerHTML = `
        <label>
            <div id="attr_${this.id}">${this.id} (${min} - ${max}) : <span></span></div>
            <input type="range" min="${min}" max="${max}" style="width:380px">
        </label>`;
        this.oninput = (event) => this.value = event.target.value;
        this.value = this.flag[this.id];
    }
    get flag() {
        return document.querySelector("flag-configurator").flag;
    }
    get value() {
        return this.querySelector("input").value;
    }
    set value(value) {
        this.querySelector("input").value = value;
        this.querySelector("span").innerHTML = value;
        this.flag.setAttribute(this.id, value);
    }
});