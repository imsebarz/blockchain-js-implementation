import { sha256 } from "./sha256";

// build a Merkle Tree and return the Merkle Root hash
export function buildMerkleTree(leaves: string[]): string {
  console.log('Leaves: ', leaves)
  if (leaves.length === 1) {
    return leaves[0];  // Merkle Root
  }

  const newLevel: string[] = [];

  for (let i = 0; i < leaves.length; i += 2) {
    if (i + 1 < leaves.length) {
      //We hash in pairs of two transactions
      const combinedHash = sha256(leaves[i] + leaves[i + 1]);
      //Push the hash of the two transactions to the next level
      newLevel.push(combinedHash);
    } else {
      //if number is odd, push to that leaf next level
      newLevel.push(leaves[i]);
    }
  }
  console.log('----------- Next Level ---------------')
  // Recursively build the tree until we get the root
  return buildMerkleTree(newLevel);
}

