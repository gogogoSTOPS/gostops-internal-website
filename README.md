# GoStops Internal Website

Internal website for the GoStops team built with React and Vite.

## Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.11.0** - Client-side routing
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (optional):
   ```bash
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_NAME=GoStops Internal
   VITE_APP_ENV=development
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the app for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Other Scripts

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
│   ├── Dashboard.jsx
│   ├── Team.jsx
│   ├── Projects.jsx
│   └── Settings.jsx
├── layouts/        # Layout components
│   └── MainLayout.jsx
├── utils/          # Utility functions
├── hooks/          # Custom React hooks
├── App.jsx         # Main app component with routing
└── main.jsx        # Entry point
```

## Features

- ✅ Modern React setup with Vite
- ✅ Client-side routing with React Router
- ✅ Responsive sidebar navigation
- ✅ Dashboard with statistics
- ✅ Team management page
- ✅ Projects overview
- ✅ Settings page
- ✅ Tailwind CSS for styling
- ✅ ESLint configuration

## Environment Variables

All environment variables must be prefixed with `VITE_` to be exposed to the client. Create a `.env` file in the root directory:

```
VITE_API_URL=your_api_url
VITE_APP_NAME=GoStops Internal
```

## Contributing

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Ensure all tests pass (if applicable)

## License

Private - Internal use only
