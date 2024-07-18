import { LitElement, html, css } from 'lit'
import { Sortable } from 'sortablejs'

class DesignCanvas extends LitElement {

  static styles = css`
      .base-canvas {
        min-height: 500px;
        --d: 2px;
        background : radial-gradient(
          circle at var(--d) var(--d), 
          #a1a1a1 calc(var(--d) - 1px), 
          #0000 var(--d)
        ) 
        0 0 / 45px 45px;
      }
    `;

  static properties = {
    layout: { type: Object }
  }

  constructor() {
    super()
    this.layout = []
  }

  firstUpdated () {
    super.firstUpdated()
    const baseCanvas = this.shadowRoot.getElementById('base-canvas');
    const baseCanvasSortable = Sortable.create(baseCanvas, {
      group: {
        name: 'shared'
      },
      animation: 150,
      onAdd: this.handleOnDesignEelemntAdd.bind(this)
    });
  }

  handleOnDesignEelemntAdd (event) {
    console.log(event.item)
  }

  render () {
    return html`
      <div id="base-canvas" class="base-canvas">
      </div>
    `;
  }
}

customElements.define('design-canvas', DesignCanvas);