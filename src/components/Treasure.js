import rose from '../images/rose.jpg'
import gift from '../images/gift.jpg'
import ski from '../images/ski.jpg'
import letter from '../images/letter.jpg'
import ribbon from '../images/ribbon.jpg'
import game from '../images/game.jpg'
import ring from '../images/ring.jpg'
import money from '../images/money.jpg'
import cat from '../images/cat.jpg'
import camera from '../images/camera.jpg'
import comet from '../images/comet.jpg'
import hato from '../images/hato.jpg'
import peach from '../images/peach.jpg'
import ticket from '../images/ticket.jpg'

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
        message: "去年情人节收到的玫瑰，是谁送的呢？",
        photo: rose
    },
    gift: {
        char: "🎁",
        message: "啊，我想起来有人送了我两个礼物我还没拆！",
        photo: gift
    },
    ski: {
        char: "⛷️",
        message: "和朋友和某人去滑雪，好想再看看雪……",
        photo: ski
    },
    letter: {
        char: "💌",
        message: "这是他给我写的情书！欸，为什么我流泪了……",
        photo: letter
    },
    ribbon: {
        char: "🎀",
        message: "好可爱的小猪呀，礼物包装的真好。",
        photo: ribbon
    },
    game: {
        char: "🕹️",
        message: "哈哈哈哈哈哈，这不是我吗",
        photo: game
    },
    ring: {
        char: "💍",
        message: "这个珍珠戒指可真好看，是我的吗？",
        photo: ring
    },
    money: {
        char: "💰",
        message: "地上有个钱袋，里面有520人民币",
        photo: money
    },
    cat: {
        char: "🐈",
        message: "啾啾！你怎么在这里？嗯？我怎么知道你叫啾啾？",
        photo: cat
    },
    camera: {
        char: "📷",
        message: "好像有一个一直在我身边的摄影师……",
        photo: camera
    },
    comet: {
        char: "☄️",
        message: "天呐！是流星！让我许个愿望！",
        photo: comet
    },
    hato: {
        char: "❤️",
        message: "对，有一个很爱我的人！",
        photo: hato
    },
    peach: {
        char: "🍑",
        message: "哇，好吃！是我喜欢的脆白桃！",
        photo: peach
    },
    ticket: {
        char: "🎟️",
        message: "捡到了一张万能券！",
        photo: ticket
    }
}