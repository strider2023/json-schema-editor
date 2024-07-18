import { LitElement, html, css } from 'lit'
import { DESIGN_TOOLBAR_EVENTS, PAGE_CONFIG } from '../constants'

class PageEditor extends LitElement {

  static styles = css`
      :host {
        width: 100%;
      }
      
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
    drawer: { type: Object },
    pageConfig: { type: Object }
  }

  constructor() {
    super()
    this.pageConfig = PAGE_CONFIG
  }

  connectedCallback () {
    super.connectedCallback()
    document.addEventListener(DESIGN_TOOLBAR_EVENTS.DESIGN_TOOLBAR_EVENT, (event) => { this.drawer = { ...event.detail }})
    document.addEventListener('close-drawer', () => {this.drawer = null})
  }

  render () {
    return html`
      <nord-layout>
        <design-toolbar slot="header" header="${this.pageConfig.metadata.title}"></design-toolbar>
        <nord-stack gap="l">
          <design-canvas .layout=${this.pageConfig.layout}></design-canvas>
        </nord-stack>
        ${this.drawer ? html`<side-panel slot="drawer" .panelType="${this.drawer.panelType}"/>` : html``}
      </nord-layout>
    `;
  }
}

customElements.define('page-editor', PageEditor);