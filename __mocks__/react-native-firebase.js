jest.mock('react-native-firebase', () => {
  return {
    messaging: jest.fn(() => {
      return {
        hasPermission: jest.fn(() => Promise.resolve(true)),
        subscribeToTopic: jest.fn(),
        unsubscribeFromTopic: jest.fn(),
        requestPermission: jest.fn(() => Promise.resolve(true)),
        getToken: jest.fn(() => Promise.resolve('myMockToken'))
      };
    }),
    notifications: jest.fn(() => {
      return {
        onNotification: jest.fn(),
        onNotificationDisplayed: jest.fn()
      };
    }),
    auth: jest.fn(() => {
      return {
        createUserWithEmailAndPassword: jest.fn((email, password) => (Promise.resolve({ 'user': { 'uid': 'testuid', 'email': email, 'displayName': email }}))),
        signInWithEmailAndPassword: jest.fn(),
        signInWithCredential: jest.fn(),
        signOut: jest.fn()
      };
    }),
    analytics: jest.fn(() => {
      return {
        logEvent: jest.fn()
      };
    })
  };
});