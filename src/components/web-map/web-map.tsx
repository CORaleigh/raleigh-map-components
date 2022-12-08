import { Component, Prop, h, Element, State } from '@stencil/core';
import { Host, HTMLStencilElement, Method, Watch } from '@stencil/core/internal';
import esriConfig from "@arcgis/core/config.js";


@Component({
  tag: 'web-map',
  styleUrl: 'web-map.css',
  shadow: false
})
export class WebMap {
  @Element() element: HTMLStencilElement;
  @State() divId:string = "";
  @Prop() mapId: string;
  @Prop() sceneId: string;
  @Prop() layerlist: boolean = false;
  @Prop() legend: boolean = false;
  @Prop() search: boolean = false;
  @Prop() popup: boolean = true;
  @Prop() navigate: boolean = true;
  @Prop() basemap: string;
  @Prop() center: string;
  @Prop() zoom: number;
  @Prop() address: string;
  @Prop() width: string = "100%";
  @Prop() height: string = "300px";
  private mapRef?: HTMLDivElement;

  view: any;
  navigationHandles = [];

  getRandomString = function() {
    var x = 2147483648;
    return Math.floor(Math.random() * x).toString(36) +
    Math.abs(Math.floor(Math.random() * x) ^ +new Date()).toString(36);
};   

@Watch('mapId')
mapIdChanged(newValue) {
  this.view = this.loadWebMap(newValue);
}
@Watch('sceneId')
sceneIdChanged(newValue) {
  this.view = this.loadWebScene(newValue);
}
@Watch('layerlist')
layerlistChanged(newValue) {
  newValue ? this.loadLayerList(this.view) : this.view.ui.remove('layerlist');
}
@Watch('legend')
legendChanged(newValue) {
  newValue ? this.loadLegend(this.view) : this.view.ui.remove('legend');
}
@Watch('search')
searchChanged(newValue) {
  newValue ? this.loadSearch(this.view) : this.view.ui.remove('search');
}
@Watch('popup')
popupChanged(newValue) {
  newValue ? this.view.popup.autoOpenEnabled = true : this.view.popup.autoOpenEnabled = false;
}
@Watch('zoom')
zoomChanged(newValue) {
  if (newValue) {
    this.view.zoom = newValue;
  }
}
@Watch('center')
centerChanged(newValue) {
  if (newValue) {
    this.zoomTo(this.view);
  }
}
@Watch('basemap')
basemapChanged(newValue) {
  if (newValue.length && this.view) {
    this.view.map.basemap = newValue;
  } else if (!this.view) {
    this.view = this.loadMap(this.basemap);
  }
}
@Watch('address')
addressChanged(newValue) {
  if (newValue.length) {
    this.geocodeAddress(this.view, newValue, this.zoom)
  }
}
@Watch('width')
widthChanged(newValue) {
  if (newValue.length) {
   this.mapRef.style.width = this.width;
  }
}
@Watch('height')
heightChanged(newValue) {
  if (newValue.length) {
    this.mapRef.style.height = this.height;
  }
}
@Watch('navigate')
navigateChange(newValue) {
  if (newValue) {
    this.restoreNavigation();
  } else {
    this.removeNavigation(this.view);
  }
}
@Method()
public async loadWebMap(id) {
  const [
      { default: WebMap },
      { default: MapView}
  ] = await Promise.all([
      await import(`@arcgis/core/WebMap`),
      await import('@arcgis/core/views/MapView')
  ]);
  const map = new WebMap({portalItem: { id: id }})
  return new MapView({map: map, container: this.mapRef });
}
@Method()
public async loadWebScene(id) {
  const [
      { default: WebScene },
      { default: SceneView}
  ] = await Promise.all([
      await import(`@arcgis/core/WebScene`),
      await import('@arcgis/core/views/SceneView')
  ]);
  const scene = new WebScene({portalItem: { id: id }})
  return new SceneView({map: scene, container: this.mapRef });
}
@Method()
public async loadMap(basemap: string) {
  const [
      { default: Map },
      { default: MapView}
  ] = await Promise.all([
      await import(`@arcgis/core/Map`),
      await import('@arcgis/core/views/MapView')
  ]);

  const map = new Map({basemap: basemap});
  return new MapView({map: map, container: this.mapRef });
}

@Method()
public async loadLayerList(view) {
  const [
      { default: LayerList },
      { default: Expand }
  ] = await Promise.all([
      await import(`@arcgis/core/widgets/LayerList`),
      await import(`@arcgis/core/widgets/Expand`)

  ]);
  const expand = new Expand({id: 'layerlist',view: view, content: new LayerList({container: document.createElement('div'), view: view}) });
  view.ui.add(expand ,'top-right');
}
@Method()
public async loadLegend(view) {
  const [
      { default: Legend },
      { default: Expand }
  ] = await Promise.all([
      await import(`@arcgis/core/widgets/Legend`),
      await import(`@arcgis/core/widgets/Expand`)

  ]);
  const expand = new Expand({id: 'legend', view: view, content: new Legend({container: document.createElement('div'), view: view}) });
  view.ui.add(expand ,'top-right');
}

@Method()
public async loadSearch(view) {
  const [
      { default: Search }
  ] = await Promise.all([
      await import(`@arcgis/core/widgets/Search`)

  ]);
  const search = new Search({id: 'search', container: document.createElement('div'), view: view});
  view.ui.add(search ,'top-left');
}
@Method()
public async zoomTo(view) {
  const [
      { default: Point }
  ] = await Promise.all([
      await import(`@arcgis/core/geometry/Point`)

  ]);
  view.goTo({center: new Point({longitude: parseFloat(this.center.split(',')[0]), latitude: parseFloat(this.center.split(',')[1]), spatialReference: {wkid: 4326}}), zoom: this.zoom})
}
@Method()
public async geocodeAddress(view, address, zoom) {
await Promise.all([
      await import(`@arcgis/core/rest/locator`).then(locator => {
        locator.addressToLocations('https://maps.raleighnc.gov/arcgis/rest/services/Locators/Locator/GeocodeServer',
        {address: {SingleLine: address}}).then(candidates => {
          view.goTo({target: candidates[0].location, zoom: zoom ? zoom : 16});
        })
      })

  ]);
}
public restoreNavigation() {
  this.navigationHandles.forEach(handle => {
    handle.remove();
  })
}
public removeNavigation(view) 
{
  this.navigationHandles = [
  (view as __esri.MapView).on("key-down", (event) => {
    const prohibitedKeys = ["+", "-", "Shift", "_", "="];
    const keyPressed = event.key;
    if (prohibitedKeys.indexOf(keyPressed) !== -1) {
      event.stopPropagation();
    }
  }),
  view.on("mouse-wheel", (event) => {
    event.stopPropagation();
  }),
  view.on("double-click", (event) => {
    event.stopPropagation();
  }),
  view.on("drag", (event) => {
    event.stopPropagation();
  }),  
  view.on("drag", ["Shift"], (event) => {
    event.stopPropagation();
  }),
  
  view.on("drag", ["Shift", "Control"], (event) => {
    event.stopPropagation();
  }), 
  view.on("drag", ["Shift"], (event) => {
    event.stopPropagation();
  }),
  
  view.on("drag", ["Shift", "Control"], (event) => {
    event.stopPropagation();
  })];
  view.popup.autoOpenEnabled = false;
}
  async componentDidLoad() {
    this.mapRef.style.width = this.width;
    this.mapRef.style.height = this.height;

    if (this.sceneId) {
      this.view = await this.loadWebScene(this.sceneId);
    } else if (this.mapId) {
      this.view = await this.loadWebMap(this.mapId);
    } else if (this.basemap) {
      this.view = await this.loadMap(this.basemap);
    } else {
      this.view = await this.loadMap('arcgis-community');
    }
    this.view.ui.components = ["attribution"];
    this.view.when(() => {
      if (this.layerlist) {
        this.loadLayerList(this.view);
      }
      if (this.legend) {
         this.loadLegend(this.view);
      }
      if (this.address) {
        this.geocodeAddress(this.view, this.address, this.zoom);
      }
      else if (this.center && this.zoom) {
        this.zoomTo(this.view);
      } else if (this.zoom) {
        this.view.zoom = this.zoom;
      }
      if (this.search) {
        this.loadSearch(this.view);
      }
      console.log(this.navigate)
      if (!this.navigate){
        this.removeNavigation(this.view);
      }
    });
  }
  componentWillLoad() {
    esriConfig.apiKey = "AAPKbf20066507614a3eab9736b79285cc42SI995TZ5lD3yy8ACIxDKUjSyh_85O6UQAmSzKS-UCoWwMhCtqCsPqBCANAkpdsNP";
    this.divId = this.getRandomString();
  }
  componentWillUnload() {
    if (this.view) {
      this.view.detroy();
    }
  }

  render() {
    return (<Host><div id={this.divId} ref={el => this.mapRef = el as HTMLDivElement}></div></Host>);
  }

}
