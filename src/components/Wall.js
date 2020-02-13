import Element from './Element';

export default class Wall extends Element {
    constructor() {
        super('Wall');
    }

    static isWall(object) {
        return object instanceof Wall;
    }
}