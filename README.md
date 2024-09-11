
# Blockchain JS Implementation

This is a simple JavaScript/TypeScript implementation of a blockchain with the following features:
- **Block creation**: Blocks are created containing transactions.
- **Merkle Tree**: Transactions are hashed into a Merkle Tree to provide data integrity.
- **Proof of Work**: Blocks are mined using a Proof of Work (PoW) algorithm, with configurable difficulty.
- **Wallet management**: A simple wallet management system that tracks balances and verifies if a wallet has enough funds for a transaction.
- **Transaction validation**: Transactions are validated before being added to the blockchain.

## Features

- **Blockchain with PoW**: A basic blockchain implementation with proof of work.
- **Transaction validation**: Ensure that wallets have enough funds to send in a transaction.
- **Merkle Tree**: Transactions are hashed into a Merkle Root for inclusion in blocks.
- **Wallet System**: Track balances for each wallet and update balances after transactions.
- **Custom difficulty**: You can adjust the mining difficulty (number of leading zeros in the hash).

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Block Structure](#block-structure)
- [Proof of Work](#proof-of-work)
- [Transaction Verification](#transaction-verification)
- [License](#license)

## Requirements

- Node.js (v12 or higher)
- TypeScript (v4.0 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blockchain-js-implementation.git
   ```
   
2. Navigate into the project directory:
   ```bash
   cd blockchain-js-implementation
   ```

3. Install any necessary dependencies (if you have any dependencies in the project):
   ```bash
   npm install
   ```

## Usage

1. **Compile the TypeScript code**:
   ```bash
   tsc
   ```

2. **Run the compiled JavaScript**:
   ```bash
   node dist/index.js
   ```

### Example

The example in `index.ts` simulates the creation of blocks with valid transactions:

```typescript
const transactions: Transaction[] = [
  { sender: 'Alice', receiver: 'Bob', amount: 30, timestamp: Date.now() },
  { sender: 'Bob', receiver: 'Charlie', amount: 40, timestamp: Date.now() },
  // More transactions...
];

// Create blocks with difficulty level of 4
const difficulty = 4;
const blocks = Block.createBlocks(transactions, difficulty, walletManager);
```

After running the program, you will see each block's details including the transactions in each block.

## Block Structure

Each block contains the following attributes:

- **Previous Hash**: The hash of the previous block, creating a linked chain.
- **Merkle Root**: The root of the Merkle Tree generated from the transactions.
- **Nonce**: The number used for Proof of Work to satisfy the difficulty.
- **Timestamp**: The time when the block was created.
- **Transactions**: The list of valid transactions included in the block.

### Example Output:

```
Block 1:
Prev Hash: 0000000000000000000000000000000000000000000000000000000000000000
Merkle Root: 7a1c07ec041d29acbbc555a4a24f9cc45ef3b104d35fbc6a44f2c18d4c019b0f
Nonce: 53085
Timestamp: 1629999919999
Block Hash: 00002a7c5f9f2840f205567d08b2239875f104bfcab19d0b21369e11837276bb
Transactions:
┌─────────┬───────────┬───────────┬─────────┬──────────────────────┐
│ (index) │  sender   │ receiver  │ amount  │      timestamp       │
├─────────┼───────────┼───────────┼─────────┼──────────────────────┤
│    0    │  'Alice'  │   'Bob'   │   30    │ 1629999919999 │
│    1    │   'Bob'   │ 'Charlie' │   40    │ 1629999919999 │
└─────────┴───────────┴───────────┴─────────┴──────────────────────┘
-----------------------------
```

## Proof of Work

Proof of Work (PoW) is used to mine each block. The mining process finds a valid hash by adjusting the nonce until the block hash has a certain number of leading zeros, which is determined by the difficulty level.

To change the mining difficulty, adjust the `difficulty` parameter when creating the blocks:

```typescript
const difficulty = 4; // Number of leading zeros
```

## Transaction Verification

Each transaction it is verified to ensure that the sender has sufficient balance before it is added to a block. If the transaction is invalid (i.e., the sender does not have enough funds), the transaction is rejected, and the block will not be mined.

### Wallet Balances

Wallet balances are tracked and updated after each valid transaction. You can set initial balances using the `setBalance` method:

```typescript
walletManager.setBalance("Alice", 100); // Alice starts with 100 units
walletManager.setBalance("Bob", 50);    // Bob starts with 50 units
```

## License

This project is licensed under the MIT License.

---

This simplified `README.md` assumes you are only using `tsc` and `node` to build and start the project without any complex setup or dependencies.