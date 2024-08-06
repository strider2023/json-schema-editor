export class DNDEvents {

    constructor(htmlElement) {
        this.htmlElement = htmlElement;
    }

    emitDragStart(data) {
        const customEvent = new CustomEvent(EVENTS.DRAG_START, {
            bubbles: true,
            composed: true,
            detail: {...data}
        });
        this.htmlElement.dispatchEvent(customEvent);
    }

    emitDragEnd(data) {
        const customEvent = new CustomEvent(EVENTS.DRAG_END, {
            bubbles: true,
            composed: true,
            detail: data
        });
        this.htmlElement.dispatchEvent(customEvent);
    }

    emitDropEvent(data) {
        const customEvent = new CustomEvent(EVENTS.DRAG_DROPPED, {
            bubbles: true,
            composed: true,
            detail: {...data}
        });
        this.htmlElement.dispatchEvent(customEvent);
    }

    emitNotifyParent({ id }) {
        const customEvent = new CustomEvent(EVENTS.NOTIFY_PARENT, {
            bubbles: true,
            composed: true,
            detail: { id }
        });
        this.htmlElement.dispatchEvent(customEvent);
    }

    emitDragItemSelect({ id }) {
        const customEvent = new CustomEvent(EVENTS.DRAG_ITEM_SELECT, {
            bubbles: true,
            composed: true,
            detail: { id }
        });
        this.htmlElement.dispatchEvent(customEvent);
    }

    emitDragItemUnSelect({ id }) {
        const customEvent = new CustomEvent(EVENTS.DRAG_ITEM_UNSELECT, {
            bubbles: true,
            composed: true,
            detail: { id }
        });
        this.htmlElement.dispatchEvent(customEvent);
    }
}

export const EVENTS = Object.freeze({
    DRAG_START: "object-dragged",
    DRAG_END: "object-dragend",
    DRAG_DROPPED: "object-dropped",
    NOTIFY_PARENT: "notify-parent",
    DRAG_ITEM_SELECT: "drag-item-select",
    DRAG_ITEM_UNSELECT: "drag-item-unselect"
});