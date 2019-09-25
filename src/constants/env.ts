import { Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation-stack';
import config from '../config/config.json';

export const ENV = {
  ENVIRONMENT: config.ENV,
  IS_DEV: config.ENV === 'development',
  IS_TEST: config.ENV === 'test',
  IS_QA: config.ENV === 'qa',
  IS_PROD: config.ENV === 'stage' || config.ENV === 'production',
  API: {
    URL: config.API_URL,
    MAX_RETRIES: 3,
    RETRY_TIMEOUT: config.API_RETRY_TIMEOUT,
    ENTITY: {
      AUTH: 'auth',
      USER: 'users',
      TODO: 'todos'
    }
  },
  PAGINATION: {
    LIMIT: 40
  },
  CHECK_FOR_UPDATES_INTERVAL: config.CHECK_FOR_UPDATES_INTERVAL,
  STORAGE_TIMEOUT: config.STORAGE_TIMEOUT,
  STORAGE_KEY: {
    AUTH: 'auth-data'
  },
  PLATFORM: {
    IS_ANDROID: Platform.OS === 'android',
    IS_IOS: Platform.OS === 'ios'
  },
  KEYBOARD_VERTICAL_OFFSET: (StatusBar.currentHeight || 0) + (Header.HEIGHT || 0) + 25,
  FIREBASE: {
    API_KEY: config.API_KEY,
    AUTH_DOMAIN: config.AUTH_DOMAIN,
    DATABASE_URL: config.DATABASE_URL,
    PROJECT_ID: config.PROJECT_ID,
    STORAGE_BUCKET: config.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: config.MESSAGING_SENDER_ID,
    APP_ID: config.APP_ID
  }
};
