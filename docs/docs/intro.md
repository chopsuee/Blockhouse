---
sidebar_position: 1
---

# Introduction

Real-Time Cryptocurrency Price Tracker with Interactive Data Display is a Next.js application that provides real-time cryptocurrency price tracking with an interactive table interface. The application fetches live data from the CoinCap API and presents it in a responsive, paginated table with search functionality.

This project combines modern web technologies to deliver a seamless cryptocurrency tracking experience. Built with Next.js and TypeScript, it leverages React Query for efficient data fetching and state management, while using Tailwind CSS for responsive styling.

## Repository Structure

```jsx
pricetracker/
├── app/                      # Next.js application core
│   ├── globals.css          # Global styles including Tailwind CSS imports
│   ├── layout.tsx           # Root layout component with metadata
│   ├── page.tsx             # Home page component with QueryClient setup
│   └── tracker/             # Cryptocurrency tracker feature
│       └── page.tsx         # Main price tracker component
├── docs/                    # Documentation site powered by Docusaurus [[1]](https://hackernoon.com/how-we-built-our-software-documentation-on-docusaurus)
│   ├── blog/               # Blog posts and author information
│   ├── docs/               # Technical documentation and tutorials
│   └── src/                # Documentation site source files
├── package.json            # Project dependencies and scripts
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── postcss.config.mjs     # PostCSS configuration for Tailwind
