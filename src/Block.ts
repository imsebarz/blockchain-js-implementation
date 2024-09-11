import { TransactionI as Transaction } from "./interfaces/Transaction";
import { buildMerkleTree } from "./utils/merkleTree";
import { sha256 } from "./utils/sha256";
import { WalletManager } from "./WalletManager";


class Block {
  prevHash: string;
  transactions: Transaction[];
  rootHash: string;
  nonce: number;
  timestamp: number;
  difficulty: number;

  constructor(
    prevHash: string,
    transactions: Transaction[],
    difficulty: number,
    private walletManager: WalletManager // Injecting WalletManager for transaction verification
  ) {
    this.prevHash = prevHash;
    this.transactions = transactions;
    this.nonce = 0; // Initialize nonce to 0
    this.timestamp = Date.now();
    this.rootHash = this.calculateMerkleRoot();
    this.difficulty = difficulty;
  }

  // Method to calculate the block's Merkle Root
  private calculateMerkleRoot(): string {
    const leaves: string[] = this.transactions.map(tx => sha256(JSON.stringify(tx)));
    return buildMerkleTree(leaves);
  }

  // Method to calculate the block's hash
  calculateHash(): string {
    const data = this.prevHash + this.rootHash + this.nonce + this.timestamp;
    return sha256(data);
  }

  // Method to mine the block (Proof of Work)
  mineBlock(): void {
    const target = '0'.repeat(this.difficulty); // Target hash prefix, e.g., "0000" for difficulty 4
    while (this.calculateHash().substring(0, this.difficulty) !== target) {
      this.nonce++;
    }
    console.log(`Block mined with nonce: ${this.nonce}, hash: ${this.calculateHash()}`);
  }

  // Verifying all transactions before mining the block
  verifyTransactions(): boolean {
    for (const transaction of this.transactions) {
      if (!this.walletManager.verifyTransaction(transaction)) {
        console.log(`Transaction from ${transaction.sender} to ${transaction.receiver} failed.`);
        return false; // Return false if any transaction is invalid
      }
    }
    return true;
  }

  // Static method to create blocks from transactions
  static createBlocks(transactions: Transaction[], difficulty: number, walletManager: WalletManager, maxTransactionsPerBlock: number = 5): Block[] {
    const blocks: Block[] = [];
    let prevHash = '0'.repeat(64); // Genesis block previous hash

    for (let i = 0; i < transactions.length; i += maxTransactionsPerBlock) {
      const transactionSlice = transactions.slice(i, i + maxTransactionsPerBlock);
      const block = new Block(prevHash, transactionSlice, difficulty, walletManager);

      // Verify transactions before mining the block
      if (block.verifyTransactions()) {
        block.mineBlock(); // Perform Proof of Work
        transactionSlice.forEach(tx => walletManager.updateBalances(tx.sender, tx.receiver, tx.amount)); // Update balances
        prevHash = block.calculateHash();
        blocks.push(block);
      } else {
        console.log("Block mining failed due to invalid transactions.");
      }
    }

    return blocks;
  }
}

export { Block };
