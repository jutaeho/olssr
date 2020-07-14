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

export default class InitMap {
    constructor(props) {
        
        this.extent = [13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072];
        this.tile = (props === undefined || !props.tile) ? this.setTile(props.tile) : this.setTile(['osm', 'base', 'sat']);
        this.vector = (props === undefined || !props.vector) ? this.setVector(props.vector) : this.setVector(['vector']);
        this.control = (props === undefined || !props.control) ? this.setControl(props.control) : this.setControl(['scale', 'extent', 'fullscreen', 'baselayer', 'export']);
        this.target = (props === undefined || !props.target) ? this.setTarget('map') : props.target;

        this.map = undefined;
    }

    setTile(tiles) {
        let tileType = {
            osm: new Tile({ id: "osm", visible: true, source: new OSM() }),
            base: new Tile({ id: "base", visible: false, source: new XYZ({ url: `http://api.vworld.kr/req/wmts/1.0.0/6976869A-906D-3AB8-ADD4-5DC3FAE38150/Base/{z}/{y}/{x}.png` }) }),
            sat: new Tile({ id: "satellite", visible: false, source: new XYZ({ url: `http://api.vworld.kr/req/wmts/1.0.0/6976869A-906D-3AB8-ADD4-5DC3FAE38150/Satellite/{z}/{y}/{x}.jpeg` })})
        };

        let result = [];

        tiles.forEach((element) => {if(tileType.hasOwnProperty(element)) result.push(tileType[element])});
        return result;
    }

    getTile() { 
        return this.tile;
    }

    setVector(vectors) {
        let result = [];
        vectors.forEach((element) => result.push(new Vector({ id: element, source: new VectorSource({wrapX: false})})));
        return result;
    }

    getVector() {
        return this.vector;
    }

    setControl(controls) {
        let controlType = {
            scale: new ScaleLine({ units: 'metric' }),
            extent: new ZoomToExtent({ extent: this.extent }),
            fullscreen: new FullScreen({ className: 'ol-fullscreen' }),
            baselayer: new BaseLayerControl({ source: this.getTile() }),
            randpoint: new RandomPointControl({ source: this.getVector()}),
            export: new MapExportControl()
        }

        let result = [];

        controls.forEach((element) => { if(controlType.hasOwnProperty(element)) result.push(controlType[element]) });

        return result;
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

    init() {
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
                center: Extent.getCenter(this.extent),
                zoom: 7.3,
                extent: this.extent
            }),
            controls: defaultControls().extend(this.getControls())
        })
    }
    
    getMap() {
        return this.map;
    }
}
