import { LitElement, html, css } from 'lit'

class PageDesignElement extends LitElement {

  static properties = {
    properties: { type: Object }
  }

  constructor() {
    super()
    this.properties = {}
  }

  firstUpdated () {
    super.firstUpdated()
  }

  renderComponent () {
    switch(this.properties.data.type.toLowerCase()) {
      case 'string':
        return html`<nord-input label="${this.properties.data.label ?? this.properties.name ?? ''}"></nord-input>`
      case 'number':
        return html`<nord-input label="${this.properties.data.label ?? this.properties.name ?? ''}"></nord-input>`
      case 'date-time':
        return html`<nord-date-picker label="${this.properties.data.label ?? this.properties.name ?? ''}" type="number"></nord-input>`
    }
  }

  render () {
    return html`
      <div>
        ${this.renderComponent()}
      </div>
    `;
  }
}

customElements.define('design-element', PageDesignElement);