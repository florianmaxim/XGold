import React from 'react';

import Routes from './Routes'

import {Outer}              from './App_';

import ContainerOverlay     from './containers/container-overlay';
import ContainerButtonMain  from './containers/container-button-main';

import * as config from '../../config.json';

export default () =>

  <Outer frame={config.frame}>

    <ContainerOverlay/>

    <Routes/>

    <ContainerButtonMain/>

  </Outer>