export const mockConversations = [
  {
    id: 1,
    name: 'Luis Easton',
    avatar: '👤',
    email: 'luis.easton@email.com',
    lastMessage: 'I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you\'d be able to refund me, as it is un-opened.',
    time: '1min',
    timestamp: new Date(Date.now() - 60000),
    status: 'waiting',
    priority: 'high',
    unread: false,
    tags: ['refund', 'gift'],
    customerSince: '2023',
    totalOrders: 12,
    orderValue: '$245.99',
    satisfaction: 4.5
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: '👩',
    email: 'sarah.j@github.com',
    lastMessage: 'Hey! I have a question about my recent order tracking...',
    time: '15min',
    timestamp: new Date(Date.now() - 15 * 60000),
    status: 'open',
    priority: 'medium',
    unread: true,
    tags: ['tracking', 'order'],
    customerSince: '2022',
    totalOrders: 8,
    orderValue: '$156.50',
    satisfaction: 4.2
  },
  {
    id: 3,
    name: 'Ivan Rodriguez',
    avatar: '👨',
    email: 'ivan@nike.com',
    lastMessage: 'Hi there, I have an urgent question about bulk ordering...',
    time: '3min',
    timestamp: new Date(Date.now() - 3 * 60000),
    status: 'urgent',
    priority: 'urgent',
    unread: true,
    isUrgent: true,
    tags: ['bulk', 'urgent'],
    customerSince: '2024',
    totalOrders: 3,
    orderValue: '$1,245.00',
    satisfaction: 5.0
  },
  {
    id: 4,
    name: 'Maria Santos',
    avatar: '👩‍💼',
    email: 'maria@leadny.com',
    lastMessage: 'Good morning, let me know about partnership opportunities...',
    time: '40min',
    timestamp: new Date(Date.now() - 40 * 60000),
    status: 'open',
    priority: 'low',
    unread: true,
    tags: ['partnership', 'business'],
    customerSince: '2024',
    totalOrders: 1,
    orderValue: '$89.99',
    satisfaction: 4.0
  }
];

export const mockAISources = [
  { 
    id: 1, 
    title: 'Getting a refund', 
    type: 'article', 
    icon: '📄',
    author: 'Amy Adams',
    lastUpdated: '1d ago',
    confidence: 95,
    category: 'Refunds'
  },
  { 
    id: 2, 
    title: 'Refund for an order placed by mistake', 
    type: 'policy', 
    icon: '📋',
    author: 'Policy Team',
    lastUpdated: '3d ago',
    confidence: 88,
    category: 'Policies'
  },
  { 
    id: 3, 
    title: 'Refund for an unwanted gift', 
    type: 'policy', 
    icon: '🎁',
    author: 'Support Team',
    lastUpdated: '1w ago',
    confidence: 92,
    category: 'Gift Returns'
  }
];

export const mockQuickActions = [
  { id: 1, label: 'Apply Refund', icon: 'RotateCcw', color: 'bg-green-500' },
  { id: 2, label: 'Request Info', icon: 'FileText', color: 'bg-blue-500' },
  { id: 3, label: 'Escalate', icon: 'AlertCircle', color: 'bg-red-500' },
  { id: 4, label: 'Schedule Call', icon: 'Phone', color: 'bg-purple-500' }
];

export const mockSuggestions = [
  "How do I get a refund?",
  "What's your return policy?",
  "How long does shipping take?",
  "Can I change my order?",
  "Do you offer exchanges?",
  "What's your warranty policy?"
];

export const mockNotifications = [
  {
    id: 1,
    type: 'urgent',
    title: 'Urgent ticket assigned',
    message: 'Ivan Rodriguez needs immediate assistance',
    timestamp: new Date(Date.now() - 5 * 60000),
    icon: 'AlertCircle',
    color: 'red'
  },
  {
    id: 2,
    type: 'ai',
    title: 'AI suggestion ready',
    message: 'New response generated for Luis Easton',
    timestamp: new Date(Date.now() - 10 * 60000),
    icon: 'Bot',
    color: 'blue'
  },
  {
    id: 3,
    type: 'info',
    title: 'New customer registered',
    message: 'Maria Santos joined as premium member',
    timestamp: new Date(Date.now() - 30 * 60000),
    icon: 'Users',
    color: 'green'
  }
];