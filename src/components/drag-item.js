import { LitElement, html, css } from "lit";
import { DNDEvents, EVENTS } from "../utils/dnd-events";

class DragItem extends LitElement {
    static styles = css`
      .base {
        display: block;
        flex-direction: row;
        margin: 15px 5px;
        padding: 10px;
        border-radius: 3px;
      }

      .select {
        border: 2px solid #22DD22;
        cursor: move;
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;

      }

      .select:active {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
      }

      .deselect {
        border: 0px solid #fff;
        cursor: pointer;
      }

      .default {
        background-color: #fff;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }

      .dragged {
        background-color: #aaa;
      }
    `;

    static properties = {
        select: { type: Boolean },
        dragged: { type: Boolean },
        objectData: { type: Object }
    };

    constructor() {
        super();
        this.select = false;
        this.dragged = false;
        this.events = new DNDEvents(this);
    }

    connectedCallback() {
        super.connectedCallback();
        // console.log(this.objectData);
        document.addEventListener(EVENTS.DRAG_ITEM_SELECT, this.handleDragItemSelect.bind(this));
        document.addEventListener(EVENTS.DRAG_ITEM_UNSELECT, this.handleDragItemUnSelect.bind(this));
        // this.requestUpdate();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener(EVENTS.DRAG_ITEM_SELECT, this.handleDragItemSelect);
        document.removeEventListener(EVENTS.DRAG_ITEM_UNSELECT, this.handleDragItemUnSelect);
    }

    handleDragItemSelect(event) {
        const data = event.detail;
        if (data.id != this.objectData.id) {
            this.select = false;
        }
    }

    handleDragItemUnSelect(event) {
        this.select = false;
        this.requestUpdate();
    }

    handleDragEnd(event) {
        this.draggable = false;
    }

    handleDragStart(event) {
        event.stopPropagation();
        if (this.select) {
            this.dragged = true;
            event.dataTransfer.setData('text/plain', JSON.stringify({ ...this.objectData }));
            this.events.emitDragStart({ ...this.objectData });
            this.requestUpdate();
        } else {
            event.preventDefault();
        }
    }

    handleDragEnd(event) {
        event.stopPropagation();
        if (this.select) {
            this.dragged = false;
            this.select = false;
            event.dataTransfer.setData('text/plain', JSON.stringify({ ...this.objectData }));
            this.events.emitDragEnd({ ...this.objectData });
        } else {
            event.preventDefault();
        }
    }

    handleSelect(event) {
        event.stopPropagation();
        this.select = !this.select;
        if (this.select) {
            this.events.emitDragItemSelect({ id: this.objectData.id });
        } else {
            this.events.emitDragItemUnSelect({ id: this.objectData.id });
        }
    }

    render() {
        return html`
        <div class="base ${this.dragged ? 'dragged' : 'default'} ${this.select ? 'select' : 'deselect'}" 
        draggable="${this.select}"
        @click="${this.handleSelect}" 
        @dragstart="${this.handleDragStart}" 
        @dragend="${this.handleDragEnd}">
        <slot></slot>
        <div>
        `;
    }
}
customElements.define('drag-item', DragItem);