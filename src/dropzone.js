import { LitElement, html, css } from "lit";
import { v4 as uuidv4 } from 'uuid';
import { DNDEvents, EVENTS } from "./utils/dnd-events";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Dropzone extends LitElement {
    static styles = css`
        .base {
            display: flex;
            border: 2px dashed #ccc;
            border-radius: 3px;
            padding: 10px;
            flex-grow: 1;
        }

        .accept {
            background-color: #90EE90;
        }

        .normal {
            background-color: #fff;
        }
    `;

    static properties = {
        direction: { type: String },
        highlightDrop: { type: Boolean },
        allowedTypes: { type: Array },
        parentId: { type: String },
        type: { type: String },
        onDrop: { type: Function }
    };

    constructor() {
        super();
        this.parentId = this.parentId ?? uuidv4();
        this.highlightDrop = false;
        this.events = new DNDEvents(this);
        this.direction = this.direction ?? 'column';
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener(EVENTS.DRAG_START, this.handleDragStart.bind(this));
        document.addEventListener(EVENTS.DRAG_END, this.handleDragEnd.bind(this));
        document.addEventListener(EVENTS.DRAG_DROPPED, this.handleDropEvent.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener(EVENTS.DRAG_START, this.handleDragStart);
        document.removeEventListener(EVENTS.DRAG_END, this.handleDragEnd);
        document.removeEventListener(EVENTS.DRAG_DROPPED, this.handleDropEvent);
    }

    handleDragStart(event) {
        const data = event.detail;
        if (this.allowedTypes.includes(data.type)) {
            this.highlightDrop = true;
        }
    }

    handleDragEnd(event) {
        this.highlightDrop = false;
        this.requestUpdate();
    }

    handleDropEvent(event) {
        this.highlightDrop = false;
        this.requestUpdate();
    }

    handleDragEnter(event) {
        event.preventDefault();
    }

    handleDragLeave(event) {
        event.preventDefault();
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.highlightDrop = false;
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        if (this.allowedTypes.includes(data.type)) {
            const parent = data.from;
            data.from = this.parentId;
            this.events.emitDropEvent({ ...data, parent: parent });
        } else {
            Notify.failure('Incompatible type!');
        }
    }

    render() {
        return html`
            <div class="base ${this.highlightDrop ? 'accept' : 'normal'}"
                style="flex-direction:${this.direction}"
                @dragenter="${this.handleDragEnter}"
                @dragleave="${this.handleDragLeave}"
                @dragover="${this.handleDragOver}" 
                @drop="${this.handleDrop}">
                <slot></slot>
            </div>`;
    }
}
customElements.define('drop-zone', Dropzone);
