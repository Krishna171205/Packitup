import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Splash } from './screens/Splash';
import { Onboarding } from './screens/Onboarding';
import { Login, Register, ProfileSetup } from './screens/Auth';
import { RoleSelection } from './screens/RoleSelection';
import { AppLayout } from './components/AppLayout';
import { Home } from './screens/Home';
import { ProjectsListScreen } from './screens/ProjectsListScreen';
import { CreateProjectWizard } from './screens/CreateProjectWizard';
import { AIAnalysisScreen } from './screens/AIAnalysisScreen';
import { PackagingBlueprintScreen } from './screens/PackagingBlueprintScreen';
import { OptionsComparisonScreen } from './screens/OptionsComparisonScreen';
import { SuppliersListScreen } from './screens/SuppliersListScreen';
import { SupplierDetailScreen } from './screens/SupplierDetailScreen';
import { RequestQuoteScreen } from './screens/RequestQuoteScreen';
import { QuotesComparisonScreen } from './screens/QuotesComparisonScreen';
import { SupplierRFQsScreen } from './screens/SupplierRFQsScreen';
import { OrderTrackingScreen } from './screens/OrderTrackingScreen';
import { PerformanceFeedbackScreen } from './screens/PerformanceFeedbackScreen';
import { MessagesScreen } from './screens/MessagesScreen';
import { ChatDetailScreen } from './screens/ChatDetailScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';

// Enhanced Ecosystem Screens
import { ConverterHomeScreen } from './screens/ConverterHomeScreen';
import { ConverterRFQsScreen } from './screens/ConverterRFQsScreen';
import { MaterialProducerHomeScreen } from './screens/MaterialProducerHomeScreen';
import { MaterialCatalogScreen } from './screens/MaterialCatalogScreen';
import { PackhouseHomeScreen } from './screens/PackhouseHomeScreen';
import { AnalyticsDashboardScreen } from './screens/AnalyticsDashboardScreen';
import { TransporterHomeScreen } from './screens/TransporterHomeScreen';
import { TransportCompatibilityScreen } from './screens/TransportCompatibilityScreen';
import { MultiRFQScreen } from './screens/MultiRFQScreen';
import { LiveBiddingScreen } from './screens/LiveBiddingScreen';
import { QRTraceabilityScreen } from './screens/QRTraceabilityScreen';
import { ControlPanel } from './screens/ControlPanel';

export const router = createBrowserRouter([
  {
    path: '/control',
    element: <ControlPanel />,
  },
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/role-selection',
    element: <RoleSelection />,
  },
  {
    path: '/profile-setup',
    element: <ProfileSetup />,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'projects',
        element: <ProjectsListScreen />,
      },
      {
        path: 'projects/new',
        element: <CreateProjectWizard />,
      },
      {
        path: 'projects/:id',
        element: <PackagingBlueprintScreen />,
      },
      {
        path: 'projects/:id/analysis',
        element: <AIAnalysisScreen />,
      },
      {
        path: 'projects/:id/blueprint',
        element: <PackagingBlueprintScreen />,
      },
      {
        path: 'projects/:id/options',
        element: <OptionsComparisonScreen />,
      },
      {
        path: 'projects/:id/tier-select',
        element: <OptionsComparisonScreen />,
      },
      {
        path: 'projects/:id/multi-rfq',
        element: <MultiRFQScreen />,
      },
      {
        path: 'projects/:id/bidding',
        element: <LiveBiddingScreen />,
      },
      {
        path: 'projects/:id/qr',
        element: <QRTraceabilityScreen />,
      },
      {
        path: 'projects/:id/suppliers',
        element: <SuppliersListScreen />,
      },
      {
        path: 'projects/:id/rfq',
        element: <RequestQuoteScreen />,
      },
      {
        path: 'projects/:id/quotes',
        element: <QuotesComparisonScreen />,
      },
      {
        path: 'projects/:id/comparison',
        element: <QuotesComparisonScreen />,
      },
      {
        path: 'projects/:id/order',
        element: <OrderTrackingScreen />,
      },
      {
        path: 'projects/:id/performance',
        element: <PerformanceFeedbackScreen />,
      },

      // Converter Routes
      {
        path: 'converter/home',
        element: <ConverterHomeScreen />,
      },
      {
        path: 'converter/rfqs',
        element: <ConverterRFQsScreen />,
      },
      {
        path: 'converter/auctions',
        element: <LiveBiddingScreen />,
      },
      {
        path: 'converter/orders',
        element: <ProjectsListScreen />,
      },

      // Material Producer Routes
      {
        path: 'material/home',
        element: <MaterialProducerHomeScreen />,
      },
      {
        path: 'material/catalog',
        element: <MaterialCatalogScreen />,
      },
      {
        path: 'material/inquiries',
        element: <MaterialCatalogScreen />,
      },

      // Packhouse Routes
      {
        path: 'packhouse/home',
        element: <PackhouseHomeScreen />,
      },
      {
        path: 'packhouse/analytics',
        element: <AnalyticsDashboardScreen />,
      },
      {
        path: 'packhouse/compliance',
        element: <AnalyticsDashboardScreen />,
      },

      // Transporter Routes
      {
        path: 'transporter/home',
        element: <TransporterHomeScreen />,
      },
      {
        path: 'transporter/shipments',
        element: <TransporterHomeScreen />,
      },
      {
        path: 'transporter/check',
        element: <TransportCompatibilityScreen />,
      },

      // Global Direct Routes
      {
        path: 'analytics',
        element: <AnalyticsDashboardScreen />,
      },
      {
        path: 'material-catalog',
        element: <MaterialCatalogScreen />,
      },
      {
        path: 'suppliers',
        element: <SuppliersListScreen />,
      },
      {
        path: 'suppliers/:id',
        element: <SupplierDetailScreen />,
      },
      {
        path: 'rfq',
        element: <SupplierRFQsScreen />,
      },
      {
        path: 'rfq/:id',
        element: <SupplierRFQsScreen />,
      },
      {
        path: 'messages',
        element: <MessagesScreen />,
      },
      {
        path: 'messages/:id',
        element: <ChatDetailScreen />,
      },
      {
        path: 'notifications',
        element: <NotificationsScreen />,
      },
      {
        path: 'profile',
        element: <ProfileScreen />,
      },
      {
        path: 'settings',
        element: <SettingsScreen />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/app/home" replace />,
  },
]);

