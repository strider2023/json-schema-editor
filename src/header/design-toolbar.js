import { LitElement, html, css } from "lit";
import { DESIGN_TOOLBAR_EVENTS } from "../constants/events.constants";

class DesignToolbar extends LitElement {

  static properties = {
    header: { type: String }
  }

  constructor() {
    super();
    this.header = 'Editor'
  }

  publishPanelEvent (type) {
    console.log('click')
    const event = new CustomEvent(DESIGN_TOOLBAR_EVENTS.DESIGN_TOOLBAR_EVENT,
      {
        detail: { type: 'show-panel', panelType: type },
        bubbles: true,
        composed: true,
      });
    this.dispatchEvent(event);
  }

  render () {
    return html`
      <nord-header slot="header">
        <h1 class="n-typescale-l">${this.header}</h1>
        <nord-button-group slot="end" variant="spaced" aria-labelledby="label">
          <nord-button @click=${this.publishPanelEvent.bind(this, 'layouts')}>
            <nord-icon slot="start" name="interface-grid"></nord-icon>
            Layouts
          </nord-button>
          <nord-button>
            <nord-icon slot="start" name="text-indent-decrease"></nord-icon>
            Decrease indent
          </nord-button>
          <nord-dropdown size="s">
            <nord-button slot="toggle">Alignment</nord-button>
            <nord-dropdown-item>
              <nord-icon slot="start" name="text-left-align"></nord-icon>
              Align left
            </nord-dropdown-item>
            <nord-dropdown-item>
              <nord-icon slot="start" name="text-right-align"></nord-icon>
              Align right
            </nord-dropdown-item>
            <nord-dropdown-item>
              <nord-icon slot="start" name="text-center"></nord-icon>
              Align center
            </nord-dropdown-item>
            <nord-dropdown-item>
              <nord-icon slot="start" name="text-justified"></nord-icon>
              Align justified
            </nord-dropdown-item>
          </nord-dropdown>
          <nord-button @click=${this.publishPanelEvent.bind(this, 'fields')}>
            <nord-icon slot="start" name="text-list"></nord-icon>
            Fields
          </nord-button>
      </nord-button-group>
    </nord-header>`;
  }
}

customElements.define('design-toolbar', DesignToolbar);
