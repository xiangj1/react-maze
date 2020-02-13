import Element from './Element';

export default class Treasure extends Element {
    constructor(char = '', message = `You found a ${char}`, photo = '') {
        super('Treasure');
        this.char = char;
        this.message = message;
        this.photo = photo;
    }

    static shuffle(array) {
        for (let i = 0; i < array.length; ++i) {
            let j = Math.floor(Math.random() * array.length);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    static isTreasure(object) {
        return object instanceof Treasure
    }
}

Treasure.items = {
    rose: {
        char: "🌹",
        message: "a",
        photo: "a"
    },
    gift: {
        char: "🎁",
        message: "a",
        photo: "a"
    },
    ski: {
        char: "⛷️",
        message: "a",
        photo: "a"
    },
    letter: {
        char: "💌",
        message: "a",
        photo: "a"
    },
    ribbon: {
        char: "🎀",
        message: "a",
        photo: "a"
    },
    game: {
        char: "🕹️",
        message: "a",
        photo: "a"
    },
    diamond: {
        char: "💎",
        message: "a",
        photo: "a"
    },
    money: {
        char: "💰",
        message: "a",
        photo: "a"
    },
    cat: {
        char: "🐈",
        message: "a",
        photo: "a"
    },
    bird: {
        char: "🐤",
        message: "a",
        photo: "a"
    },
    comet: {
        char: "☄️",
        message: "a",
        photo: "a"
    },
    hato: {
        char: "❤️",
        message: "a",
        photo: "a"
    },
    peach: {
        char: "🍑",
        message: "a",
        photo: "a"
    },
    ticket: {
        char: "🎟️",
        message: "a",
        photo: "a"
    }
}