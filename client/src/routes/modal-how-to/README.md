# Modal How To

In this example we demonstrate how you can use the foundation modal component in different ways.

You create a modal component the element to your template. The component, and any slotted content, will be invisible until the modal is opened.

When open, the modal will appear over all the content in your page. It will also create an invisible overlay that prevents interacting with any content outside the modal while it is active.

```html
<rapid-modal>
  ...
   Add your content here.
  ...
  
</rapid-modal>
```

## Basic modal

The basic modal is just a simple modal with a `<p></p>` tag for content. The `ref` directive is used to create a reference to the modal element.

```html
<rapid-button @click="${x => x.openModal()}">Open Modal</rapid-button>
...
<rapid-modal ${ref('modal')}>
  <p>
    This is a modal. You can slot any content you want in here.
  </p>
</rapid-modal>
...
```

In the click handler for the button the `show` method is called on the modal instance which shows the modal.

```ts
openModal(): void {
  this.modal.show();
}
```

## Positioning modal left and right

By default modals are positioned in the center but they can be configured to show on the left or right using the `position` property..

```html
<rapid-modal ${ref('modalLeft')} position="left">
  <p>
    This is a modal. It is positioned to the left.
  </p>
</rapid-modal>
<rapid-modal ${ref('modalRight')} position="right">
  <p>
    This is a modal. It is positioned to the right.
  </p>
</rapid-modal>
```

## Hiding close button

By default modals have a close button in the header. This can be hidden by setting the `show-close-icon` to be **false**.

```html
<rapid-modal show-close-icon="false" ${ref('modalWithForm')}>
  <foundation-form
    @submit="${x => x.handleModalFormSubmit()}"
    :jsonSchema="${() => formSchema}">
  </foundation-form>
</rapid-modal>
```

In this case the user is required to complete the form before the modal is closed. When the form is submitted the handler calls the close method on the `modalWithForm`.

```ts
handleModalFormSubmit(): void {
  this.modalWithForm.close();
}
```

## Modal on open and closed callbacks

Modals can be configured with show and close callbacks. In this case, the app only retrieves the data only when the `modalWithCallbacks` is shown.

```html
<rapid-modal ${ref('modalWithCallbacks')}
             :onShowCallback="${x => () => x.modalOpenCallback() }"
             :onCloseCallback="${x => () => x.modalClosedCallback()}"
>
  ${whenElse(
    x => !!x.entities,
    html<ModalHowTo>`
      <ul class="entities-list">
      ${repeat(x => x.entities, html`
        <li>${x => x.ENTITY_NAME}</li>
      `)}
      </ul>
    `,
    html<ModalHowTo>`
      <div class="loading-spinner-container">
        <rapid-progress-ring></rapid-progress-ring>
        Loading entities...
      </div>
    `
  )}
</rapid-modal>
```

In the open callback we use call `connect.snapshot` to retrieve a list of entities from the backend. Note, there is a set timeout to simulate a loading delay.

On close, the list of entities is cleared.

```ts
...
async modalOpenCallback(): Promise<void> {
  setTimeout(async () => {
    const response = await this.connect.snapshot('ALL_ENTITYS');
    this.entities = response.ROW;
  }, 2000)
}

modalClosedCallback(): void {
  this.entities = null;
}
...
```

## Modal top and bottom slots.

Modals have two named slots - `top` and `bottom`. In this case we use them to slot a header for the modal at the top and a footer at the bottom.

```html
<rapid-modal ${ref('modalWithSlots')}>
  <h3 slot="top">Top slot header</h3>
  <p>
    This is a modal. It is positioned to the right.
  </p>
  <div slot="bottom" style="font-size: 10px">
    <i>Slotted content in the bottom</i>
  </div>
</rapid-modal>
```

The `top` slot will appear inline with the close button at the top of the modal. A good use for this is a modal title/header.

The `bottom` slot will appear at the bottom of your modal. A good use for this is some footer content or a set of buttons.
