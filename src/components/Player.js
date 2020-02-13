import Element from './Element';


export default class Player extends Element {
    constructor(char = '👧🏻', position = [0, 0]) {
        super('Player');
        this.char = char;
        this.position = position;
    }

    static isPlayer(object) {
        return object instanceof Player;
    }
}