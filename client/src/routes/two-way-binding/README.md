# Two Way Binding

You can create bindings between html components in the template to set attributes and listen to events - including any custom events make yourself.

In this example we are going to create an app to demonstrate some common use cases. As part of this we are going to create three custom components. 

  - The `TwoWayBinding` component. Renders a list of items as `TwoWayBindingCard` elements. Provides each list item with the item value itself and a `boolean` active state and listens for `toggleActive` and `twoWayFormSubmitted` events.
  - The `TwoWayBindingCard` takes two inputs - `existingData` and `isActive`. If the card is active show the `TwoWayBindingForm` component, otherwise show the details with an edit button. When the edit button is clicked the parent emit the `toggleActive` event.
  - The `TwoWayBindingForm` takes one input - `existingData` which sets current data on the form. When submitted the `twoWayFormSubmitted` event is emitted.

## Listening to events

To create an event listener for event on an element, you prefix the name of the element with `@` character. So, `click` would be `@click` and a custom event, let's say `toggleActive`, emitted by a custom element would be listened to by `@toggleActive`.

In the **two-way-binding.template** file the template listens to `toggleActive` and `twoWayFormSubmitted` on the `TwoWayBindingCard` component. `twoWayFormSubmitted` is emitted by `TwoWayBindingForm` which is a child of `TwoWayBindingCard` and bubbles up so events do not need to be caught and re-emitted if passing through several parents.

```ts
export const twoWayBindingTemplate = html<TwoWayBinding>`
...
${repeat(x => x.items, html`

  <two-way-binding-card
    ...
    @toggleActive="${(x, c: ExecutionContext<TwoWayBinding>) => c.parent.toggleActive(x)}"
    @twoWayFormSubmitted="${(x, c: ExecutionContext<TwoWayBinding>) => c.parent.handleFormSubmitted(customEvent(c))}"
    ...
    >
  </two-way-binding-card>
  ...
`)}
`

```

These events are emitted by calling `this.$emit(...)` in the custom element.

In the event handler callback the first parameter is the event context and the execution context. The context `event` contains the emitted event. Note we are also calling the event handler within a repeat function so we need to refer to the `parent` of the context to call the handlers.

## Setting component attributes

You can set the properties of a component in two ways. For html attributes, they are just set in the template normally. For setting non html attributes on a custom element you need to prefix with a `:`

In this component we are setting the `is-active` and `currentValue` properties. `is-active` is a pure html property and is expecting a string. `currentValue` is a javascript object and needs to be prefixed with the `:` when setting via the template.

```ts
...
export class TwoWayBindingCard extends FoundationElement {

  @observable currentValue: TwoWayType;

  @attr({mode: 'boolean', attribute: 'is-active'}) isActive = false;
  ...
}
...
```

```ts
import { html } from '@genesislcap/web-core';

...
const sampleTemplate = html`
  ...
  ${repeat(x => x.items, html`
      <two-way-binding-card
        is-active="${(x, c: ExecutionContext<TwoWayBinding>) => x === c.parent.activeItem}"
        :currentValue="${x => x}"
        ...
      </two-way-binding-card>
   `)}
 `
...
```

### When to use simple html attributes

If the property you are setting on the custom element is a primitive value you can just use the `attr` directive in your component. Then to set the property value in the template like `is-active="true` (or a function that resolves to true like in the example)

### When to use objects 

If your value is a complex object you can use the `@observable` in your custom element class and set in the template prefixed with a colon like ` :currentValue="${x => x}"` 
