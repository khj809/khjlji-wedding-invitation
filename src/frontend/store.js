import { writable } from 'svelte/store';

const user = writable(undefined);
const showLoginModal = writable(false);
const thirdPartyContext = writable({
  kakao: {
    ready: false,
  },
  facebook: {
    ready: false,
  },
  naver: {
    ready: false,
    authorizeUrl: null,
  },
  google: {
    ready: false,
  },
  daumMap: {
    ready: false,
  },
  twitter: {
    ready: false,
  },
});

export { user, showLoginModal, thirdPartyContext };
