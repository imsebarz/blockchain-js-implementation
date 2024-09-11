import { TransactionI as Transaction } from "./interfaces/Transaction";

class WalletManager {
    private balances: { [key: string]: number } = {};
  
    constructor() {}
  
    // Initialize the balance of a wallet if not present
    initializeWallet(address: string): void {
      if (!this.balances[address]) {
        this.balances[address] = 0;
      }
    }
  
    // Set balance for a wallet directly (for initializing balances)
    setBalance(address: string, amount: number): void {
      this.balances[address] = amount;
    }
  
    // Get the current balance of a wallet
    getBalance(address: string): number {
      return this.balances[address] || 0;
    }
  
    // Update the balance after a valid transaction
    updateBalances(sender: string, receiver: string, amount: number): void {
      this.balances[sender] -= amount;
      this.initializeWallet(receiver);
      this.balances[receiver] += amount;
    }
  
    // Verify if a transaction is valid (i.e., the sender has enough balance)
    verifyTransaction(transaction: Transaction): boolean {
      const senderBalance = this.getBalance(transaction.sender);
      return senderBalance >= transaction.amount;
    }
  
    // Print all balances (for debugging purposes)
    printBalances(): void {
      console.log("Wallet balances:", this.balances);
    }
  }
  
  export { WalletManager };
  