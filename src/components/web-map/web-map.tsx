import { Component, Prop, h, Element, State } from '@stencil/core';
import { Host, HTMLStencilElement, Method, Watch } from '@stencil/core/internal';
import esriConfig from "@arcgis/core/config.js";
import * as type from '@arcgis/core/smartMapping/symbology/type';
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

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
  @Prop() dock: string;
  @Prop() width: string = "100%";
  @Prop() height: string = "100%";
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
@Watch('dock')
dockChanged(newValue) {
  newValue ? (this.view as __esri.MapView).popup.dockOptions.position = this.dock : null;
  newValue ? (this.view as __esri.MapView).popup.dockEnabled = true : false;
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
  const expand = new Expand({id: 'layerlist',view: view, content: new LayerList({container: document.createElement('div'), view: view}), mode: 'floating' });
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
  const expand = new Expand({id: 'legend', view: view, content: new Legend({container: document.createElement('div'), view: view}), mode: 'floating' });
  view.ui.add(expand ,'top-right');
}
public getPinSymbol(view: __esri.MapView) {
  return {
    type: "simple-marker", 
    path: 'M15.65,36.85c1.9,2.3,4.47,4.93,7.8,7.45c0.49,0.37,0.99,0.73,1.51,1.09c0.54-0.37,1.07-0.75,1.58-1.14'+
    'c10.44-7.92,15.7-18.63,15.7-24.62c0-8.93-6.84-16.3-15.56-17.13c-0.54-0.05-1.09-0.08-1.64-0.08l0,0l0,0l0,0l0,0'+
    'c-0.72,0-1.42,0.06-2.11,0.14c-8.5,1.05-15.1,8.3-15.1,17.07C7.81,24.34,10.89,31.09,15.65,36.85z M22.91,4.38'+
    'c0.69-0.1,1.39-0.16,2.11-0.16c0.56,0,1.1,0.03,1.65,0.09c7.73,0.83,13.77,7.38,13.77,15.33c0,5.71-5.17,15.99-15.42,23.54'+
    'C14.77,35.63,9.6,25.35,9.6,19.64C9.6,11.85,15.4,5.41,22.91,4.38z'+
    'M25.11,9.97c-5.67,0-10.29,4.62-10.29,10.29s4.62,10.29,10.29,10.29S35.4,25.93,35.4,20.26'+
    'S30.79,9.97,25.11,9.97z M25.11,28.61c-4.6,0-8.35-3.74-8.35-8.35s3.74-8.35,8.35-8.35s8.35,3.74,8.35,8.35S29.72,28.61,25.11,28.61'              ,
    size: 24,
    color:  type.getSchemes({basemap: view.map.basemap, geometryType: 'point'} as any).basemapTheme === 'light' ? '#000000' : '#FFFFFFF',
    outline: {  // autocasts as new SimpleLineSymbol()
        color: type.getSchemes({basemap: view.map.basemap, geometryType: 'point'} as any).basemapTheme === 'light' ? '#000000' : '#FFFFFFF',
        width: "0.75px"
    },              
    yoffset: 4
  } as any;
}
@Method()
public async loadSearch(view) {
  const [
      { default: Search }
  ] = await Promise.all([
      await import(`@arcgis/core/widgets/Search`)

  ]);
  const search = new Search({id: 'search', container: document.createElement('div'), view: view, goToOverride: (view: __esri.MapView, goToParams) => {
    if (this.zoom) {
      goToParams.target.zoom = this.zoom;
    }
    view.graphics.removeAll();
    return view.goTo(goToParams.target, goToParams.options); 
  }});
  reactiveUtils.whenOnce(() => search.viewModel.state === 'ready').then(() => {
    search.viewModel.allSources.forEach((source: __esri.LocatorSearchSource | __esri.LayerSearchSource) => {
      if ((source as any).url) {
        (source as __esri.LocatorSearchSource).resultSymbol = this.getPinSymbol(view);
      }
    })
  });
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
public addPin(view: __esri.MapView, location) {
  const graphic = {attributes: {}, geometry: location, symbol: this.getPinSymbol(view)} as any;
  
  view.graphics.removeAll();
  view.graphics.add(graphic);
}
@Method()
public async geocodeAddress(view: __esri.MapView, address, zoom) {
await Promise.all([
      await import(`@arcgis/core/rest/locator`).then(locator => {
        locator.addressToLocations('https://maps.raleighnc.gov/arcgis/rest/services/Locators/Locator/GeocodeServer',
        {address: {SingleLine: address}}).then(candidates => {
          this.addPin(view, candidates[0].location);
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
      if (this.dock) {
        this.view.popup.dockEnabled = true;
        this.view.popup.dockOptions.position = this.dock;
      }      
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
