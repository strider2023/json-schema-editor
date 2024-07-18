import { LitElement, html, css } from "lit";

class PageElement extends LitElement {
    static styles = css``;

    static properties = {
        data: { type: Object }
    };

    constructor() {
        super();
    }

    renderFieldType(data) {
        if (data.fieldType == 'input') {
            return html`
                    <nord-input label="${this.data.type} ${this.data.id}"></nord-input>
                `;
        }
        if (data.fieldType == 'button') {
            return html`
                    <nord-button>${this.data.type} ${this.data.id}</nord-button>
                `;
        }
        if (data.fieldType == 'checkbox') {
            return html`
                    <nord-checkbox label="${this.data.type} ${this.data.id}" value="Value"></nord-checkbox>
                `;
        }
        if (data.fieldType == 'datepicker') {
            return html`
                    <nord-date-picker label="${this.data.type} ${this.data.id}" value="2021-01-13"></nord-date-picker>
                `;
        }
    }

    render() {
        return html`${this.renderFieldType(this.data)}`;
    }
}
customElements.define('page-element', PageElement);