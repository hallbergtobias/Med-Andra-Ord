/**
 * Game page
 */

import React, { Component } from 'react';
import { View, Alert, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
GLOBAL = require('./Globals');

export default class GamePage extends Component {
  constructor(props) {
        super(props);

        var jsonData = require('../app/lib/document.json'); //get list of words
        var array = jsonData.array

        this.state = {
            wordArray: array,
            word: '',
            teamOnePoints: 0,
            teamTwoPoints: 0,
            turnToPlay: 2,
            gameState: GLOBAL.STATE.GAME_START,
            time: 0,
            intervalId: 0,
            teamOneColor: GLOBAL.COLOR.NOT_ACTIVE_TEAM,
            teamTwoColor: GLOBAL.COLOR.ACTIVE_TEAM
        }
    }

  render() {
    let playButton = require('../app/images/play_button.png')
    let pointButton = require('../app/images/point_button.png')
    let skipButton = require('../app/images/skip_button.png')


    switch (this.state.gameState) {
      case GLOBAL.STATE.GAME_START:
        return (
            <View style={[styles.vertCenterText, {alignItems: 'center', backgroundColor: GLOBAL.COLOR.LIGHTGRAY}]}>
              <Button
                onPress={this.startGameButton.bind(this)}
                image={playButton}
                style={{width: 40, height: 50,}}
              />
            </View>
        )
      case GLOBAL.STATE.GAME_ACTIVE:
        return (
          <View style={styles.viewStyle}>
              <View style={styles.bottomButtons}>
                  <View style={styles.vertCenterText}>
                    <Text style={[styles.teamText, {color: this.state.teamOneColor,}]}>Lag 1: {this.state.teamOnePoints}</Text>
                    <Text style={[styles.teamText, {color: this.state.teamTwoColor,}]}>Lag 2: {this.state.teamTwoPoints}</Text>
                  </View>
                  <View style={[styles.vertCenterText]}>
                    <Timer time={this.state.time}/>
                  </View>
              </View>

              <View>
                  <Text style={styles.midText}>{this.state.word}</Text>
              </View>
              <View style={styles.bottomButtons}>
                  <View style={styles.vertCenterText}>
                    <Button
                      onPress={this.buttonPressed.bind(this, 'left')}
                      image={pointButton}
                      style={{width: 30, height: 30,}}
                    />
                  </View>
                  <View style={styles.vertCenterText}>
                    <Button
                      onPress={this.buttonPressed.bind(this, 'right')}
                      image={skipButton}
                      style={{width: 40, height: 30,}}
                    />
                  </View>
              </View>
          </View>
        )

    }
  }
  startGameButton() {
    var id = setInterval(() => {
      if(this.state.time === 0) {
        this.setState({gameState: GLOBAL.STATE.GAME_START})
        clearInterval(this.state.intervalId)
      }
      console.log(this.state.time)
      this.setState({ time: this.state.time - 1 });
    }, 1000);

    var temp = this.state.teamOneColor
    this.setState({ intervalId: id,
                    time: GLOBAL.TIME,
                    gameState: GLOBAL.STATE.GAME_ACTIVE,
                    teamOneColor: this.state.teamTwoColor,
                    teamTwoColor: temp
                  })

    if (this.state.turnToPlay == 1) {
      this.setState({ turnToPlay: 2 })
    } else { this.setState({ turnToPlay: 1 }) }

    this.updateWord()

  }
  buttonPressed(input) {
        switch (input) {
          case 'left':
            return this.incButtonPressed()
          case 'right':
            return this.skipButtonPressed()
        }
  }
  incButtonPressed() {
    switch (this.state.turnToPlay) {
      case 1:
        this.setState({ teamOnePoints: this.state.teamOnePoints + 1 })
        break
      case 2:
        this.setState({ teamTwoPoints: this.state.teamTwoPoints + 1 })
        break
    }

    if(this.state.teamOnePoints === (GLOBAL.MAX_POINT - 1) || this.state.teamTwoPoints === (GLOBAL.MAX_POINT - 1)) {
      this.gameOver()
    }

    return this.updateWord()
  }
  gameOver() {
    var alertMsg = 'Grattis lag ' + this.state.turnToPlay + ' ni vann!'
    Alert.alert(
        'Spelet slut',
        alertMsg,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    Actions.menuPage()
  }
  skipButtonPressed() {
      return this.updateWord()
  }
  updateWord() {
      //TODO: remove word from array
      this.setState({ word: this.getRandomElement(this.state.wordArray) })
  }

  getRandomElement(arr){
    return arr[this.getRandomInteger(0,(arr).length)]
  }
  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  componentWillUnmount (){
    clearInterval(this.state.intervalId);
  }
}
class Button extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          style={this.props.style}
          source={this.props.image}
        />
      </TouchableOpacity>
    );
  }
}

class Timer extends Component {
  render() {
    var display = this.props.time;

    if(display < 10) {
      display = '0' + display
    }

    return (
      <Text style={styles.timerText}>00:{display}</Text>
    );
  }
}



const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLOR.LIGHTGRAY,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },
  midText: {
    color: GLOBAL.COLOR.WHITE,
    fontWeight: 'bold',
    fontSize: 26,
  },
  navBtn: {
    color: GLOBAL.COLOR.WHITE,
    fontWeight: 'bold',
    fontSize: 24,
  },
  vertCenterText: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamText: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  timerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: GLOBAL.COLOR.WHITE,
  },
  buttonPlus: {
    color: '#4FBC89',
  },
  buttonPass: {
    color: '#F05870',
  },
});
