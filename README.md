# NewsApp

A React Native mobile application built with Expo that fetches and displays news articles using the [GNews API](https://gnews.io). Supports fetching N top headlines and searching articles by keyword or title.

---

## Features

- Fetch N top headlines (1–10 articles)
- Search articles by keyword, title, or author
- Blurhash image placeholders with smooth fade-in via `expo-image`
- Skeleton loading cards using React Native's `Animated` API
- Styled with NativeWind (Tailwind CSS for React Native)

---

## Prerequisites

Make sure the following are installed before running the app:

| Tool | Version | Install |
|---|---|---|
| Node.js | 18 or newer | [nodejs.org](https://nodejs.org) |
| Yarn | any | `npm install -g yarn` |
| Expo CLI | latest | `npm install -g expo-cli` |
| Expo Go app | latest | [iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) |

> Alternatively, you can run the app on an iOS Simulator (macOS only) or Android Emulator instead of Expo Go.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/NewsApp.git
cd NewsApp
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```bash
cp .env.example .env
```

Then open `.env` and fill in your GNews API key:

```
EXPO_PUBLIC_API_KEY=your_gnews_api_key_here
```

> Don't have an API key? Get one free at [gnews.io](https://gnews.io) — it takes less than a minute to register.

### 4. Start the development server

```bash
yarn start
```

This opens the Expo Dev Tools in your terminal. You will see a QR code.

---

## Running the App

### On a physical device (recommended)

1. Install **Expo Go** on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Make sure your phone and computer are on the **same Wi-Fi network**
3. Scan the QR code shown in the terminal with:
   - **iOS**: the Camera app
   - **Android**: the Expo Go app directly

### On iOS Simulator (macOS only)

```bash
yarn ios
```

Requires Xcode to be installed.

### On Android Emulator

```bash
yarn android
```

Requires Android Studio and an emulator to be set up.

---

## Project Structure

```
NewsApp/
├── app/
│   ├── _layout.tsx          # Root layout, imports global CSS
│   ├── global.css           # Tailwind directives
│   └── index.tsx            # Home screen (orchestration only)
├── api/
│   ├── base.ts              # Axios apiClient with error handling
│   └── endpoints.ts         # All API endpoint strings
├── services/
│   └── news.services.ts     # fetchTopHeadlines, searchArticles, findByTitle
├── components/
│   ├── article-card.tsx     # Article card with expo-image + blurhash
│   ├── skeleton-card.tsx    # Animated skeleton placeholder
│   ├── mode-tabs.tsx        # Headlines / Search tab switcher
│   ├── search-controls.tsx  # Count input + keyword input + Fetch button
│   ├── empty-state.tsx      # Empty state UI
│   └── error-state.tsx      # Error state UI with retry
├── types/
│   └── news.types.ts        # Article, NewsResponse, SearchMode types
├── .env.example             # Environment variable template
└── tailwind.config.js       # NativeWind config with brand color tokens
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_API_KEY` | Your GNews API key from [gnews.io](https://gnews.io) |

> Variables prefixed with `EXPO_PUBLIC_` are safely bundled into the client build by Expo.

---

## Tech Stack

| Library | Purpose |
|---|---|
| Expo SDK 54 | React Native framework |
| Expo Router 6 | File-based navigation |
| NativeWind 4 | Tailwind CSS styling for React Native |
| expo-image | Optimised image loading with blurhash placeholders |
| Axios | HTTP client with structured error handling |
| TypeScript | Strict static typing throughout |
