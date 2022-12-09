# web-map



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type      | Default     |
| ----------- | ----------- | ----------- | --------- | ----------- |
| `address`   | `address`   |             | `string`  | `undefined` |
| `basemap`   | `basemap`   |             | `string`  | `undefined` |
| `center`    | `center`    |             | `string`  | `undefined` |
| `height`    | `height`    |             | `string`  | `"300px"`   |
| `layerlist` | `layerlist` |             | `boolean` | `false`     |
| `legend`    | `legend`    |             | `boolean` | `false`     |
| `mapId`     | `map-id`    |             | `string`  | `undefined` |
| `navigate`  | `navigate`  |             | `boolean` | `true`      |
| `popup`     | `popup`     |             | `boolean` | `true`      |
| `sceneId`   | `scene-id`  |             | `string`  | `undefined` |
| `search`    | `search`    |             | `boolean` | `false`     |
| `width`     | `width`     |             | `string`  | `"100%"`    |
| `zoom`      | `zoom`      |             | `number`  | `undefined` |


## Methods

### `geocodeAddress(view: __esri.MapView, address: any, zoom: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `loadLayerList(view: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `loadLegend(view: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `loadMap(basemap: string) => Promise<__esri.MapView>`



#### Returns

Type: `Promise<MapView>`



### `loadSearch(view: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `loadWebMap(id: any) => Promise<__esri.MapView>`



#### Returns

Type: `Promise<MapView>`



### `loadWebScene(id: any) => Promise<__esri.SceneView>`



#### Returns

Type: `Promise<SceneView>`



### `zoomTo(view: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
