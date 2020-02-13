import Element from './Element';

export default class Key extends Element {
    constructor(char = '🔑', message = '恭喜你找到了钥匙！') {
        super('Key');
        this.char = char;
        this.message = message;
    }

    static isKey(object) {
        return object instanceof Key;
    }
}