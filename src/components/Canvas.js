import React from 'react';

import InitMap from './Map';

/**
 * @name MapContainer
 * @extends React.Component
 * @description OpenLayers Map Container
 */
export default class MapContainer extends React.Component {

    componentDidMount() {
        let map = new InitMap({
            tile: ['osm', 'sat'],
            vector: ['vector'],
            control: ['scale', 'extent', 'fullscreen', 'baselayer', 'export'],
            target: 'map'
        });

        map.init();
    }

    render() {
        return (
            <div id="map"></div>
        )
    }


}