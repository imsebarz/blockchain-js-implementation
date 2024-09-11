import { Block } from "./Block";
import { TransactionI as Transaction } from "./interfaces/Transaction";
import { WalletManager } from "./WalletManager";


// Initialize WalletManager and set initial balances
const walletManager = new WalletManager();
walletManager.initializeWallet("Alice");
walletManager.initializeWallet("Bob");
walletManager.initializeWallet("Charlie");
walletManager.initializeWallet("Dave");
walletManager.initializeWallet("Eve");

// Set initial balances for Alice and Bob using setBalance
walletManager.setBalance("Alice", 100); // Alice starts with 100 units
walletManager.setBalance("Bob", 50);    // Bob starts with 50 units
walletManager.setBalance("Charlie", 50);    // Charlie starts with 50 units
walletManager.setBalance("Dave", 50);    // Dave starts with 50 units
walletManager.setBalance("Eve", 50);    // Dave starts with 50 units

// Example transactions
const transactions: Transaction[] = [
  { sender: 'Alice', receiver: 'Bob', amount: 30, timestamp: Date.now() },
  { sender: 'Bob', receiver: 'Charlie', amount: 40, timestamp: Date.now() },
  { sender: 'Charlie', receiver: 'Dave', amount: 20, timestamp: Date.now() },
  { sender: 'Dave', receiver: 'Eve', amount: 30, timestamp: Date.now() },
  { sender: 'Eve', receiver: 'Alice', amount: 25, timestamp: Date.now() },
  { sender: 'Alice', receiver: 'Charlie', amount: 40, timestamp: Date.now() },
  { sender: 'Charlie', receiver: 'Bob', amount: 60, timestamp: Date.now() },
  { sender: 'Bob', receiver: 'Eve', amount: 5, timestamp: Date.now() },
  { sender: 'Eve', receiver: 'Dave', amount: 3, timestamp: Date.now() },
  { sender: 'Dave', receiver: 'Alice', amount: 15, timestamp: Date.now() },
  { sender: 'Alice', receiver: 'Bob', amount: 10, timestamp: Date.now() },
  { sender: 'Bob', receiver: 'Charlie', amount: 20, timestamp: Date.now() },
  { sender: 'Charlie', receiver: 'Eve', amount: 10, timestamp: Date.now() },
  { sender: 'Eve', receiver: 'Alice', amount: 10, timestamp: Date.now() },
  { sender: 'Alice', receiver: 'Dave', amount: 5, timestamp: Date.now() }
];


// Set difficulty level (e.g., 4 leading zeros)
const difficulty = 4;

// Create blocks from transactions with the specified difficulty and verify transactions
const blocks = Block.createBlocks(transactions, difficulty, walletManager);

// Display the wallet balances and blocks
walletManager.printBalances();
blocks.forEach((block, index) => {
  console.log('-----------------------------');
  console.log(`Block ${index + 1}:`);
  console.log(`Prev Hash: ${block.prevHash}`);
  console.log(`Merkle Root: ${block.rootHash}`);
  console.log(`Nonce: ${block.nonce}`);
  console.log(`Timestamp: ${block.timestamp}`);
  console.log(`Block Hash: ${block.calculateHash()}`);
  console.log('Transactions:');
  console.table(block.transactions); // Print in tabular format
  console.log('-----------------------------');
});
