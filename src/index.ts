import { buildMerkleTree } from "./utils/merkleTree";
import { sha256 } from "./utils/sha256";

const transactions: string[] = [
    'Transaction number 1',
    'Transaction number 2',
    'Transaction number 3',
    'Transaction number 4',
    'Transaction number 5'
  ];
  
  
  console.log(transactions)
  const leaves: string[] = transactions.map(tx => sha256(tx));
  const merkleRoot: string = buildMerkleTree(leaves);
  
  console.log(`Merkle Root: ${merkleRoot}`);
  