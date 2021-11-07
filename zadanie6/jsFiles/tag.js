const template = document.createElement('template');

template.innerHTML = `
<style>
        #cislo-vstup{
            width: 150px;
        }
        output{
        font-size: 24px;
        margin-bottom: 50px;
        }
</style>
 <label for="slider-input"></label><br>
 <input type="range" min="1" max="15" id="slider-input" value="1">
            
`
//console.log(document.getElementById('slider-input').previousElementSibling.value);

class VlastnySlider extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: "open"}) // aby sme mali pristup k dom v js
        this.shadowRoot.appendChild(template.content.cloneNode(true)); // aj jeho potomkovia sa naklonuju
    }

}


window.customElements.define("moj-slider", VlastnySlider);

