import { LitElement, html } from 'lit'
import { Sortable } from 'sortablejs'
import { fieldsResolver } from './panel-fields.resolver';
import { PRODUCT_SCHEMA } from '../constants';

class AvailableFieldsPanel extends LitElement {

  static properties = {
    properties: { type: Array }
  }

  constructor() {
    super();
    this.properties = fieldsResolver(PRODUCT_SCHEMA, null)
  }

  firstUpdated () {
    super.firstUpdated()
    const propertiesList = this.shadowRoot.getElementById('items');
    const propertiesListSortable = Sortable.create(propertiesList, {
      group: {
        name: 'shared',
        pull: 'clone',
        put: false
      },
      animation: 150,
      ghostClass: 'ghost'
    });
  }

  connectedCallback () {
    super.connectedCallback()
  }

  render () {
    return html`
      <ul id="items">
        ${this.properties.map((property) =>
          html`<li>${property.property}</li>`
        )}
      </ul>`
  }
}

customElements.define('available-fields', AvailableFieldsPanel);