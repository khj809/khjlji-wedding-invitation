<script>
  import { onMount, onDestroy } from 'svelte';

  import { user, showLoginModal, thirdPartyContext } from './store';
  import { signup } from './api';
  import LoginModal from './LoginModal.svelte';
  import { toastMsg } from './toast';

  const onKakaoSignIn = () => {
    Kakao.Auth.login({
      success: authObj => {
        signup({
          provider: 'kakao',
          accessToken: authObj.access_token,
        }).then(res => {
          if (!res.user) {
            throw new Error('failed to get user data');
          }
          user.set(res.user);
          showLoginModal.set(false);
          toastMsg('카카오 계정으로 로그인되었습니다.');
        });
      },
      fail: err => {
        console.log(err);
        toastMsg('카카오 계정으로 로그인에 실패하였습니다.');
      },
    });
  };

  const onGoogleSignIn = async () => {
    const authInstance = gapi.auth2.getAuthInstance();
    try {
      const googleUser = await authInstance.signIn();
      const accessToken = googleUser.getAuthResponse(true).access_token;
      if (!accessToken) {
        throw new Error('access token is invalid');
      }

      const res = await signup({
        provider: 'google',
        accessToken,
      });
      if (!res.user) {
        throw new Error('failed to get user data');
      }

      user.set(res.user);
      showLoginModal.set(false);
      toastMsg('구글 계정으로 로그인되었습니다.');
    } catch (err) {
      console.log(err);
      toastMsg('구글 계정으로 로그인에 실패하였습니다.');
    }
  };

  const doNaverSignIn = () => {
    window.open($thirdPartyContext.naver.authorizeUrl);
  };

  const onNaverSignIn = hash => {
    try {
      const accessToken = hash
        .split('#')[1]
        .split('&')[0]
        .split('=')[1];
      if (!accessToken) {
        throw new Error('access token is invalid');
      }

      signup({
        provider: 'naver',
        accessToken,
      }).then(res => {
        if (!res.user) {
          throw new Error('failed to get user data');
        }
        user.set(res.user);
        showLoginModal.set(false);
        toastMsg('네이버 계정으로 로그인되었습니다.');
      });
    } catch (err) {
      console.log(err);
      toastMsg('네이버 계정으로 로그인에 실패하였습니다.');
    }
  };

  const onFacebookSignIn = () => {
    FB.login(response => {
      try {
        if (!response.authResponse) {
          throw new Error('facebook auth failed');
        }
        const res = signup({
          provider: 'facebook',
          accessToken: response.authResponse.accessToken,
        }).then(res => {
          if (!res.user) {
            throw new Error('failed to get user data');
          }
          user.set(res.user);
          showLoginModal.set(false);
          toastMsg('페이스북 계정으로 로그인되었습니다.');
        });
      } catch (err) {
        console.log(err);
        toastMsg('페이스북 계정으로 로그인에 실패하였습니다.');
      }
    });
  };

  onMount(() => {
    window.onNaverSignIn = onNaverSignIn;
  });

  onDestroy(() => {
    window.onNaverSignIn = null;
  });
</script>

{#if $showLoginModal}
  <LoginModal
    on:googleSignIn={onGoogleSignIn}
    on:kakaoSignIn={onKakaoSignIn}
    on:naverSignIn={doNaverSignIn}
    on:facebookSignIn={onFacebookSignIn}
    on:close={() => showLoginModal.set(false)} />
{/if}
