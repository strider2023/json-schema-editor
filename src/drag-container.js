import { LitElement, html, css } from "lit";
import { v4 as uuidv4 } from 'uuid';
import { EVENTS } from "./utils/dnd-events";

class DragContainer extends LitElement {
  static styles = css`
      :host {
        display: block;
        padding: 10px;
        min-width: 240px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      }
    `;

  static properties = {
    children: { type: Object }
  };

  constructor() {
    super();
    this.id = uuidv4();
    this.children = [
      {
        id: "section-1", type: "section-block", from: this.id,
        items: [
          {
            id: "section-1-1", type: "column", from: this.id, allowedTypes: ["group", "object"],
            items: []
          },
          {
            id: "section-1-2", type: "column", from: this.id, allowedTypes: ["group", "object"],
            items: []
          }
        ]
      },
      {
        id: "section-2", type: "section-block", from: this.id,
        items: [
          {
            id: "section-2-1", type: "column", from: this.id, allowedTypes: ["group", "object"],
            items: []
          }
        ]
      },
      {
        id: "table-1", type: "table", from: this.id, allowedTypes: ["object"], items: []
      },
      { id: "1", type: "object", fieldType: "input", from: this.id },
      { id: "2", type: "object", fieldType: "input", from: this.id },
      { id: "3", type: "object", fieldType: "datepicker", from: this.id },
      { id: "4", type: "object", fieldType: "checkbox", from: this.id },
      { id: '5', type: "object", fieldType: "button", from: this.id },
      {
        id: '6', type: "group", from: this.id, allowedTypes: ["group", "group-object-6"],
        items: [
          { id: "6-1", type: "group-object-6", fieldType: "input", from: '6' },
          { id: "6-2", type: "group-object-6", fieldType: "checkbox", from: '6' }
        ]
      },
      {
        id: '7', type: "group", from: this.id, allowedTypes: ["group-object-7"],
        items: [
          { id: "7-1", type: "group-object-7", fieldType: "input", from: '7' },
          { id: "7-2", type: "group-object-7", fieldType: "datepicker", from: '7' },
          { id: "7-3", type: "group-object-7", fieldType: "checkbox", from: '7' }
        ]
      }
    ];
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
    const data = event.detail;
    if (data.parent == this.id) {
      this.children = this.children.filter(item => item.id !== data.id);
    }
  }

  render() {
    return html`
      <div>
      <slot></slot>
      ${this.children.map((data) =>
        html`<drag-item .objectData=${data}>${data.type} ${data.id}</drag-item>`
      )}
      </div>`;
  }
}
customElements.define('drag-container', DragContainer);
