import * as faker from 'faker';
import * as _ from 'lodash';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import { ISandboxProps, Sandbox } from '../../client/components/elements/Sandbox';

const sandboxId = 'storybook-sandbox';

const emptyScriptProps: ISandboxProps = {
    ready: true,
    sandboxId,
    script: '',
};

const basicPageProps: ISandboxProps = {
    ready: true,
    sandboxId,
    script: `<html>
    <head>
    <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.sound.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jshint/2.9.5/jshint.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"></script>
    <script src="/scripts/index.js"></script>
    <style>
    html,
    body {
    margin: 0;
    padding: 0;
    overflow: hidden
    }
    </style>
    </head>
    <body>
    <script>
    new p5();
    pixelDensity(1);
    var x;
    var y;
    
    function setup() {
      createCanvas(800, 800);
      x = 200;
      y = 200;
      background(51);
    }
    
    function draw() {
      stroke(random(255),random(255),random(255), 100);
      fill(random(255),random(255),random(255), 100);
    
      strokeWeight(2);
      
      rect(x, y,50,50);
    
      var r = floor(random(4));
    
      switch (r) {
        case 0:
          x = x + 50;
          break;
        case 1:
          x = x - 50;
          break;
        case 2:
          y = y + 50;
          break;
        case 3:
          y = y - 50;
          break;
      }
    
    
    }
    p5.instance._defaultCanvasSize = { width: 1000, height: 1000 };
    window.sendDone(window.parent.origin);
    </script>
    </body>
    </html>`,
};

storiesOf('Sandbox', module)
    .add('without code', () => <Sandbox {...emptyScriptProps} />)
    .add('with code', () => <Sandbox {...basicPageProps} />);
