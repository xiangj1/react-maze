import Element from './Element';

export default class Monster extends Element {
    constructor(char = 'M') {
        super('Monster');
        this.char = char;
    }

    static isMonster(object) {
        return object instanceof Monster;
    }
}

Monster.items = {
    snake: {
        char: '🐍'
    },
    crocodile: {
        char: '🐊'
    }
}