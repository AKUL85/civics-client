export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    TWO_FA_ENABLE: '/auth/2fa/enable',
    TWO_FA_VERIFY: '/auth/2fa/verify',
  },
  LAWYERS: {
    GET_ALL: '/lawyers',
    GET_BY_ID: (id) => `/lawyers/${id}`,
    SEARCH: '/lawyers/search',
    REVIEWS: (id) => `/lawyers/${id}/reviews`,
  },
  GUIDES: {
    GET_ALL: '/legal-guides',
    GET_BY_ID: (id) => `/legal-guides/${id}`,
    SEARCH: '/legal-guides/search',
    CATEGORIES: '/legal-guides/categories',
    GLOSSARY: '/legal-guides/glossary',
  },
  AI: {
    ASK: '/ai/ask',
    VALIDATE: (id) => `/ai/validate/${id}`,
    HISTORY: '/ai/history',
  },
  BOOKINGS: {
    CREATE: '/bookings',
    GET_MY_CONSULTATIONS: '/bookings/my-consultations',
  },
  CASES: {
    GET_ALL: '/cases',
    GET_BY_ID: (id) => `/cases/${id}`,
    CREATE: '/cases',
    UPDATE: (id) => `/cases/${id}`,
  },
};

export const QUERY_KEYS = {
  LAWYERS: 'lawyers',
  GUIDES: 'guides',
  AI_HISTORY: 'ai-history',
  CONSULTATIONS: 'consultations',
  CASES: 'cases',
  USER_PROFILE: 'user-profile',
};

export const ROUTES = {
  HOME: '/',
  GUIDES: '/guides',
  AI_ASSISTANT: '/ai-assistant',
  LAWYERS: '/lawyers',
  COMMUNITY: '/community',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  CONSULTATIONS: '/my-consultations',
  CASES: '/cases',
};

export const LEGAL_CATEGORIES = {
  MARRIAGE: 'marriage',
  DIVORCE: 'divorce',
  LAND: 'land',
  INHERITANCE: 'inheritance',
  LABOR: 'labor',
  CONSUMER: 'consumer',
  CYBERCRIME: 'cybercrime',
  FAMILY: 'family',
  CRIMINAL: 'criminal',
  CIVIL: 'civil',
  CORPORATE: 'corporate',
};

export const USER_ROLES = {
  USER: 'user',
  LAWYER: 'lawyer',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

export const CONSULTATION_TYPES = {
  PHONE: 'phone',
  VIDEO: 'video',
  IN_PERSON: 'in-person',
  CHAT: 'chat',
};

export const CASE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CLOSED: 'closed',
};