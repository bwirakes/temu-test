# Next.js 15 Project

This is a Next.js 15 application that can be run locally for development.

## Getting Started

These instructions will get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Features

- Next.js 15 with App Router
- TypeScript support
- Tailwind CSS for styling
- Radix UI components
- Shadcn UI integration

## Project Structure

- `/app`: Contains all pages and layouts using the App Router
- `/components`: Reusable UI components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and shared code

## Deployment

This project is configured for static exports with:

```js
// next.config.js
{
  output: 'export'
}
```

To build the project for production:

```bash
npm run build
```

The output will be in the `/out` directory.

## Migrated to Next.js 15

This project has been migrated to Next.js 15 with the following changes:

- Updated dependencies in package.json
- Updated next.config.js for Next.js 15 compatibility
- Configured default caching behavior with staleTimes
- Replaced experimental.serverComponentsExternalPackages with serverExternalPackages

## License

This project is licensed under the MIT License - see the LICENSE file for details. # temu-test
