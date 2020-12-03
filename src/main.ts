import { Blockchain } from './blockchain';
import { genesisBlock } from './genesis';

const blockchain = new Blockchain([genesisBlock]);

console.log(blockchain)