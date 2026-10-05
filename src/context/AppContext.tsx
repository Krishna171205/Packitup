import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FoodProduct,
  Material,
  PackagingStructure,
  Supplier,
  Project,
  ProjectOption,
  RFQ,
  Quote,
  ChatThread,
  MessageItem,
  MOCK_FOODS,
  MOCK_MATERIALS,
  MOCK_STRUCTURES,
  MOCK_SUPPLIERS,
  MOCK_PROJECTS,
  MOCK_PROJECT_OPTIONS,
  MOCK_RFQS,
  MOCK_QUOTES,
  MOCK_CHAT_THREADS,
  MOCK_MESSAGES,
  COMMODITIES,
  CommodityItem,
  ConverterProfile,
  MOCK_CONVERTERS,
  MaterialProducerProfile,
  MOCK_MATERIAL_PRODUCERS,
  ConverterRFQItem,
  MOCK_CONVERTER_RFQS,
  LiveBid,
  MOCK_LIVE_AUCTION,
  TransporterShipment,
  MOCK_TRANSPORTER_SHIPMENTS,
  PackhouseAnalytics,
  MOCK_ANALYTICS_DATA,
} from '../data/mockData';

export type UserRole = 'farmer' | 'converter' | 'material_producer' | 'packhouse' | 'transporter' | 'producer' | 'supplier' | 'brand';
export type ServiceTier = 'cost' | 'shelf_life' | 'smart';
export type Language = 'en' | 'hi';

export interface UserProfile {
  name: string;
  organization: string;
  role: UserRole;
  location: string;
  avatar: string;
  phone: string;
  email: string;
  cropsOrMaterials: string[];
  typicalVolume: string;
}

export interface AppNotification {
  id: string;
  title: string;
  hindiTitle?: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
  type: 'rfq' | 'quote' | 'order' | 'performance' | 'system';
}

interface AppContextType {
  role: UserRole;
  userRole: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  t: (en: string, hi?: string) => string;

  // Tier and Commodity
  selectedTier: ServiceTier;
  setSelectedTier: (tier: ServiceTier) => void;
  currentCommodity: CommodityItem | null;
  setCurrentCommodity: (c: CommodityItem | null) => void;

  // Data
  foods: FoodProduct[];
  commodities: CommodityItem[];
  materials: Material[];
  structures: PackagingStructure[];
  suppliers: Supplier[];
  converters: ConverterProfile[];
  materialProducers: MaterialProducerProfile[];
  projects: Project[];
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  getActiveProject: () => Project | undefined;
  getProjectOptions: (projectId: string) => ProjectOption[];

  // Mutations
  createProject: (data: Partial<Project>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  rfqs: RFQ[];
  sendRFQ: (rfq: Omit<RFQ, 'id' | 'status' | 'createdAt'>) => RFQ;
  sendMultiRFQ: (converterIds: string[], budget: number, deliveryDate: string) => void;
  quotes: Quote[];
  submitQuote: (quote: Omit<Quote, 'id' | 'createdAt'>) => Quote;
  selectQuote: (projectId: string, quoteId: string) => void;
  advanceOrderStep: (projectId: string, step: Project['orderTimeline']['step']) => void;
  submitPerformance: (projectId: string, perfData: Project['performanceData']) => void;

  // Converter & Live Auction
  converterRFQs: ConverterRFQItem[];
  setConverterRFQs: React.Dispatch<React.SetStateAction<ConverterRFQItem[]>>;
  submitConverterQuote: (rfqId: string, price: number, leadTime: number) => void;
  liveAuction: typeof MOCK_LIVE_AUCTION;
  submitLiveBid: (bidPerBag: number) => void;
  acceptLowestBid: () => void;

  // Transporter & Analytics
  transporterShipments: TransporterShipment[];
  analyticsData: PackhouseAnalytics;

  // Flywheel
  totalFeedbackSubmitted: number;
  aiAccuracyScore: number;
  recordFlywheelFeedback: (rating: number) => void;

  // Messaging
  chatThreads: ChatThread[];
  messages: Record<string, MessageItem[]>;
  sendMessage: (chatId: string, text: string, senderRole?: 'producer' | 'supplier') => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Global Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Seed / Reset demo
  resetToDemoState: () => void;
  jumpToDemoStep: (step: 'blueprint' | 'options' | 'suppliers' | 'quotes' | 'order' | 'performance') => void;
}

const DEFAULT_FARMER_USER: UserProfile = {
  name: 'Aaryan',
  organization: 'Farmer • Delhi NCR',
  role: 'farmer',
  location: 'Farmer • Delhi NCR',
  avatar: '👨‍🌾',
  phone: '+91 98712 34567',
  email: 'rajesh.greenfield@krishi.in',
  cropsOrMaterials: ['Banana', 'Tomato', 'Alphonso Mango', 'Potato'],
  typicalVolume: '500 - 2,000 kg / week',
};
const DEFAULT_PRODUCER_USER = DEFAULT_FARMER_USER;

const DEFAULT_CONVERTER_USER: UserProfile = {
  name: 'Vikram Mehta',
  organization: 'GreenPack Industries Ltd (Plant: Okhla)',
  role: 'converter',
  location: 'Okhla Phase III, New Delhi',
  avatar: '🏭',
  phone: '+91 98112 45890',
  email: 'v.mehta@greenpackindia.com',
  cropsOrMaterials: ['PET/PE Laminates', 'BOPP Micro-perforated', 'Active Barrier Films'],
  typicalVolume: '120 Tons / Month Capacity',
};
const DEFAULT_SUPPLIER_USER = DEFAULT_CONVERTER_USER;

const DEFAULT_MATERIAL_PRODUCER_USER: UserProfile = {
  name: 'Suresh Aggarwal',
  organization: 'Reliance Polymers Division',
  role: 'material_producer',
  location: 'Jamnagar Hub & Delhi Regional Depot',
  avatar: '🧪',
  phone: '+91 98220 11492',
  email: 'suresh.a@reliancetech.in',
  cropsOrMaterials: ['LDPE Film Grade', 'HDPE High Tenacity', 'BOPP Breathable Resin', 'EVOH Polymer'],
  typicalVolume: '850 MT / Month Production',
};

const DEFAULT_PACKHOUSE_USER: UserProfile = {
  name: 'Pooja Sundaram',
  organization: 'FreshRoots Agritech & Packhouse',
  role: 'packhouse',
  location: 'Sector 44, Gurugram, Haryana',
  avatar: '📦',
  phone: '+91 99100 23411',
  email: 'pooja.s@freshroots.farm',
  cropsOrMaterials: ['Fresh Fruit Packs', 'Export Grapes', 'Pre-cut Salads', 'Cold Chain Produce'],
  typicalVolume: '45,000 retail packs / week',
};
const DEFAULT_BRAND_USER = DEFAULT_PACKHOUSE_USER;

const DEFAULT_TRANSPORTER_USER: UserProfile = {
  name: 'Gurpreet Singh',
  organization: 'ColdSpeed Reefer Logistics Ltd',
  role: 'transporter',
  location: 'Sanjay Gandhi Transport Nagar, Delhi',
  avatar: '🚛',
  phone: '+91 98114 77209',
  email: 'operations@coldspeed.in',
  cropsOrMaterials: ['Banana Reefers (13-15°C)', 'Mango Export Cold Chain', 'Dairy Chilled Transport'],
  typicalVolume: '35 Reefer Vehicles Fleet',
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Quotation Received',
    hindiTitle: 'नया कोटेशन प्राप्त हुआ',
    message: 'GreenPack Industries sent a quote of ₹2.10/pack for your Banana project.',
    timestamp: '10m ago',
    read: false,
    link: '/app/projects/proj-banana-1/quotes',
    type: 'quote',
  },
  {
    id: 'notif-2',
    title: 'Packaging Blueprint Generated',
    hindiTitle: 'पैकेजिंग ब्लूप्रिंट तैयार है',
    message: 'AI has formulated the ideal OTR/WVTR barrier plan for 500 kg Banana harvest.',
    timestamp: '1h ago',
    read: false,
    link: '/app/projects/proj-banana-1/blueprint',
    type: 'system',
  },
  {
    id: 'notif-3',
    title: 'Order Dispatched',
    hindiTitle: 'ऑर्डर डिस्पैच हो गया',
    message: 'Your Apple transit box order #BD-884120 is in transit to Shimla packhouse.',
    timestamp: '1d ago',
    read: true,
    link: '/app/projects/proj-apple-5/order',
    type: 'order',
  },
  {
    id: 'notif-4',
    title: 'Performance Review Ready',
    hindiTitle: 'प्रदर्शन समीक्षा तैयार है',
    message: 'Target 10-day period reached for your Tomato project. Record actual shelf life.',
    timestamp: '2d ago',
    read: true,
    link: '/app/projects/proj-tomato-2/performance',
    type: 'performance',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('farmer');
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile>(DEFAULT_FARMER_USER);

  // 3-Tier and Commodity
  const [selectedTier, setSelectedTier] = useState<ServiceTier>('smart');
  const [currentCommodity, setCurrentCommodity] = useState<CommodityItem | null>(COMMODITIES[0]);
  const [commodities] = useState<CommodityItem[]>(COMMODITIES);

  const [foods] = useState<FoodProduct[]>(MOCK_FOODS);
  const [materials] = useState<Material[]>(MOCK_MATERIALS);
  const [structures] = useState<PackagingStructure[]>(MOCK_STRUCTURES);
  const [suppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [converters] = useState<ConverterProfile[]>(MOCK_CONVERTERS);
  const [materialProducers] = useState<MaterialProducerProfile[]>(MOCK_MATERIAL_PRODUCERS);

  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>('proj-banana-1');

  const [rfqs, setRfqs] = useState<RFQ[]>(MOCK_RFQS);
  const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
  const [converterRFQs, setConverterRFQs] = useState<ConverterRFQItem[]>(MOCK_CONVERTER_RFQS);
  const [liveAuction, setLiveAuction] = useState(MOCK_LIVE_AUCTION);
  const [transporterShipments] = useState<TransporterShipment[]>(MOCK_TRANSPORTER_SHIPMENTS);
  const [analyticsData] = useState<PackhouseAnalytics>(MOCK_ANALYTICS_DATA);

  const [totalFeedbackSubmitted, setTotalFeedbackSubmitted] = useState<number>(12847);
  const [aiAccuracyScore, setAiAccuracyScore] = useState<number>(91);

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(MOCK_CHAT_THREADS);
  const [messages, setMessages] = useState<Record<string, MessageItem[]>>(MOCK_MESSAGES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Switch user profile when role changes
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'farmer' || newRole === 'producer') {
      setUser(DEFAULT_FARMER_USER);
    } else if (newRole === 'converter' || newRole === 'supplier') {
      setUser(DEFAULT_CONVERTER_USER);
    } else if (newRole === 'material_producer') {
      setUser(DEFAULT_MATERIAL_PRODUCER_USER);
    } else if (newRole === 'packhouse' || newRole === 'brand') {
      setUser(DEFAULT_PACKHOUSE_USER);
    } else if (newRole === 'transporter') {
      setUser(DEFAULT_TRANSPORTER_USER);
    }
  };

  // Helper translation function
  const t = (en: string, hi?: string) => {
    if (language === 'hi' && hi) return hi;
    return en;
  };

  const getActiveProject = () => {
    return projects.find((p) => p.id === activeProjectId) || projects[0];
  };

  const getProjectOptions = (projectId: string): ProjectOption[] => {
    if (MOCK_PROJECT_OPTIONS[projectId]) {
      return MOCK_PROJECT_OPTIONS[projectId];
    }
    // Return standard 3 options tailored to banana/general
    return MOCK_PROJECT_OPTIONS['proj-banana-1'];
  };

  const createProject = (data: Partial<Project>): Project => {
    const newId = `proj-${Date.now()}`;
    const newProj: Project = {
      id: newId,
      title: data.title || `${data.foodName || 'Crops'} — ${data.quantity || 500} ${data.unit || 'kg'}`,
      foodId: data.foodId || 'food-banana',
      foodName: data.foodName || 'Banana',
      foodCategory: data.foodCategory || 'Fruit',
      quantity: data.quantity || 500,
      unit: data.unit || 'kg',
      targetShelfLifeDays: data.targetShelfLifeDays || 10,
      journeyStages: data.journeyStages || ['Farm', 'Packhouse', 'Transport', 'Retail'],
      temperatureCondition: data.temperatureCondition || '10°C - 14°C',
      humidityLevel: data.humidityLevel || 'Humid',
      transportDurationHours: data.transportDurationHours || 12,
      distanceKm: data.distanceKm || 200,
      storageType: data.storageType || 'Cold Storage',
      reportedProblems: data.reportedProblems || ['Short shelf life', 'Bruising'],
      priorities: data.priorities || ['Shelf life', 'Lowest cost'],
      currentPackaging: data.currentPackaging || 'Open plastic crate',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'BLUEPRINT',
      selectedOptionId: 'option-balanced',
      orderTimeline: {
        step: 'recommendation',
        updatedAt: new Date().toISOString().split('T')[0],
        expectedDelivery: 'In 7-10 days',
      },
      ...data,
    };

    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectId(newId);

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Project Created',
      hindiTitle: 'नया प्रोजेक्ट बनाया गया',
      message: `Packaging intelligence plan generated for ${newProj.title}.`,
      timestamp: 'Just now',
      read: false,
      link: `/app/projects/${newId}/blueprint`,
      type: 'system',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newProj;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, ...updates };
        }
        return p;
      })
    );
  };

  const sendRFQ = (rfqData: Omit<RFQ, 'id' | 'status' | 'createdAt'>): RFQ => {
    const newRfq: RFQ = {
      id: `rfq-${Date.now()}`,
      ...rfqData,
      status: 'SENT',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRfqs((prev) => [newRfq, ...prev]);

    // Update project status
    updateProject(rfqData.projectId, { status: 'QUOTES_PENDING' });

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'RFQ Sent to Supplier',
        hindiTitle: 'सप्लायर को RFQ भेजा गया',
        message: `Your request for quotation has been delivered to ${suppliers.find((s) => s.id === rfqData.supplierId)?.name || 'Supplier'}.`,
        timestamp: 'Just now',
        read: false,
        link: `/app/projects/${rfqData.projectId}/quotes`,
        type: 'rfq',
      },
      ...prev,
    ]);

    // Simulate supplier responding with a quote after 2.5 seconds!
    setTimeout(() => {
      const supplierObj = suppliers.find((s) => s.id === rfqData.supplierId);
      const generatedQuote: Quote = {
        id: `quote-${Date.now()}`,
        rfqId: newRfq.id,
        projectId: rfqData.projectId,
        supplierId: rfqData.supplierId,
        supplierName: supplierObj?.name || 'Verified Supplier',
        supplierLocation: supplierObj?.location || 'Delhi NCR',
        pricePerPackage: 2.15,
        totalCost: Math.round(rfqData.quantityKg * 21.5),
        moq: supplierObj?.minOrderQuantityKg || 500,
        leadTimeDays: supplierObj?.typicalLeadTimeDays || 7,
        structureOffered: '12µ PET / 40µ LDPE Co-extruded with Laser Venting',
        thickness: '52 µm',
        sampleAvailable: true,
        validityDays: 14,
        notes: 'Specially engineered for fresh farm transit. Direct factory shipment.',
        isBestValue: true,
        technicalMatch: 95,
        sustainabilityRating: 'Recyclable Mono-PE Stream',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setQuotes((qPrev) => [generatedQuote, ...qPrev]);
      updateProject(rfqData.projectId, { status: 'QUOTES_RECEIVED' });

      setNotifications((nPrev) => [
        {
          id: `notif-${Date.now() + 1}`,
          title: 'Quotation Received!',
          hindiTitle: 'कोटेशन प्राप्त हुआ!',
          message: `${supplierObj?.name || 'Supplier'} responded with ₹2.15/pack quote!`,
          timestamp: 'Just now',
          read: false,
          link: `/app/projects/${rfqData.projectId}/quotes`,
          type: 'quote',
        },
        ...nPrev,
      ]);
    }, 2500);

    return newRfq;
  };

  const submitQuote = (quoteData: Omit<Quote, 'id' | 'createdAt'>): Quote => {
    const newQuote: Quote = {
      id: `quote-${Date.now()}`,
      ...quoteData,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setQuotes((prev) => [newQuote, ...prev]);

    // Update project state
    updateProject(quoteData.projectId, { status: 'QUOTES_RECEIVED' });

    return newQuote;
  };

  const selectQuote = (projectId: string, quoteId: string) => {
    const quoteObj = quotes.find((q) => q.id === quoteId);
    updateProject(projectId, {
      status: 'ORDER_PLACED',
      selectedQuoteId: quoteId,
      selectedSupplierId: quoteObj?.supplierId,
      orderTimeline: {
        step: 'quote_accepted',
        updatedAt: new Date().toISOString().split('T')[0],
        expectedDelivery: 'In 7 business days',
        courier: 'GreenPack Direct Freight',
        trackingNumber: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
      },
    });

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Quote Accepted & Order Initiated',
        hindiTitle: 'कोट स्वीकृत और ऑर्डर शुरू हुआ',
        message: `Supplier ${quoteObj?.supplierName || ''} will begin production.`,
        timestamp: 'Just now',
        read: false,
        link: `/app/projects/${projectId}/order`,
        type: 'order',
      },
      ...prev,
    ]);
  };

  const advanceOrderStep = (projectId: string, step: Project['orderTimeline']['step']) => {
    let nextStatus: Project['status'] = 'ORDER_PLACED';
    if (step === 'dispatched') nextStatus = 'DISPATCHED';
    if (step === 'implemented') nextStatus = 'IMPLEMENTED';
    if (step === 'performance') nextStatus = 'EVALUATED';

    updateProject(projectId, {
      status: nextStatus,
      orderTimeline: {
        step,
        updatedAt: new Date().toISOString().split('T')[0],
        expectedDelivery: step === 'dispatched' ? 'Expected Tomorrow 4 PM' : 'Delivered & Implemented',
        courier: 'BlueDart Agri-Link',
        trackingNumber: 'BD-774921',
      },
    });
  };

  const submitPerformance = (projectId: string, perfData: Project['performanceData']) => {
    updateProject(projectId, {
      status: 'EVALUATED',
      performanceData: perfData,
    });

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Performance Recorded & Feedback Loop Closed',
        hindiTitle: 'प्रदर्शन दर्ज और AI मॉडल अपडेट हुआ',
        message: 'Your field metrics help PACKITUP AI improve accuracy for upcoming fruit cycles.',
        timestamp: 'Just now',
        read: false,
        link: `/app/projects/${projectId}/performance`,
        type: 'performance',
      },
      ...prev,
    ]);
  };

  const sendMessage = (chatId: string, text: string, senderRole: 'producer' | 'supplier' = 'producer') => {
    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      chatId,
      senderId: user.name,
      senderName: user.name,
      senderRole,
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMsg],
    }));

    // Update last message in chat threads
    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === chatId) {
          return {
            ...thread,
            lastMessage: text,
            lastMessageTime: 'Just now',
          };
        }
        return thread;
      })
    );

    // Auto-respond from supplier if producer sent it!
    if (senderRole === 'producer') {
      setTimeout(() => {
        const replyMsg: MessageItem = {
          id: `msg-${Date.now() + 1}`,
          chatId,
          senderId: 'supp-rep',
          senderName: 'Technical Support Desk',
          senderRole: 'supplier',
          text: 'Thank you for the update! Our packaging plant team has noted this and your batch quality verification is confirmed.',
          timestamp: 'Just now',
        };
        setMessages((prev) => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), replyMsg],
        }));
      }, 1500);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const sendMultiRFQ = (converterIds: string[], budget: number, deliveryDate: string) => {
    updateProject(activeProjectId, { status: 'QUOTES_PENDING' });
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `RFQ Dispatched to ${converterIds.length} Verified Converters`,
        hindiTitle: `${converterIds.length} कन्वर्टर्स को RFQ भेजा गया`,
        message: `Packaging RFQ with ₹${budget.toFixed(2)} budget ceiling dispatched for delivery by ${deliveryDate}. Quotes will arrive in 2–24h.`,
        timestamp: 'Just now',
        read: false,
        link: `/app/projects/${activeProjectId}/quotes`,
        type: 'rfq',
      },
      ...prev,
    ]);
  };

  const submitConverterQuote = (rfqId: string, price: number, leadTime: number) => {
    setConverterRFQs((prev) =>
      prev.map((item) =>
        item.id === rfqId
          ? {
              ...item,
              status: 'bidding_now' as const,
              myQuotePrice: price,
            }
          : item
      )
    );
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Quote Submitted to Farmer',
        hindiTitle: 'किसान को कोट भेजा गया',
        message: `Your quote of ₹${price.toFixed(2)}/bag with ${leadTime} days lead time was submitted.`,
        timestamp: 'Just now',
        read: false,
        link: '/app/converter/rfqs',
        type: 'quote',
      },
      ...prev,
    ]);
  };

  const submitLiveBid = (bidPerBag: number) => {
    const newBid: LiveBid = {
      id: `b-user-${Date.now()}`,
      rank: 1,
      converterId: 'conv-greenpack',
      converterName: user.organization || 'My Plant (GreenPack Films)',
      bidPerBag,
      leadTimeDays: 6,
      moqUnits: 500,
      timestamp: 'Just now',
      technicalCompliant: true,
      notes: 'Direct competitive auction bid via PACKITUP Smart Plan',
      isMyBid: true,
    };
    setLiveAuction((prev) => {
      const updatedBids = [newBid, ...prev.bids]
        .sort((a, b) => a.bidPerBag - b.bidPerBag)
        .map((b, idx) => ({ ...b, rank: idx + 1 }));
      const lowest = updatedBids[0].bidPerBag;
      const budget = prev.budgetCeiling;
      const savings = Math.max(0, budget - lowest);
      const savingsPercent = Math.round((savings / budget) * 100);
      return {
        ...prev,
        currentLowestBid: lowest,
        savingsAmount: Number(savings.toFixed(2)),
        savingsPercent,
        bids: updatedBids,
      };
    });
  };

  const acceptLowestBid = () => {
    updateProject(activeProjectId, {
      status: 'ORDER_PLACED',
      selectedSupplierId: 'conv-nova',
      orderTimeline: {
        step: 'quote_accepted',
        updatedAt: new Date().toISOString().split('T')[0],
        expectedDelivery: 'In 5 business days',
        courier: 'Nova Direct Logistics',
        trackingNumber: 'NV-882190',
      },
    });
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Auction Completed — Order Placed!',
        hindiTitle: 'नीलामी पूरी हुई — ऑर्डर दिया गया!',
        message: `Winner accepted at ₹${liveAuction.currentLowestBid.toFixed(2)}/bag. Saved ${liveAuction.savingsPercent}%!`,
        timestamp: 'Just now',
        read: false,
        link: `/app/projects/${activeProjectId}/order`,
        type: 'order',
      },
      ...prev,
    ]);
  };

  const recordFlywheelFeedback = (rating: number) => {
    setTotalFeedbackSubmitted((prev) => prev + 1);
    setAiAccuracyScore((prev) => Math.min(99, +(prev + 0.1).toFixed(1)));
  };

  const resetToDemoState = () => {
    setProjects(MOCK_PROJECTS);
    setActiveProjectId('proj-banana-1');
    setRfqs(MOCK_RFQS);
    setQuotes(MOCK_QUOTES);
    setConverterRFQs(MOCK_CONVERTER_RFQS);
    setLiveAuction(MOCK_LIVE_AUCTION);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSelectedTier('smart');
    setCurrentCommodity(COMMODITIES[0]);
    setRole('farmer');
  };

  const jumpToDemoStep = (step: 'blueprint' | 'options' | 'suppliers' | 'quotes' | 'order' | 'performance') => {
    const projId = 'proj-banana-1';
    setActiveProjectId(projId);

    if (step === 'blueprint') {
      updateProject(projId, { status: 'BLUEPRINT' });
    } else if (step === 'options') {
      updateProject(projId, { status: 'BLUEPRINT', selectedOptionId: 'option-balanced' });
    } else if (step === 'suppliers') {
      updateProject(projId, { status: 'SUPPLIER_MATCH' });
    } else if (step === 'quotes') {
      updateProject(projId, { status: 'QUOTES_RECEIVED' });
    } else if (step === 'order') {
      updateProject(projId, {
        status: 'ORDER_PLACED',
        selectedSupplierId: 'supp-greenpack',
        orderTimeline: {
          step: 'production',
          updatedAt: '2026-09-30',
          expectedDelivery: '05 Oct 2026',
          courier: 'GreenPack Direct',
          trackingNumber: 'GP-992140',
        },
      });
    } else if (step === 'performance') {
      updateProject(projId, {
        status: 'IMPLEMENTED',
        orderTimeline: {
          step: 'implemented',
          updatedAt: '2026-09-30',
          expectedDelivery: 'Delivered',
        },
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        userRole: role,
        setRole,
        language,
        setLanguage,
        user,
        setUser,
        t,
        selectedTier,
        setSelectedTier,
        currentCommodity,
        setCurrentCommodity,
        foods,
        commodities,
        materials,
        structures,
        suppliers,
        converters,
        materialProducers,
        projects,
        activeProjectId,
        setActiveProjectId,
        getActiveProject,
        getProjectOptions,
        createProject,
        updateProject,
        rfqs,
        sendRFQ,
        sendMultiRFQ,
        quotes,
        submitQuote,
        selectQuote,
        advanceOrderStep,
        submitPerformance,
        converterRFQs,
        setConverterRFQs,
        submitConverterQuote,
        liveAuction,
        submitLiveBid,
        acceptLowestBid,
        transporterShipments,
        analyticsData,
        totalFeedbackSubmitted,
        aiAccuracyScore,
        recordFlywheelFeedback,
        chatThreads,
        messages,
        sendMessage,
        notifications,
        markNotificationRead,
        clearNotifications,
        searchQuery,
        setSearchQuery,
        resetToDemoState,
        jumpToDemoStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
