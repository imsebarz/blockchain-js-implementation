import { Block } from "./Block";
import { buildMerkleTree } from "./utils/merkleTree";
import { sha256 } from "./utils/sha256";


function createBlocksFromTransactions(transactions: string[]): Block[] {
  const maxTransactionsPerBlock = 5;
  const blocks: Block[] = [];
  let prevHash = '0'.repeat(64); // Genesis block previous hash

  for (let i = 0; i < transactions.length; i += maxTransactionsPerBlock) {
    //slice the transactions to fit max transaction limti
    const transactionSlice = transactions.slice(i, i + maxTransactionsPerBlock);
  
    const leaves: string[] = transactionSlice.map(tx => sha256(tx));
    const merkleRoot: string = buildMerkleTree(leaves);
    const nonce = Math.floor(Math.random() * 100000); // Example nonce
    const block = new Block(prevHash, merkleRoot, nonce);
    prevHash = block.calculateHash();
    blocks.push(block);
  }

  return blocks;
}

// Example usage:
const transactions: string[] = [
  'Transaction number 1',
  'Transaction number 2',
  'Transaction number 3',
  'Transaction number 4',
  'Transaction number 5',
  'Transaction number 6',
  'Transaction number 7',
  'Transaction number 8',
  'Transaction number 9',
  'Transaction number 10',
  'Transaction number 11'
];

const blocks = createBlocksFromTransactions(transactions);

// Display the blocks
blocks.forEach((block, index) => {
  console.log(`Block ${index + 1}:`);
  console.log(`Prev Hash: ${block.prevHash}`);
  console.log(`Merkle Root: ${block.rootHash}`);
  console.log(`Nonce: ${block.nonce}`);
  console.log(`Timestamp: ${block.timestamp}`);
  console.log(`Block Hash: ${block.calculateHash()}`);
  console.log('-----------------------------');
});