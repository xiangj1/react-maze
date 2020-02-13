import Element from './Element';

export default class Door extends Element {
    constructor(char = '🚪') {
        super('Door');
        this.char = char
    }

    static isDoor(object) {
        return object instanceof Door;
    }
}