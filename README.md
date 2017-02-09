# One Way OpenLayers

One Way OpenLayers is a JavaScript library for rendering maps with a one way data flow.

- **Declarative:** One Way OpenLayers makes it easy to create interactive maps. Declare the state of the map as a JavaScript object and One Way OpenLayers will efficiently update and render just the right components when your data changes.
- **Unidirectional data flow:** One Way OpenLayers evolves the "Data down, actions up" ideas of React. Declarative updates make your code more predictable, simpler to understand, and easier to debug.
- **API:** The data structure maps, as close as possible, to the OpenLayers API.

## Examples

We have several examples [in the examples folder](https://github.com/itjope/one-way-openlayers/tree/master/examples). Here is the first one to get you started:

```javascript
import OneWayOpenLayers from 'one-way-openlayers'

const map = OneWayOpenLayers({
  target: document.body
})

map.render({
  view: {
    center: [0, 0],
    zoom: 1
  },
  layers: [
    {
      type: 'Tile',
      visible: true,
      source: {
        type: 'XYZ',
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      }
    }
  ],
  events: {
    click: (e) => console.log(e.coordinate)
  }
})
```

This example will render a map with one tiled layer into a the body element and attach a click event to the ol.Map object.

## Installation

`npm install https://github.com/itjope/one-way-openlayers.git --save`

## Development

### Setup

- `git clone https://github.com/itjope/one-way-openlayers.git`
- `npm install`

### Run examples

- `npm start`

### Run tests

- `npm test`

### Type checking with Flow

- `npm run flow`
