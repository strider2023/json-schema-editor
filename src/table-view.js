import { LitElement, html, css } from "lit";
import { EVENTS } from "./utils/dnd-events";
import { createGrid } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-quartz.min.css';

class TableView extends LitElement {
    static styles = css`
        .section {
            display: flex;
            flex-direction: row;
            flex-grow: 1;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }
          
        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
    `;

    static properties = {
        data: { type: Object },
        gridOptions: { type: Object },
        apiGrid: { type: Object }
    };

    constructor() {
        super();
        this.gridOptions = { rowData: [], columnDefs: [] };
    }

    connectedCallback() {
        super.connectedCallback();
        if (this.data.items && this.data.items.length > 0) {
            for (const d of this.data.items) {
                this.gridOptions.columnDefs.push({ field: d.type + "-" + d.id });
            }
            this.apiGrid = createGrid(
                this.shadowRoot.querySelector("#myGrid"),
                this.gridOptions,
            );
        }
        document.addEventListener(EVENTS.DRAG_DROPPED, this.handleDropEvent.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener(EVENTS.DRAG_DROPPED, this.handleDropEvent);
    }

    handleDropEvent(event) {
        const data = event.detail;
        if (data.from == this.data.id) {
            this.gridOptions.columnDefs.push({ field: data.type + "-" + data.id });
            if (this.gridOptions.columnDefs.length > 0) {
                if (!this.apiGrid) {
                    this.apiGrid = createGrid(
                        this.shadowRoot.querySelector("#myGrid"),
                        this.gridOptions,
                    );
                } else {
                    this.apiGrid.updateGridOptions(this.gridOptions);
                }
            }
        }
    }

    render() {
        return html`
        <drag-item .objectData=${this.data}>
            <link href="/node_modules/ag-grid-community/styles/ag-grid.min.css" rel="stylesheet">
            <link href="/node_modules/ag-grid-community/styles/ag-theme-quartz.min.css" rel="stylesheet">
            <p>${this.data.type} ${this.data.id}</p>
            <drop-zone
                type="${this.data.type}" 
                direction="row" 
                parentId="${this.data.id}" 
                .highlightDrop=${false} 
                .allowedTypes=${this.data.allowedTypes}>
                <div id="myGrid" class="ag-theme-quartz" style="width: 100%; height: 150px; ${this.gridOptions.columnDefs.length == 0 ? "display:none;" : "display:block;"}"></div>
                <p style="${this.gridOptions.columnDefs.length > 0 ? "display:none;" : "display:block;"}">Add a Object to the Table</p>
            </drop-zone>
        </drag-item>
        `;
    }
}
customElements.define('table-view', TableView);