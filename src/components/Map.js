import React from 'react';

import Map from 'ol/Map';
import { Vector, Tile } from 'ol/layer';
import Graticule from 'ol/layer/Graticule';
import { Vector as VectorSource, OSM, XYZ } from 'ol/source';
import View from 'ol/View';
import * as Extent from 'ol/extent';
import { defaults as defaultControls, ScaleLine, ZoomToExtent, FullScreen } from 'ol/control';
import { Stroke } from 'ol/style';


import {BaseLayerControl, RandomPointControl, MapExportControl} from './Control';
import { toStringHDMS } from 'ol/coordinate';

export default class InitMap {
    constructor(props) {
        this.tile = (!props.tile) ? [] : props.tile;
        this.vector = (!props.vector) ? [] : props.vector;
        this.control = (!props.control) ? [] : props.control;
        this.controlType = {
            scale: new ScaleLine({ units: 'metric' }),
            extent: new ZoomToExtent({ extent: [13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072] }),
            fullsreen: new FullScreen({ className: 'ol-fullscreen' }),
            baselayer: new BaseLayerControl({ source: basemaps }),
            randpoint: new RandomPointControl({ source: vectors}),
            export: new MapExportControl()
        }
        this.target = (!props.target) ? undefined : props.target;
        this.map = undefined;
    }

    setTile(tiles) {
        let tile = {
            osm: new Tile({ id: "osm", visible: true, source: new OSM() }),
            base: new Tile({ id: "base", visible: false, source: new XYZ({ url: `http://api.vworld.kr/req/wmts/1.0.0/6976869A-906D-3AB8-ADD4-5DC3FAE38150/Base/{z}/{y}/{x}.png` }) }),
            sat: new Tile({ id: "satellite", visible: false, source: new XYZ({ url: `http://api.vworld.kr/req/wmts/1.0.0/6976869A-906D-3AB8-ADD4-5DC3FAE38150/Satellite/{z}/{y}/{x}.jpeg` })})
        };

        tiles.forEach((element) => { if(tile[element]) this.tile.push(tile[element]) });
    }

    getTile() { 
        return this.tile;
    }

    setVector(vectors) {
        vectors.forEach((element) => this.vector.push(new Vector({ id: element, source: new VectorSource({wrapX: false})})));
    }

    getVector() {
        return this.vector;
    }

    setControl(controls) {
        controls.forEach((element) => { if(this.controlType[element]) this.control.push(control[element]) });
    }
    
    getControls() {
        return this.control;
    }

    setTarget(target) {
        this.target = target;
    }

    getTarget() {
        return this.target;
    }

    setMap() {
        if(this.target === undefined) this.setTarget('map'); 
        if(this.tile.length == 0 || !Array.isArray(this.tile)) this.setTile(['osm', 'base', 'sat']);
        if(this.vector.length == 0 || !Array.isArray(this.vector)) this.setVector(['vector']);
        if(this.control.length == 0 || !Array.isArray(this.control)) this.setControl(['vector']);

        this.map = new Map({
            target: this.getTarget(),
            layers: [
                ...this.getTile(),
                ...this.getVector(),
                new Graticule({
                    strokeStyle: new Stroke({
                        color: 'rgba(220,20,60,0.9)',
                        width: 2,
                        lineDash: [0.5, 4]
                    }),
                    showLabels: false,
                    wrapX: false
                })
            ],
            view: new View({
                center: Extent.getCenter([13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072]),
                zoom: 7.3,
                extent: [13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072]
            }),
        })
    }
    
    getMap() {
        return this.map;
    }
}

/**
 * @name MapContainer
 * @extends React.Component
 * @description OpenLayers Map Container
 */
export default class MapContainer extends React.Component {

    componentDidMount() {

        let basemaps = [];
        basemaps.push(new Tile({ id: "osm", visible: true, source: new OSM() }));
        basemaps.push(new Tile({ id: "base", visible: false, source: new XYZ({ url: `http://api.vworld.kr/req/wmts/1.0.0/6976869A-906D-3AB8-ADD4-5DC3FAE38150/Base/{z}/{y}/{x}.png` }) }));
        basemaps.push(new Tile({ id: "satellite", visible: false, source: new XYZ({ url: `http://api.vworld.kr/req/wmts/1.0.0/6976869A-906D-3AB8-ADD4-5DC3FAE38150/Satellite/{z}/{y}/{x}.jpeg` })}));

        let vectors = [];
        vectors.push(new Vector({ id: "vector", source: new VectorSource({wrapX: false})}));

        new Map({
            target: 'map',
            layers: [
                ...basemaps,
                ...vectors,
                new Graticule({// the style to use for the lines, optional.
                    strokeStyle: new Stroke({
                        color: 'rgba(220,20,60,0.9)',
                        width: 2,
                        lineDash: [0.5, 4]
                    }),
                    showLabels: false,
                    wrapX: false
                })
            ],
            view: new View({
                center: Extent.getCenter([13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072]),
                zoom: 7.3,
                extent: [13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072]
            }),
            controls: defaultControls().extend([
                new ScaleLine({ units: 'metric' }),
                new ZoomToExtent({ extent: [13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072] }),
                new FullScreen({ className: 'ol-fullscreen' }),
                new BaseLayerControl({ source: basemaps }),
                new RandomPointControl({ source: vectors}),
                new MapExportControl()
            ])
        })

    }

    render() {
        return (
            <div id="map"></div>
        )
    }


}