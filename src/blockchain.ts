import { Block } from './block';

export class Blockchain {
    private blocks: Block[];

    constructor(blocks: Block[]) {
        this.blocks = blocks;
    }

    isValid() {
        if (!this.blocks[0].isGenesis()) return false;

        for (let i = 1; i < this.blocks.length; i++) {
            if (!Block.isBlocksValid(this.blocks[i], this.blocks[i - 1])) return false;
        }

        return true;
    }

    addBlock(newBlock: Block) {
        if (Block.isBlocksValid(newBlock, this.getLastBlock())) {
            this.blocks = [...this.blocks, newBlock ];
        }
    }

    replace(newBlocks: Block[]) {
        const newBlockChain = new Blockchain(newBlocks);

        if (!newBlockChain.isValid() || newBlockChain.blocks.length <= this.blocks.length) {
            console.log('Received blockchain invalid');
            return;
        }

        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');

        this.blocks = newBlockChain.blocks;
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