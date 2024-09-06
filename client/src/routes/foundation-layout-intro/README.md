# Foundation Layout Intro

Using the foundation layout syntax you can create containers that can be resized, dragged and dropped by users in the UI.

```html
<rapid-layout 
  auto-save-key="how-to-ui-layout" 
  :dimensionsConfig=${(_) => ({
    borderWidth: 10,
    })
  }
>
  <rapid-layout-region type="vertical">
    <rapid-layout-region type="horizontal" size="33%">
        <rapid-layout-item title="First">
            <h2>First content</h2>
        </rapid-layout-item>
        <rapid-layout-item title="Second" registration="analysisCard">
            <h2>Second content</h2>
        </rapid-layout-item>
        <rapid-layout-item title="Third">
            <h2>Third content</h2>
        </rapid-layout-item>
      </rapid-layout-region>
    <rapid-layout-region type="horizontal" size="67%">
        <rapid-layout-item title="Fourth">
            <h2>Fifth content</h2>
        </rapid-layout-item>
        <rapid-layout-item title="Fifth">
            <h2>Sixth content</h2>
        </rapid-layout-item>
    </rapid-layout-region>
  </rapid-layout-region>
</rapid-layout>
```


# Layout element

The top level element is `rapid-layout` which can contain a number of `rapid-layout-region` elements. 

You can set the `auto-save-key` to a string to persist layout resizing changes after browser refresh. 

# Layout Region element

A `rapid-layout-region` creates a subsection of the parent element. Space will be divided among `rapid-layout-region` siblings evenly, unless the `size` attribute is set. This can be overridden by setting the `size` property on the element.

The `type` value can set to `vertical` or `horizontal`. Vertical stacks sibling elements in on top of each other and horizontal arranges them side by side.

You even can have multiple `rapid-layout-region` elements as children of `rapid-layout-region` if you want multiple sub divisions in your layout.

# Layout Item element

You use the `rapid-layout-item` element to slot your content into the `layout-region-element`. Only one `rapid-layout-item` can be active in a `rapid-layout-region` at one time. You can set the `title` property for each item.

# Implementation

In this example we divide our screen vertically into two regions. Each child region is divided horizontally. The first has three child regions and the second has two child regions.

There is no limit to the number of containers you can create - only the practical one of space on the screen. The containers can all be resized, dragged and dropped by users in the UI. You can add any number of regions divided vertically or horizontally to suit your needs. It is best to experiment for yourself to see what works best.
