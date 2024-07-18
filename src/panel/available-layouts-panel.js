import { LitElement, html } from 'lit'
import { Sortable } from 'sortablejs'
import { fieldsResolver } from './panel-fields.resolver';
import { PRODUCT_SCHEMA } from '../constants';

class AvailableLayoutsPanel extends LitElement {

  static properties = {
    layouts: { type: Array }
  }

  constructor() {
    super();
    this.layouts = [
      {
        name: 'Section',
        type: 'Single Column'
      },
      {
        name: 'Section',
        type: 'Two Column'
      }
    ]
  }

  firstUpdated () {
    super.firstUpdated()
    const layoutsList = this.shadowRoot.getElementById('items');
    const layoutsListSortable = Sortable.create(layoutsList, {
      group: {
        name: 'shared',
        pull: 'clone',
        put: false
      },
      animation: 150,
      ghostClass: 'ghost'
    });
  }

  render () {
    return html`
      <ul id="items">
        ${this.layouts.map((layout) =>
          html`<li>${layout.name}</li>`
        )}
      </ul>`
  }
}

customElements.define('available-layouts', AvailableLayoutsPanel);