<script>
  import { onMount } from 'svelte';
  import { thirdPartyContext } from '../utils/store';

  onMount(() => {
    loadKakao();
    loadFacebook();
    loadGoogle();
    loadNaver();
    loadDaumMap();
    loadTwitter();
  });

  const asyncLoadScript = (url, onLoad) => {
    const tag = document.createElement('script');
    tag.src = url;
    tag.async = true;
    tag.defer = true;
    tag.onload = onLoad;
    document.body.appendChild(tag);
  };

  const loadKakao = () => {
    const url = '//developers.kakao.com/sdk/js/kakao.min.js';
    const appKey = '9fad4b64ad899ef28e5195fd119e8b89';
    asyncLoadScript(url, () => {
      Kakao.init(appKey);
      thirdPartyContext.set({
        ...$thirdPartyContext,
        kakao: {
          ready: true,
        },
      });
    });
  };

  const loadFacebook = () => {
    const url = 'https://connect.facebook.net/ko_KR/sdk.js';
    const appId = '501249750611258';
    asyncLoadScript(url, () => {
      FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v3.3',
      });
      thirdPartyContext.set({
        ...$thirdPartyContext,
        facebook: {
          ready: true,
        },
      });
    });
  };

  const loadNaver = () => {
    const url = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
    const clientId = '2nMKYhd4bH2BKFHmnYJ2';
    asyncLoadScript(url, () => {
      var naverLogin = new naver.LoginWithNaverId({
        clientId,
        callbackUrl: `${window.location.protocol}//${window.location.hostname +
          (location.port == '' || location.port == undefined
            ? ''
            : ':' + location.port)}/naverCallback`,
      });
      naverLogin.init();
      thirdPartyContext.set({
        ...$thirdPartyContext,
        naver: {
          ready: true,
          authorizeUrl: naverLogin.generateAuthorizeUrl(),
        },
      });
    });
  };

  const loadGoogle = () => {
    const url = 'https://apis.google.com/js/platform.js';
    const clientId =
      '899402326281-p24btin23m2no41nsdlcqs1ij38plo6j.apps.googleusercontent.com';
    asyncLoadScript(url, () => {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: clientId,
        });
        thirdPartyContext.set({
          ...$thirdPartyContext,
          google: {
            ready: true,
          },
        });
      });
    });
  };

  const loadDaumMap = () => {
    const appKey = '9fad4b64ad899ef28e5195fd119e8b89';
    const url = `//dapi.kakao.com/v2/maps/sdk.js?appKey=${appKey}&autoload=false`;
    asyncLoadScript(url, () => {
      daum.maps.load(() => {
        thirdPartyContext.set({
          ...$thirdPartyContext,
          daumMap: {
            ready: true,
          },
        });
      });
    });
  };

  const loadTwitter = () => {
    const url = 'https://platform.twitter.com/widgets.js';
    asyncLoadScript(url, () => {
      thirdPartyContext.set({
        ...$thirdPartyContext,
        twitter: {
          ready: true,
        },
      });
    });
  };
</script>
