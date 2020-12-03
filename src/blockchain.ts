import { Block } from './block';

export class Blockchain {
    private blocks: Block[];

    constructor(blocks: Block[]) {
        this.blocks = blocks;
    }

    getLastBlock() {
        return this.blocks[this.blocks.length - 1];
    }

    generateNextBlock(data: string) {
        const prevBlock = this.getLastBlock();
        const nextIndex = prevBlock.getIndex() + 1;
        const nextTimestamp = new Date().getTime() / 1000;
        const nextHash = Block.generateHash(nextIndex, prevBlock.getHash(), nextTimestamp, data);
        return new Block(nextIndex, nextHash, prevBlock.getHash(), nextTimestamp, data);
    }
}