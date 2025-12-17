# LuxeMarket - Multi-Vendor E-Commerce Simulation

This is a complete frontend simulation of a multi-vendor e-commerce platform. It features a fully functional shopping experience with mock data, client-side state management, and premium UI design.

## Features

- **Storefront**: Homepage, Product Listing, Search & Filters
- **Product Details**: Image gallery, specific product info, related items
- **Shopping Cart**: Fully functional cart with local storage persistence
- **Checkout**: Simulated checkout flow
- **User Account**: Login, Register, Profile, Order History (Simulated)
- **Vendor Dashboard**: Dedicated area for vendors to manage products and view analytics

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open your browser to see the result.

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

1. Push this code to a Git repository (GitHub, GitLab, Bitbucket).
2. Import the project into Vercel.
3. **Important**: Select the `frontend` directory as the **Root Directory** in the Vercel Project Settings if asked (or if deploying the monorepo).
4. The build command should be `next build` (default).
5. Click **Deploy**.

Since this simulation uses mock data and no external API, no environment variables are required for the basic functionality.

## Project Structure

- `/app`: App Router pages and layouts
- `/components`: Reusable UI components
- `/contexts`: React Context for state (Auth, Cart)
- `/utils`: Mock data and helper functions
