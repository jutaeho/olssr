import React from 'react';

import Map from './Map';

/**
 * @name MapContainer
 * @extends React.Component
 * @description OpenLayers Map Container
 */
export default class MapContainer extends React.Component {

    componentDidMount() {
        new Map();
    }

    render() {
        return (
            <div id="map"></div>
        )
    }


}