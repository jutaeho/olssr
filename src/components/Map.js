import React from 'react';

import Map from 'ol/Map';
import { Vector, Tile } from 'ol/layer';
import { Vector as VectorSource, OSM, XYZ } from 'ol/source';
import View from 'ol/View';
import * as Extent from 'ol/extent';
import { defaults as defaultControls, ScaleLine, ZoomToExtent, FullScreen } from 'ol/control';

import {BaseLayerControl, RandomPointControl, MapExportControl} from './Control';


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
        vectors.push(new Vector({source: new VectorSource({wrapX: false})}));

        new Map({
            target: 'map',
            layers: [
                ...basemaps,
                ...vectors
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