import {PaperOnboardingItemType} from '@gorhom/paper-onboarding';

enum ContextMenuAction {
  DELETE = 'Delete',
  PREVIEW = 'Preview',
  SHARE = 'Share',
}

enum ErrorCode {
  NETWORK_ERROR = 'Network Error',
  SUCCESS = 200,
  CLIENT_ERROR = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  RESOURCE_NOT_FOUND = 404,
  GONE = 410,
  SERVER_ERROR = 500,
  SERVER_UNAVAILABLE = 503,
}

const CHANGELOG_URL =
  'https://raw.githubusercontent.com/adriancleung/pushie/master/CHANGELOG.md';

const ONBOARDING_DATA: PaperOnboardingItemType[] = [
  {
    title: 'Welcome!',
    description:
      "Pushie has been redesigned to make your experience better. Let's get started!",
    backgroundColor: '#264653',
  },
  {
    title: 'Accounts',
    description:
      'Unfortunately, your account (if you previously had one) was not transferred over and a new account is required :(',
    backgroundColor: '#2A9D8F',
  },
  {
    title: 'What is this?',
    description:
      'Pushie is a push notification service for your mobile devices. Receive real-time notifications from your applications or services right on your phone!',
    backgroundColor: '#E9C46A',
  },
  {
    title: 'Getting Started',
    description:
      "Head over to the 'How to Use' section within the settings menu to get started!",
    backgroundColor: '#F4A261',
  },
];

const PRIVACY_POLICY_URL = 'https://adrianleung.dev/pushie/privacy';

export {
  ContextMenuAction,
  ErrorCode,
  CHANGELOG_URL,
  ONBOARDING_DATA,
  PRIVACY_POLICY_URL,
};
