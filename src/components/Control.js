import React from 'react';
import ReactDom from 'react-dom';

import Feature from 'ol/Feature';
import {Point} from 'ol/geom';

import { Control } from 'ol/control';


/**
 * @name BaseLayerSelector
 * @extends React.Component
 * @description Base Layer Selector Component
 */
class BaseLayerSelector extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select className="form-control form-control-sm" onChange={this.props.onChange}>
                {this.props.items.map((value, index) => {
                    return <option value={value.id}>${value.id.toUpperCase()}</option>      
                })}
            </select>
        )
    }
}

/**
 * @name BaseLayerControl
 * @extends ol.Control
 * @description Base Layer Control
 */
class BaseLayerControl extends Control  {

    constructor(opt_options) {
        var options = opt_options || {};
        var source = options.source || [];

        super(options);

        var element = document.createElement('div');
        element.classList.add('ol-base-layer', 'ol-unselectable', 'ol-control');

        this.handleChange = this.handleChange.bind(this);

        ReactDom.render(<BaseLayerSelector onChange={this.handleChange} items={source}/>, element);

        this.element = element;
        this.target = options.target;
        this.source = source;
    }

    handleChange(e) {
        this.source.forEach(element => element.setVisible((element.get('id') == e.target.value) ? true : false));
    }
}

/**
 * @name RandomPointGenerator
 * @extends React.Component
 * @description Random Point Generator
 */
class RandomPointGenerator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.onClick} title="랜덤포인트">R</button>
        )
    }
}

/**
 * @name RandomPointControl
 * @extends ol.Control
 * @description Random Point Control
 */
class RandomPointControl extends Control {
    constructor(opt_options) {
        var options = opt_options || {};
        var source = options.source || [];

        super(options);

        var element = document.createElement('div');
        element.classList.add('ol-random-point', 'ol-unselectable', 'ol-control');

        this.handleClick = this.handleClick.bind(this);

        ReactDom.render(<RandomPointGenerator onClick={this.handleClick}/>, element);

        this.element = element;
        this.target = options.target;
        this.source = source;
    }

    handleClick() {
        this.source.forEach(element => {
            element.getSource().clear();
            element.getSource().addFeatures(this.create(10000));
        });
    }

        /**
     * @name create
     * @param {Number} count
     * @return {Array} features
     * @description create random point
     */
    create(count) {
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
}

/**
 * @name MapExport
 * @extends React.Component
 * @description map export
 */
class MapExport extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.onClick} title="지도저장">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cloud-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                    <path fillRule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
                </svg>
            </button>
        )
    }
}

/**
 * @name MapExportControl
 * @extends ol.Control
 * @description map export control
 */
class MapExportControl extends Control {
    constructor(opt_options) {
        var options = opt_options || {};
        super(options);

        var element = document.createElement('div');
        element.classList.add('ol-map-export', 'ol-unselectable', 'ol-control');

        this.handleClick = this.handleClick.bind(this);

        ReactDom.render(<MapExport onClick={this.handleClick}/>, element);

        this.element = element;
        this.target = options.target;
    }

    handleClick() {
        this.getMap().once('rendercomplete', function() {
            'use strict';
            var mapCanvas = document.createElement('canvas');
            var size = this.getSize();
            mapCanvas.width = size[0];
            mapCanvas.height = size[1];
            var mapContext = mapCanvas.getContext('2d');
            Array.from(document.querySelectorAll('.ol-layer canvas'), (canvas) => {
                if (canvas.width > 0) {
                    var opacity = canvas.parentNode.style.opacity;
                    mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                    var transform = canvas.style.transform;
                    var matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
                    mapContext.setTransform(matrix);
                    mapContext.drawImage(canvas, 0, 0);
                }
            });
            if (navigator.msSaveBlob) {
                // link download attribuute does not work on MS browsers
                navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
            } else {
                var link = document.createElement('a');
                link.href = mapCanvas.toDataURL('image/png');
                link.download = 'map_export';
                link.click();
            }
        });
        this.getMap().renderSync();
    }
}

export {
    BaseLayerControl,
    RandomPointControl,
    MapExportControl

}
