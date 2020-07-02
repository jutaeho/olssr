import React from 'react';

import Map from 'ol/Map';
import { Vector, Tile } from 'ol/layer';
import { Vector as VectorSource, OSM } from 'ol/source';
import View from 'ol/View';
import Feature from 'ol/Feature';
import {Point} from 'ol/geom';
import * as Extent from 'ol/extent';


export default class MapContainer extends React.Component {
    
    componentDidMount() {
        new Map({
            target: 'map',
            layers: [
                new Tile({
                    source: new OSM()
                }),
                new Vector({
                    source: new VectorSource({
                        features: this.createRandPoint(1000)
                    })
                })
            ],
            view: new View({
                center: Extent.getCenter([13281796.89493656, 3869917.0510634207, 15145521.220454054, 4779453.349506072]),
                zoom: 7.3
            })
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