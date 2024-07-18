import { LitElement, html, css } from "lit";

class PageDesignElement extends LitElement {
    static styles = css`
        .column {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
    `;

    static properties = {
        data: { type: Object }
    };

    constructor() {
        super();
    }

    render() {
        return html`
        <drag-item .objectData=${this.data}>
            <page-element .data=${this.data}></page-element>
        </drag-item>
        `;
    }
}
customElements.define('page-design-element', PageDesignElement);