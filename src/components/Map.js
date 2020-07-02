import React from 'react';

import Map from 'ol/Map';
import { Vector, Tile } from 'ol/layer';
import { Vector as VectorSource, OSM, XYZ } from 'ol/source';
import View from 'ol/View';
import Feature from 'ol/Feature';
import {Point} from 'ol/geom';
import * as Extent from 'ol/extent';
import { defaults as defaultControls, ScaleLine } from 'ol/control';

import {BaseLayerControl} from './Control';


/** 
 * @name MapContainer
 * @extends React.Component
 * @description OpenLayers Map Container
 */
export default class MapContainer extends React.Component {
    
    componentDidMount() {

        let backmap = [];
        backmap.push(new Tile({ id: "osm", visible: true, source: new OSM() })); 
        backmap.push(new Tile({ id: "base", visible: false, source: new XYZ({ url: `http://api.vworld.kr/req/wmts/1.0.0/6976869A-906D-3AB8-ADD4-5DC3FAE38150/Base/{z}/{y}/{x}.png` }) })); 
        backmap.push(new Tile({ id: "satellite", visible: false, source: new XYZ({ url: `http://api.vworld.kr/req/wmts/1.0.0/6976869A-906D-3AB8-ADD4-5DC3FAE38150/Satellite/{z}/{y}/{x}.jpeg` })}));


        new Map({
            target: 'map',
            layers: [
                ...backmap,
                new Vector({
                    source: new VectorSource({
                        features: this.createRandPoint(1000)
                    })
                })
            ],
            view: new View({
                center: Extent.getCenter([13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072]),
                zoom: 7.3
            }),
            controls: defaultControls().extend([
                new ScaleLine({
                    units: 'metric'
                }),
                new BaseLayerControl({
                    source: backmap
                })
            ])
        })

    }


    /** 
     * @name createRandPoint
     * @param {Number} count
     * @return {Array} features
     * @description create random point
     */
    createRandPoint(count) {
        let features = new Array(count);

        var extent = [13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072];

        for(var i=0; i <= count; i++) {
            let coordinate = []
          coordinate.push(( Math.random () * (extent[2] - extent[0]) ) + extent[0]);
          coordinate.push(( Math.random () * (extent[3] - extent[1]) ) + extent[1]);

          features[i] = new Feature(new Point(coordinate));
        }
    
        return features;
    }
    
    render() {
        return (
            <div id="map"></div>
        )
    }


}