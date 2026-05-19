# ⟠ Etherbrige — Production-Style Ethereum DApp

A full-stack decentralized application (DApp) built with **React**, **Node.js/Express**, **Ethers.js**, and **Ganache**. Demonstrates real-time Ethereum account management, ETH transfers, and professional blockchain dashboard UI.

---

## 🖼️ Screenshots


> — Main dashboard with account cards
> - <img width="1063" height="594" alt="image" src="https://github.com/user-attachments/assets/080b8e51-7818-4ae2-bf9a-1a26a7fbce90" />

> — Transfer form with validation
> - <img width="969" height="531" alt="image" src="https://github.com/user-attachments/assets/e264daae-f1be-4b4e-860f-54018dd6c179" /><img width="969" height="531" alt="image" src="https://github.com/user-attachments/assets/63fc260a-b145-484d-8be7-a55ba798136b" />


> — Transaction confirmation receipt
> - <img width="969" height="531" alt="image" src="https://github.com/user-attachments/assets/6a00cb55-daa3-4dd6-b7d6-55d6c58374df" />


---

## 🧱 Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS, Framer Motion      |
| Backend     | Node.js, Express.js, Ethers.js v6                |
| Blockchain  | Ganache (local Ethereum testnet)                 |
| HTTP Client | Axios                                            |
| Validation  | express-validator (backend), inline (frontend)   |
| Toasts      | react-hot-toast                                  |
| Security    | helmet, cors, dotenv                             |

---

## 📁 Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── config/blockchain.js         ← Ethers provider setup
│   │   ├── controllers/
│   │   │   ├── accountController.js     ← GET accounts + balances
│   │   │   └── transactionController.js ← POST transfer
│   │   ├── routes/
│   │   │   ├── accountRoutes.js
│   │   │   └── transactionRoutes.js
│   │   ├── middleware/
│   │   │   ├── errorMiddleware.js       ← Centralized error handler
│   │   │   └── validationMiddleware.js  ← express-validator wrapper
│   │   ├── utils/
│   │   │   ├── formatBalance.js
│   │   │   └── validators.js
│   │   ├── app.js                       ← Express app config
│   │   └── server.js                   ← Entry point
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/blockchainApi.js         ← Axios service layer
│   │   ├── components/
│   │   │   ├── layout/                  ← Navbar, DashboardLayout
│   │   │   ├── accounts/                ← AccountCard, AccountGrid, BalanceBadge
│   │   │   ├── transfer/                ← TransferForm, TransactionStatus
│   │   │   └── common/                  ← Button, Input, Loader, ToastProvider
│   │   ├── hooks/
│   │   │   ├── useAccounts.js           ← Account fetching logic
│   │   │   └── useTransfer.js           ← Transfer form state + submission
│   │   ├── pages/Dashboard.jsx          ← Main page
│   │   ├── utils/                       ← shortenAddress, copyToClipboard, formatCurrency
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── package.json                         ← Root concurrently scripts
└── README.md
```

---

## ⚙️ Prerequisites

| Tool    | Version  | Download |
|---------|----------|----------|
| Node.js | ≥ 18.x   | https://nodejs.org |
| Ganache | ≥ 7.x    | https://trufflesuite.com/ganache |
| npm     | ≥ 9.x    | Included with Node.js |

---

## 🚀 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourname/etherflow-dapp.git
cd etherflow-dapp
```

### 2. Start Ganache

Open **Ganache GUI** or run:

```bash
npx ganache --port 7545 --chain.chainId 1337 --accounts 10
```

Make sure Ganache is running at `http://127.0.0.1:7545`.

### 3. Configure Environment

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` if needed (default values work with standard Ganache):

```env
PORT=5001
GANACHE_RPC_URL=http://127.0.0.1:7545
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 4. Install All Dependencies

```bash
# Root
npm install

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 5. Run the Application

From the project root:

```bash
npm run dev
```

This starts both backend (`http://localhost:5001`) and frontend (`http://localhost:5173`) concurrently.

---

## 🔌 API Endpoints

### `GET /api/health`
Returns API health status.

```json
{ "success": true, "status": "API is running", "timestamp": "..." }
```

---

### `GET /api/accounts`
Returns first 10 Ganache accounts with ETH balances.

```json
{
  "success": true,
  "count": 10,
  "accounts": [
    { "address": "0xABC...", "balance": "99.9982", "balanceRaw": "99.99820000..." }
  ]
}
```

---

### `POST /api/transfer`
Transfer ETH between accounts.

**Request body:**
```json
{ "from": "0xSENDER...", "to": "0xRECEIVER...", "amount": "1.5" }
```

**Response:**
```json
{
  "success": true,
  "message": "Transfer successful",
  "transaction": {
    "hash": "0xTX_HASH",
    "from": "0xSENDER",
    "to": "0xRECEIVER",
    "amount": "1.5",
    "blockNumber": 5,
    "gasUsed": "21000",
    "status": "confirmed"
  },
  "updatedBalances": { "from": "98.4982", "to": "101.5000" }
}
```

---

## ✅ Validation Rules

| Field  | Rules |
|--------|-------|
| `from` | Non-empty, valid Ethereum address |
| `to`   | Non-empty, valid Ethereum address, must differ from `from` |
| `amount` | Positive number, less than sender's balance |

---

## 🔐 Security Considerations

- **Helmet.js** sets secure HTTP headers
- **CORS** restricted to frontend origin via env variable
- **express-validator** sanitizes and validates all inputs
- **dotenv** keeps secrets out of source code
- **Environment variables** for all configurable values
- No private keys stored — Ganache unlocks accounts automatically for local development

> ⚠️ **This app is for local development only.** Do not expose Ganache or the backend to the public internet.

---

## 🔄 Transaction Flow

```
User Input
    │
    ▼
Frontend Validation (useTransfer hook)
    │
    ▼
POST /api/transfer  →  express-validator middleware
    │
    ▼
transactionController.js
    ├── Validate addresses (ethers.isAddress)
    ├── Check sufficient balance
    ├── getSigner(from) → Ganache unlocked account
    ├── signer.sendTransaction({ to, value })
    ├── await tx.wait() → receipt
    └── Return hash, blockNumber, gasUsed, updatedBalances
    │
    ▼
Frontend receives receipt
    ├── Updates account balances (optimistic update)
    ├── Shows success toast
    └── Displays TransactionStatus component
```

---

## 🧪 Testing Instructions

1. Launch Ganache and confirm 10 funded accounts appear.
2. Open `http://localhost:5173` in your browser.
3. Use the **Transfer ETH** panel on the right.
4. Select sender and receiver accounts from the dropdowns.
5. Enter an ETH amount (e.g. `1`).
6. Click **Send ETH**.
7. Observe:
   - Loading spinner during transaction
   - Success toast notification
   - Updated account balances in the grid
   - Transaction receipt panel (hash, block, gas)

**Error scenarios to test:**
- Same sender/receiver → validation error
- Amount > balance → insufficient funds error
- 0 or negative amount → validation error
- Ganache offline → API error toast

---

## 🚀 Future Improvements

- [ ] MetaMask wallet integration (window.ethereum)
- [ ] Transaction history table with persistence
- [ ] ERC-20 token transfer support
- [ ] WebSocket for real-time balance updates
- [ ] Smart contract deployment interface
- [ ] Multi-network support (Sepolia, Mainnet)
- [ ] Unit tests (Vitest + Supertest)
- [ ] Docker compose for one-command setup
- [ ] Dark/light theme toggle
- [ ] CSV export of transaction history

---

## 🌐 Deployment Considerations

For production deployment, replace Ganache with a proper network:

1. Update `GANACHE_RPC_URL` in `.env` to Infura/Alchemy endpoint
2. Implement wallet signing (MetaMask, WalletConnect)
3. Never expose a funded private key in environment variables
4. Add rate limiting (`express-rate-limit`)
5. Add HTTPS (reverse proxy via nginx or Caddy)
6. Build frontend: `cd frontend && npm run build`
7. Serve `frontend/dist` with a static file server

---

## 📄 License

MIT — Free to use for educational and portfolio purposes.
