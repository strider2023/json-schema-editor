import { LitElement, html, css } from "lit";

class GroupView extends LitElement {
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
        <drag-zone .objectData=${this.data}>
            ${this.data.type} ${this.data.id}
            <drop-column .highlightDrop=${false} type="${this.data.type}" parentId="${this.data.id}" .allowedTypes=${this.data.allowedTypes}>
                <slot></slot>
            </drop-column>
        </drag-zone>
        `;
    }
}
customElements.define('group-view', GroupView);