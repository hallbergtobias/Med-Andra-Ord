/**
 * Menu page
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
GLOBAL = require('./Globals');

export default class MenuPage extends Component {
  render() {
    const goToNewGame = () => {
      Actions.gamePage()
    };
    const goToInstructions = () => {
      Actions.instructionsPage()
    };
    return (
      <View style={styles.viewStyle}>
        <Text onPress={goToNewGame} style={styles.navBtn}>Nytt Spel</Text>
        <Text onPress={goToInstructions} style={styles.navBtn}>Instruktioner</Text>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLOR.LIGHTGRAY,
  },
  navBtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
