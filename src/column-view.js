import { LitElement, html, css } from "lit";

class ColumnView extends LitElement {
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
        <drop-zone type="${this.data.type}" class="column" parentId="${this.data.id}" .highlightDrop=${false} .allowedTypes=${this.data.allowedTypes}>
            <slot></slot>
        </drop-zone>
        `;
    }
}
customElements.define('column-view', ColumnView);