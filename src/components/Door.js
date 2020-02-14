import Element from './Element';

const defaultMessage = `
宝宝你醒啦？已经是大中午了哦。今天是情人节！我给你准备了一个迷宫小游戏！你的一些记忆变成了道具散落在迷宫里，收集到的道具可以变现哦！爱你~😘
`

export default class Door extends Element {
    constructor(char = '🚪', message = defaultMessage) {
        super('Door');
        this.char = char;
        this.message = message;
    }

    static isDoor(object) {
        return object instanceof Door;
    }
}