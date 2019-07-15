<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Modal from './Modal.svelte';

  const dispatch = createEventDispatcher();
</script>

<style lang="scss">
  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 9;
    width: 80%;
    max-width: 400px;
    min-width: 200px;
    transform: translate(-50%, -50%);
    border-radius: 0.2em;

    .btn-login {
      display: block;
      width: 100%;
      font-size: 13px;
      text-align: left;
      margin: 0 auto 20px;
      padding: 15px 20px 15px 50px;
      border-radius: 5px;
      background-color: #fff;
      background-repeat: no-repeat;
      background-size: 24px 24px;
      background-position: 15px 50%;
      box-shadow: 4px 6px 10px 2px rgba(0, 0, 0, 0.5);
      &:last-of-type {
        margin-bottom: 0;
      }
      &.ic {
        &-kakao {
          background-image: url('/assets/images/ic-kakao.png');
        }
        &-facebook {
          background-image: url('/assets/images/ic-facebook.png');
        }
        &-naver {
          background-image: url('/assets/images/ic-naver.png');
        }
        &-google {
          background-size: 22px 22px;
          background-image: url('/assets/images/ic-google.png');
        }
      }
    }
  }
</style>

<Modal on:close>
  <div class="modal" slot="modal">
    <button
      class="btn-login ic-kakao"
      on:click|preventDefault={() => dispatch('kakaoSignIn')}>
      카카오톡으로 로그인하기
    </button>
    <button
      class="btn-login ic-facebook"
      on:click|preventDefault={() => dispatch('facebookSignIn')}>
      페이스북으로 로그인하기
    </button>
    <button
      class="btn-login ic-naver"
      on:click|preventDefault={() => dispatch('naverSignIn')}>
      네이버로 로그인하기
    </button>
    <button
      class="btn-login ic-google"
      on:click|preventDefault={() => dispatch('googleSignIn')}>
      구글로 로그인하기
    </button>
  </div>
</Modal>
