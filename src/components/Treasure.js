import Element from './Element';

export default class Treasure extends Element {
    constructor(score = 5) {
        super('Treasure');
        this.score = score;
    }
}