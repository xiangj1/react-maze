import React from 'react';
import Popup from "reactjs-popup";

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
      maze: new Maze(),
      foundItem: true,
      message: '啊！这是哪？头好痛！我为什么在这？',
      photo: ''
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

      default:
        break;
    }

    let { foundItem, message, photo } = maze.move(x, y)

    this.setState({
      maze,
      foundItem,
      message,
      photo
    });
  }


  render() {
    return (
      <div className="App-header" onKeyPress={this.keyPress} tabIndex="0">
        <Popup open={this.state.foundItem} position="right center">
          <div>
            <p>{this.state.message}</p>
            <img className="image" src={this.state.photo} alt=""></img>
          </div>
        </Popup>
        <h1>记忆迷宫</h1>
        <div className="Maze">
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
        <div>
          {this.state.maze.items.map(printElement)}
        </div>
        <p>
          游戏设定：拿到钥匙即可离开~！
        </p>
        <p>
          （另：所有再路途中收集到的道具皆可在游戏结束后兑现）
        </p>
      </div>
    );
  }
}

