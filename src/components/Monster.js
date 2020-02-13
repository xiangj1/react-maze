import Element from './Element';

export default class Monster extends Element {
    constructor(score = -5) {
        super('Monster');
        this.score = score;
    }
}