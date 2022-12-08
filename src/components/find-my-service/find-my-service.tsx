import { Component, h } from '@stencil/core';
import { Host, Method, Prop, State } from '@stencil/core/internal';

@Component({
  tag: 'find-my-service',
  styleUrl: 'find-my-service.css',
  shadow: false
})
export class FindMyService {
  @Prop() groupId: string = 'a8acaca3d4514d40bc7f302a8db291fb';
  @Prop() council: boolean = false;
  @Prop() categories: string;
  @Prop() layers: string;

  @State() sections = [];
  @State() councilInfo: any[] = [];
  
  private searchDiv?: HTMLElement;
  private councilDiv?: HTMLElement;

  search: any;
  @Method()
  public async loadSearchWidget() {
    const [
        { default: Search },
        { default: LocatorSearchSource }
    ] = await Promise.all([
        await import(`@arcgis/core/widgets/Search`),
        await import(`@arcgis/core/widgets/Search/LocatorSearchSource`)
    ]);
    const search = new Search({container: this.searchDiv,
    includeDefaultSources: false,
    sources: [new LocatorSearchSource({
      url: "https://maps.raleighnc.gov/arcgis/rest/services/Locators/FindMyService/GeocodeServer",
      placeholder: "Enter your address"
    })] 
  })
    return search;
  }
  @Method()
  public async loadGroup(id) {
    const [
        { default: Portal }
    ] = await Promise.all([
        await import(`@arcgis/core/portal/Portal`)
    ]);
    const portal = new Portal();
    const results = await portal.queryGroups({
      query: `id: ${id}`,
      sortField: 'title'
    });
    if (results.results.length) {
      const group = results.results[0];
      const items = await group.queryItems({
        query: 'type: map',
        sortField: 'title'
      });
      if (items.results.length) {
        return items.results;
      }
    }
  } 
  @Method()
  public async loadMaps(items) {
    const [
      { default: WebMap }
    ] = await Promise.all([
        await import(`@arcgis/core/WebMap`)
    ]);
    const promises = [];
    items.forEach(item => {
      promises.push(new WebMap({portalItem: {id: item.id}}).loadAll().catch(reason => {
        console.log(reason);
      }));
    });
    return await Promise.all(promises);
  }
  @Method()
  public async searchMapLayers(geometry, maps) {
    this.sections = [...[]];
    let sections = [...[]];
    this.councilInfo = [...[]];

    let mapCount = 0;
    maps = maps.filter(m => {
      return this.categories === undefined || this.categories?.split(',').includes(m.portalItem.title);
    })
    maps.forEach(async map => {
      let layers = [...[]];
      const promises = [];
      map.layers.filter(l => {
        return this.layers === undefined || this.layers?.split(',').includes(l.title)
      }).forEach(async (layer: __esri.FeatureLayer) => {
        promises.push(layer.queryFeatures({ geometry: geometry, outFields: ['*'] }));
      });
      const featuresets = await Promise.all(promises);
      mapCount +=1;
      featuresets.forEach((featureSet: __esri.FeatureSet, i: number) => {
        
          layers = [...layers, { title: map.layers.getItemAt(i).title, features: featureSet.features, id: map.layers.getItemAt(i).id }]
          if (this.council && map.layers.getItemAt(i).title.includes('City Council') && featureSet.features.length > 0) {
            (featureSet.features[0].layer as __esri.FeatureLayer).popupTemplate.content[0].text = '<img alt="" src="{expression/expr0}" style="padding-right:1em;max-height:200px;"/>';
            (featureSet.features[0].layer as __esri.FeatureLayer).popupTemplate.content[0].text += "<h6>{COUNCIL_PERSON}</h6><span>Raleigh City Council</span><div>District {COUNCIL_DIST}</div><div><a href='https://www.raleighnc.gov/services/government/city-council-and-committees'><span>Website </span></a></div>";
            (featureSet.features[0].layer as __esri.FeatureLayer).popupTemplate.title = "";
            this.councilInfo.push(featureSet.features[0]);
        }
      });
      sections = [...sections, { title: map.portalItem.title, layers: layers }];
      if (mapCount === maps.length) {
        this.sections = [...sections];
        sections.sort((a, b) => {
          if (a.title < b.title) {
              return -1
          }
          if (a.title > b.title) {
              return 0;
          }
        });
        this.sections = [...sections];
        console.log(this.sections);

      }      
    });

  }
  async loadFeatureWidget(id, feature) {
    const [
      { default: Feature }
    ] = await Promise.all([
        await import(`@arcgis/core/widgets/Feature`)
    ]);    
      setTimeout(() => {
         new Feature({ container: id, graphic: feature });
      },100);        

}  

componentWillLoad() {
  if (this.search) {
    this.search.destroy();
  }
  this.sections = [...[]];
}
  async componentDidLoad() {
    this.search = await this.loadSearchWidget();
    const items = await this.loadGroup(this.groupId);
    const maps = await this.loadMaps(items);
    
    this.search.on('search-complete', event => {
      if (event.results.length) {

        this.searchMapLayers(event.results[0].results[0].feature.geometry, maps);
      }
    });
  }

  disconnectedCallback() {
    document.getElementById('councilDiv').innerHTML = '';   
  }

  render() {
    return (<Host>
<div class="t-sky o-layout-v-inset--tight o-layout-h-inset"><div ref={el => this.searchDiv = el as HTMLElement}></div>
        <div class="o-layout-sidebar-after o-layout-sidebar-after--tight">
        {this.council && this.councilInfo && <div>
        {this.councilInfo.map((info) => {
        return <div id="councilDiv" ref={el => {this.councilDiv = el as HTMLElement;this.loadFeatureWidget(this.councilDiv, info);}}>

        </div>
        })}
        </div>}
        <ol class={this.council ? 'o-layout-grid o-layout-grid--3  o-layout-sidebar-after__primary' : 'o-layout-grid o-layout-grid--3'}>{this.sections.map((webmap) => {
            return<li class="o-layout-grid__item"><div><h3>{webmap.title}</h3>
            {webmap.layers.map((layer) => {
                return layer.features.length > 0 ? <div>
                {layer.features.map((feature, i) => {
                  if (!(this.council && layer.title.toLowerCase().includes('council'))) {
                    
                    return <div id={layer.id + '_' + i} ref={el => this.loadFeatureWidget(el, feature)}></div>
                  }

                })}</div>
                : <div class="esri-feature esri-widget"><h2 class="esri-widget__heading esri-feature__title" role="heading" aria-level="2">{layer.title}</h2><div class="esri-feature__text esri-feature__content-element"><div class="esri-feature__main-container">Service not provided for this address</div></div></div>

            })}
            </div></li>

        })}</ol></div></div></Host>
    );
  }

}
