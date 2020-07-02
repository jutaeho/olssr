import React from 'react';
import ReactDom from 'react-dom';

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
            <select className="form-control" onChange={this.props.onChange}>
                <option value="osm">오픈스트리트맵</option>
                <option value="base">브이월드(일반)</option>
                <option value="satellite">브이월드(항공)</option>
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
        element.classList.add('base-layer', 'ol-unselectable', 'ol-control');

        this.handleChange = this.handleChange.bind(this);

        ReactDom.render(<BaseLayerSelector onChange={this.handleChange}/>, element);

        this.element = element;
        this.target = options.target;
        this.source = source;
    }

    handleChange(e) {
        this.source.forEach(element => element.setVisible((element.get('id') == e.target.value) ? true : false));
    }
}

export {
    BaseLayerControl
} 
