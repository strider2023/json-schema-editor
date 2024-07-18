import { LitElement, html, css } from "lit";

class SectionView extends LitElement {
    static styles = css`
        .section {
            display: flex;
            flex-direction: row;
            padding: 10px 5px;
            gap: 5px;
            height: 100%;
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
            <p>${this.data.type} ${this.data.id}</p>
            <div class="section">
                <slot></slot>
            </div>
        </drag-item>
        `;
    }
}
customElements.define('section-view', SectionView);