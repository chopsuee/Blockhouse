# Real-Time Cryptocurrency Price Tracker with Interactive Data Display

A Next.js application that provides real-time cryptocurrency price tracking with an interactive table interface. The application fetches live data from the CoinCap API and presents it in a responsive, paginated table with search functionality.

This project combines modern web technologies to deliver a seamless cryptocurrency tracking experience. Built with Next.js and TypeScript, it leverages React Query for efficient data fetching and state management, while using Tailwind CSS for responsive styling. The application provides real-time price updates, search filtering, and pagination capabilities to help users monitor cryptocurrency market data effectively.

The project includes comprehensive documentation powered by Docusaurus, making it easy for developers to understand and contribute to the codebase.

## Repository Structure
```
pricetracker/
├── app/                      # Next.js application core
│   ├── globals.css          # Global styles including Tailwind CSS imports
│   ├── layout.tsx           # Root layout component with metadata
│   ├── page.tsx            # Home page component with QueryClient setup
│   └── tracker/            # Cryptocurrency tracker feature
│       └── page.tsx        # Main price tracker component
├── docs/                    # Documentation site powered by Docusaurus
│   ├── blog/               # Blog posts and author information
│   ├── docs/               # Technical documentation and tutorials
│   └── src/                # Documentation site source files
├── package.json            # Project dependencies and scripts
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── postcss.config.mjs     # PostCSS configuration for Tailwind
```

## Usage Instructions
### Prerequisites
- Node.js >= 18.0
- npm or yarn package manager
- Basic understanding of React and TypeScript

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd pricetracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Quick Start
1. Navigate to the application in your browser at `http://localhost:3000`
2. The main page displays a table of cryptocurrency data
3. Use the search bar to filter cryptocurrencies by name
4. Click the "Refresh Data" button to fetch the latest prices
5. Use pagination controls to navigate through the results

### More Detailed Examples
```typescript
// Fetch cryptocurrency data
const { data, isLoading } = useQuery<{ data: Crypto[] }>({
  queryKey: ['cryptoData'],
  queryFn: async () => {
    const response = await axios.get('https://api.coincap.io/v2/assets')
    return response.data
  },
})

// Filter cryptocurrencies
const filteredData = cryptoData.filter((crypto) =>
  crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
)
```

### Troubleshooting
Common issues and solutions:

1. Data not loading
   - Check your internet connection
   - Verify the CoinCap API is accessible
   - Enable debug mode by adding `?debug=true` to the URL

2. Search not working
   - Clear browser cache
   - Ensure search term is properly formatted
   - Check browser console for errors

3. Performance issues
   - Reduce the number of rows per page
   - Clear browser cache
   - Monitor network tab for API response times

## Data Flow
The application follows a straightforward data flow pattern for fetching and displaying cryptocurrency data.

```ascii
[User Interface] <-> [React Query Cache] <-> [CoinCap API]
     |                     |
     v                     v
[Search Filter]    [State Management]
     |                     |
     v                     v
[Filtered Data] -> [Paginated Display]
```

Key component interactions:
1. React Query manages API data fetching and caching
2. User interface components trigger data refresh and filtering
3. Search filter processes data in memory
4. Pagination controls manage data display
5. Price formatting utilities handle number presentation
6. Error boundaries catch and display API errors
7. Loading states manage user feedback during data fetches
