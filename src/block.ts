import * as CryptoJS from 'crypto-js';

export class Block {
    private index: number;
    private hash: string;
    private prevHash: string;
    private data: string;
    private timestamp: number;

    constructor(
        index: number,
        hash: string,
        prevHash: string,
        timestamp: number,
        data: string,
    ) {
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.data = data;
    }

    static generateHash(
        index: number,
        prevHash: string,
        timestamp: number,
        data: string
    ) {
        return CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
    }

    static isBlocksValid(next: Block, prev: Block) {
        if (prev.index + 1 !== next.index) return false;
        if (prev.hash !== next.prevHash) return false;
        if (Block.generateHash(next.index, next.prevHash, next.timestamp, next.data) !== next.hash) return false;
        return true;
    }

    setData(data: string) {
        this.data = data;
    }

    getIndex() {
        return this.index;
    }

    getHash() {
        return this.hash;
    }

    getData() {
        return this.data;
    }
}