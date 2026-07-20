# Crypto Market Dashboard

A high-performance, dark-themed trading dashboard built with React and TypeScript, designed to display real-time cryptocurrency market data.

## Overview

This project provides a sleek, glassmorphic user interface for tracking top cryptocurrencies. It fetches live data from the CoinGecko API and features local authentication, client-side pagination, and an optimized state management architecture designed to handle API rate constraints gracefully.

## Key Features

- **Market Watch Table**: A paginated, sortable, and filterable data table displaying asset name, symbol, current price, 24-hour volume, and 24-hour price change percentage.
- **Detailed Asset View**: A dedicated panel that dynamically updates upon row selection, displaying extended market metrics (24h High/Low, Market Rank) with responsive design considerations.
- **Resilient Data Fetching**: Robust loading, error, and empty states. Features manual refresh capabilities that are automatically disabled during active network requests to prevent duplicate calls.
- **Simulated Authentication**: Secure-feeling local authentication flow using Zustand's persist middleware to maintain session state across reloads.
- **Premium UI/UX**: Implemented a modern "Aura" aesthetic utilizing Tailwind CSS v4, custom glassmorphism utility classes, and optimized micro-animations.
- **Monospace Numeric Styling**: All prices, percentages, and financial figures use `font-mono` with `tabular-nums` to ensure consistent digit widths and prevent layout shifts when values update in real time.

## Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: Zustand
- **API**: CoinGecko (Public API)

## Architectural Decisions & Trade-offs

### State Management Strategy: Zustand vs. TanStack Query
The initial requirements suggested using TanStack Query for data fetching. However, a deliberate architectural decision was made to use Zustand instead. 

**Rationale:**
The CoinGecko public API has strict and aggressive free-tier rate limits, frequently resulting in HTTP 429 (Too Many Requests) errors upon repeated calls. TanStack Query is fundamentally designed for server-state caching, automatic background refetching loops, and network-level pagination. Utilizing TanStack Query in this context would rapidly exhaust the rate limit and degrade the user experience.

To guarantee application stability, the architecture was designed to perform a single bulk fetch of the top 100 assets into memory. All subsequent filtering, searching, and pagination are handled synchronously on the client side using Zustand. This approach entirely circumvents the rate-limiting bottlenecks of the free-tier API while providing instantaneous interactions for the user. TanStack Query would act as an anti-pattern when dealing with strict local array slicing and deferred synchronization.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmedshaheenreal/task-dashboard.git
 
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided in the terminal (typically `http://localhost:5173`).

### Usage
Upon launching the application, you will be prompted with a simulated authentication terminal. Enter any Trader Alias to proceed. The session will persist locally until you utilize the logout function within the user profile dropdown located at the top right of the dashboard.
