import { sha256 } from "./utils/sha256";

export class Block {
    prevHash: string;
    rootHash: string;
    nonce: number;
    timestamp: number;
  
    constructor(prevHash: string, rootHash: string, nonce: number) {
      this.prevHash = prevHash;
      this.rootHash = rootHash;
      this.nonce = nonce;
      this.timestamp = Date.now();
    }
  
    // Method to calculate the block's hash
    calculateHash(): string {
      const data = this.prevHash + this.rootHash + this.nonce + this.timestamp;
      return sha256(data);
    }
  }