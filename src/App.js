import React from 'react';
import ReactDom from 'react-dom';

import MapContainer from './components/Map';

import 'ol/ol.css';
import './App.css'; 

let container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);


ReactDom.render(
    <MapContainer/>,
    document.getElementById('root')
);