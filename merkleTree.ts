import * as crypto from 'crypto';

function sha256(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// build a Merkle Tree and return the Merkle Root hash
function buildMerkleTree(leaves: string[]): string {
  if (leaves.length === 1) {
    return leaves[0];  // Merkle Root
  }

  const newLevel: string[] = [];

  for (let i = 0; i < leaves.length; i += 2) {
    if (i + 1 < leaves.length) {
      const combinedHash = sha256(leaves[i] + leaves[i + 1]);
      newLevel.push(combinedHash);
    } else {
      newLevel.push(leaves[i]);
    }
  }

  // Recursively build the tree until we get the root
  return buildMerkleTree(newLevel);
}




const transactions: string[] = [
  'Transaction number 1',
  'Transaction number 2',
  'Transaction number 3',
  'Transaction number 4',
  'Transaction number 5'
];

const leaves: string[] = transactions.map(tx => sha256(tx));
const merkleRoot: string = buildMerkleTree(leaves);

console.log(`Merkle Root: ${merkleRoot}`);
