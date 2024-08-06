import { LitElement, html, css } from "lit";
import { EVENTS } from "./utils/dnd-events";

class BaseView extends LitElement {
    static styles = css`
      :host {
        display: flex;
        flex-direction: column;
        padding: 5px;
      }

      .section {
            display: flex;
            flex-direction: row;
            padding: 10px 5px;
            gap: 5px;
        }

      .column {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
    `;

    static properties = {
        items: { type: Object },
        sections: { type: Number }
    };

    constructor() {
        super();
        this.items = { id: "top-parent", type: "column", from: '', allowedTypes: ["section-block", "table"], items: [] }
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener(EVENTS.DRAG_DROPPED, this.handleDropEvent.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener(EVENTS.DRAG_DROPPED, this.handleDropEvent);
    }

    handleDropEvent(event) {
        // event.stopPropagation();
        const data = event.detail;
        const removed = this.removeItemById(this.items, data.id);
        const inserted = this.insertChildById(this.items, data.from, data);
        this.requestUpdate();
    }

    findObjectAndParentById(object, id) {
        if (object.id === id) {
            return { object, parent: null };
        }
        if (object.items && object.items.length > 0) {
            for (const child of object.items) {
                const result = this.findObjectAndParentById(child, id);
                if (result.object) {
                    return { object: result.object, parent: object };
                }
            }
        }

        return { object: null, parent: null };
    }

    removeItemById(object, id) {
        if (object.id === id) {
            return null;
        }

        if (object.items && object.items.length > 0) {
            object.items = object.items.map(child => {
                const removedChild = this.removeItemById(child, id);
                if (removedChild === null) {
                    return null;
                }
                return removedChild;
            }).filter(child => child !== null);
        }

        // Return the modified object
        return object;
    }

    insertChildById(object, id, newChild) {
        const { object: parentObject, parent } = this.findObjectAndParentById(object, id);

        if (parentObject) {
            if (!parentObject.items) {
                parentObject.items = [];
            }
            if (!parentObject.items.find(obj => obj.id === newChild.id)) {
                parentObject.items.push(newChild);
            }
            return true;
        }

        return false;
    }

    renderType(data) {
        if (data.type == 'object' || data.type.includes('group-object')) {
            return html`
                    <page-design-element .data=${data}>
                    </page-design-element>
                `;
        }
        if (data.type == 'group') {
            return html`
                <group-view class="column" .data=${data}>
                    ${data.items && data.items.length > 0 ? html`
                    ${data.items.map(child => this.renderType(child))}
                    ` : html`<p>Drop a Group Object</p>`}
                </group-view>`;
        }
        if (data.type == 'section-block') {
            return html`
                <section-view .data=${data}>
                    ${data.items && data.items.length > 0 ? html`
                    ${data.items.map(child => this.renderType(child))}
                    ` : html`<p>No Columns</p>`}
                </section-view>`;
        }
        if (data.type == 'column') {
            return html`
                <column-view class="column" .data=${data}>
                    ${data.items && data.items.length > 0 ? html`
                    ${data.items.map(child => this.renderType(child))}
                    ` : html`<p>Add a Group/Object</p>`}
                 </column-view>`;
        }
        if (data.type == 'table') {
            return html`
                <table-view .data=${data}>
                </table-view>`;
        }
    }

    render() {
        return html`
        <design-toolbar></design-toolbar>
        ${this.renderType(this.items)}`;
    }
}
customElements.define('base-view', BaseView);