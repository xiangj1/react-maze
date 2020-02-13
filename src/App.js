import React from 'react';
import logo from './logo.svg';
import './App.css';

import Maze from './components/Maze';
import Treasure from './components/Treasure';
import Player from './components/Player';
import Door from './components/Door';
import Key from './components/Key';
import Monster from './components/Monster';

function printElement(element) {

  if (Treasure.isTreasure(element) ||
    Door.isDoor(element) ||
    Player.isPlayer(element) ||
    Key.isKey(element) ||
    Monster.isMonster(element))
    return element.char;

  return '';

}

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      maze: new Maze()
    };
  }

  keyPress = (event) => {
    let maze = this.state.maze;

    let x = 0, y = 0;
    switch (event.charCode) {
      case 119: //w
        --x;
        break;

      case 97: //a
        --y;
        break;

      case 115: //s
        ++x;
        break;

      case 100: //d
        ++y;
        break;
    }

    let { foundItem, message } = maze.move(x, y)
    if (foundItem)
      console.log(message)

    this.setState({ maze })
  }


  render() {
    return (
      <div className="App-header">
        <div className="Maze" onKeyPress={this.keyPress} tabIndex="0">
          {this.state.maze.grid.map(row =>
            <div className="Row">
              {row.map(element =>
                <div className={'Element ' + element.type}>
                  {printElement(element)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

