# Ziva Dashboard

A modern React TypeScript dashboard application with analytics, user management, and data visualization features.

## 🚀 Features

- **Dashboard Overview**: Comprehensive analytics and metrics
- **User Management**: User profiles and group management
- **Analytics**: Data visualization with Chart.js
- **Device Management**: Device tracking and monitoring
- **Finance**: Billing and financial analytics
- **Diary Analysis**: User diary data analysis
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Routing**: React Router DOM
- **Charts**: Chart.js with React Chart.js 2
- **Styling**: CSS3 with modern animations
- **Build Tool**: Create React App
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/stefansila/Ziva-Dashboard.git
cd Ziva-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## 🚀 Deployment

### Deploy to Vercel

1. **Automatic Deployment** (Recommended):
   - Connect your GitHub repository to Vercel
   - Vercel will automatically deploy on every push to main branch

2. **Manual Deployment**:
   ```bash
   npm run build
   npx vercel --prod
   ```

3. **Using Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

The project includes a `vercel.json` configuration file optimized for React applications.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Charts/         # Chart components
│   └── Animations/     # Animation components
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Analytics.tsx   # Analytics page
│   ├── Users.tsx       # User management
│   └── ...
├── data/               # Data and mock data
└── App.tsx             # Main app component
```

## 🎯 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App.

## 🌐 Live Demo

Visit the live application: [Ziva Dashboard on Vercel](https://ziva-dashboard.vercel.app)

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

Stefan Sila - [@stefansila](https://github.com/stefansila)
