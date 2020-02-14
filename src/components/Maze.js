import Treasure from './Treasure';
import Wall from './Wall';
import Player from './Player'
import Road from './Road';
import Monster from './Monster';
import Key from './Key';
import Door from './Door';

export default class Maze {
    constructor() {
        let grid = defaultMaze;
        let player = new Player();

        let index = 0, monsterIndex = 0;
        let treasureNames = Treasure.shuffle(Object.keys(Treasure.items));
        let monsterNames = Object.keys(Monster.items);

        for (let i = 0; i < grid.length; ++i) {
            for (let j = 0; j < grid[i].length; ++j) {

                if (Player.isPlayer(grid[i][j])) {
                    player.position = [i, j];

                } else if (Treasure.isTreasure(grid[i][j])) {
                    let name = treasureNames[index++];
                    let { char, message, photo } = Treasure.items[name];
                    grid[i][j] = new Treasure(char, message, photo);

                } else if (Monster.isMonster(grid[i][j])) {
                    let name = monsterNames[monsterIndex++ % monsterNames.length];
                    console.log(monsterIndex, name, monsterNames)
                    let { char } = Monster.items[name];

                    grid[i][j] = new Monster(char);
                }

            }
        }

        this.player = player;
        this.grid = grid;
        this.items = [];
    }

    isValid = (i, j) => {
        let { grid } = this;
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || Wall.isWall(grid[i][j]))
            return false;
        return true;
    }

    swap = ([r1, c1], [r2, c2]) => {
        let { grid } = this;
        [grid[r1][c1], grid[r2][c2]] = [grid[r2][c2], grid[r1][c1]]
    }

    hasKey = () => {
        let { items } = this;
        for (let item of items) {
            if (Key.isKey(item))
                return true;
        }
        return false;
    }

    move = (x, y) => {
        let { grid, swap, player, hasKey } = this;
        let [i, j] = player.position;

        let [r, c] = [i + x, j + y];

        if (!this.isValid(r, c)) {
            return {};
        }

        let result = {};


        if (Door.isDoor(grid[r][c]) && !hasKey()) {
            return {
                foundItem: true,
                message: '这个门看起来是出口，但好像锁住了我打不开……'
            }
        }

        if (Treasure.isTreasure(grid[r][c]) || Key.isKey(grid[r][c]) || Door.isDoor(grid[r][c])) {
            result.foundItem = true;
            result.message = grid[r][c].message;

            if (Treasure.isTreasure(grid[r][c])) {
                result.photo = grid[r][c].photo;
            }
            this.items.push(grid[r][c]);
            grid[r][c] = new Road();
        }

        swap([i, j], [r, c]);
        player.position = [r, c];

        return result;

    }
}

let defaultMaze = [
    [
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Door(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Monster(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Monster(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Monster(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Key(),
        new Wall(),
    ],
    [
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Treasure(),
        new Road(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Road(),
        new Wall(),
    ],
    [
        new Wall(),
        new Wall(),
        new Wall(),
        new Player(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
        new Wall(),
    ],
];