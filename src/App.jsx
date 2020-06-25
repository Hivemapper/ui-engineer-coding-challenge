/* App.js */
/* eslint-disable no-console, no-unused-vars */

import React, { useEffect } from 'react';
import * as THREE from 'three';
// See https://github.com/mrdoob/three.js/issues/10311 for why the wildcard import is needed.

import PLYLoader from './plyloader';
import { ECEFToLonLatAlt } from './geo-utils';

function loadModel() {
  const loader = new PLYLoader();
  loader.load(
    'https://s3.amazonaws.com/web-ui-engineering-challenge/point-cloud.ply',
    (geometry) => {
      // geometry here is an instance of THREE.Geometry
      console.log('loaded geometry', geometry);
      const threeHolderElem = document.getElementById('three-holder');
      threeHolderElem.innerHTML = null;
    },
  );
}

export default function App() {
  useEffect(() => {
    loadModel();
  });

  return (
    <span>
      <div id="three-holder">
        <div className="loading">Loading...</div>
      </div>
      <div className="button-container">
        <button>
          Color With RGB
        </button>
        <button>
          Color By Altitude
        </button>
      </div>
    </span>
  );
}
