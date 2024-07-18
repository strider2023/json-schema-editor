import { LitElement, html } from 'lit';

class SidePanel extends LitElement {

  static properties = {
    header: { type: String },
    panelType: { type: String }
  }

  constructor() {
    super();
  }

  connectedCallback () {
    super.connectedCallback()
    switch (this.panelType) {
      case 'fields':
        this.header = 'Available Fields'
        break
      case 'layouts':
        this.header = 'Layouts'
        break
    }
  }

  renderPanelByType () {
    switch (this.panelType) {
      case 'fields':
        return html`<available-fields></available-fields>`
      case 'layouts':
        return html`<available-layouts></available-layouts>`
    }
  }

  closeDrawer () {
    const event = new CustomEvent('close-drawer',
      {
        detail: null,
        bubbles: true,
        composed: true,
      });
    this.dispatchEvent(event);
  }

  render () {
    return html`
      <nord-drawer slot="drawer">
        <nord-header slot="header">
          <h3 class="n-typescale-l n-truncate">${this.header}</h3>
          <nord-button slot="end" id="close" variant="plain" aria-describedby="close-sidebar" size="s" square @click=${this.closeDrawer.bind(this)}>
            <nord-icon name="interface-close" size="s"></nord-icon>
          </nord-button>
          <nord-tooltip id="close-sidebar">Close</nord-tooltip>
        </nord-header>
        <div class="n-typeset">
          ${this.renderPanelByType()}
        </div>
      </nord-drawer>`;
  }
}

customElements.define('side-panel', SidePanel);
