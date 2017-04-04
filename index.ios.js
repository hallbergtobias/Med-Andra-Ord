/**
 * Med Andra Ord
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Button,
  Alert
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import MenuPage from './app/MenuPage';
import GamePage from './app/GamePage';
import InstructionsPage from './app/InstructionsPage';

export default class App extends Component {
  render() {
    const refreshOnBack = () => { Actions.pop({ refresh: {} }); }
    return (
      <Router>
        <Scene key="root" sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight}}>
          <Scene key="menuPage" component={MenuPage} title="Med Andra Ord" hideNavBar={true} initial={true} />
          <Scene key="gamePage" component={GamePage} title="Med Andra Ord" onBack={refreshOnBack} hideNavBar={false} sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}/>
          <Scene key="instructionsPage" component={InstructionsPage} title="Instruktioner" onBack={refreshOnBack} hideNavBar={false} sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}/>

        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('MedAndraOrd', () => App);
