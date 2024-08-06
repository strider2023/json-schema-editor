import { LitElement, html, css } from 'lit'
import { Sortable } from 'sortablejs'
import { fieldsResolver } from './panel-fields.resolver';
import { PRODUCT_SCHEMA } from '../constants';

class AvailableFieldsPanel extends LitElement {

  static styles = css`
      .base {
        display: block;
        flex-direction: row;
        margin: 10px 0px;
        padding: 10px;
        border-radius: 3px;
        background-color: #fff;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 5px 0px;
      }
    `;

  static properties = {
    properties: { type: Array }
  }

  constructor() {
    super();
    this.properties = fieldsResolver(PRODUCT_SCHEMA, null)
  }

  firstUpdated () {
    super.firstUpdated()
    Sortable.create(this.shadowRoot.getElementById('items'), {
      group: {
        name: 'shared',
        pull: true,
        put: false
      },
      sort: false,
      animation: 150,
      ghostClass: 'ghost',
      setData: (dataTransfer, dragEl) => {
        dataTransfer.setData('fieldObject', dragEl.getAttribute('property-data'))
      }
    });
  }

  connectedCallback () {
    super.connectedCallback()
  }

  render () {
    return html`
      <div id="items">
        ${this.properties.map((property) =>
          html`
          <div property-data="${JSON.stringify(property)}" class="base">
            <h3>${property.name}</h3>
            <p>${property.type}</p>
          </div>`
        )}
      </div>`
  }
}

customElements.define('available-fields', AvailableFieldsPanel);