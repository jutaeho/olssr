import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import ReactDom from 'react-dom';

import MapContainer from './components/Canvas';


let container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);


ReactDom.render(
    <MapContainer/>,
    document.getElementById('root')
);