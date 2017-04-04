/**
 * Game page
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
GLOBAL = require('./Globals');

export default class InstructionsPage extends Component {
  render() {

    return (
      <View style={styles.viewStyle}>
        <Text style={styles.text}>Dela in er i två lag med minst två deltagare per lag. Ett lag börjar att beskriva ordet som kommer upp på skärmen, fast med andra ord! De andra i samma lag ska försöka gissa ordet.
{"\n\n"}När laget har gissat, klicka på ”+”-knappen. Om order är för svårt, klicka på nästa-knappen för att få upp ett nytt ord.
{"\n\n"}När tiden tar slut går turen över till det andra laget. Det lag som först når 50 poäng vinner!</Text>

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
  text: {
    fontSize: 18,
    color: 'white',
    margin: 20,
  },
});
