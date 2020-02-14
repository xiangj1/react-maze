import Element from './Element';

export default class Key extends Element {
    constructor(char = '🔑', message = '啊，这是钥匙！我想起来了！一切都连起来了！我可以出去了！') {
        super('Key');
        this.char = char;
        this.message = message;
    }

    static isKey(object) {
        return object instanceof Key;
    }
}