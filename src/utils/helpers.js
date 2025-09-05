// Date formatting utilities
export const formatDate = (date, locale = 'bn-BD') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatTime = (date, locale = 'bn-BD') => {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Number formatting for Bengali
export const formatNumberBengali = (number) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
};

// Currency formatting
export const formatCurrency = (amount, currency = 'BDT') => {
  if (currency === 'BDT') {
    return `৳${amount.toLocaleString('bn-BD')}`;
  }
  return amount.toLocaleString();
};

// Text truncation
export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
};

// Phone number validation for Bangladesh
export const validateBDPhone = (phone) => {
  const bdPhoneRegex = /^(\+880|0)?1[3-9]\d{8}$/;
  return bdPhoneRegex.test(phone);
};

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength checker
export const checkPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score < 3) return 'দুর্বল';
  if (score < 4) return 'মধ্যম';
  return 'শক্তিশালী';
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Local storage helpers
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },
};