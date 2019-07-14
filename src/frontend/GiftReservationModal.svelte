<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  import Modal from './Modal.svelte';
  import { user } from './store';
  import { toastMsg } from './toast';

  export let gift;

  const dispatch = createEventDispatcher();

  const handleSubmit = e => {
    dispatch('createReservation', { gift, text: e.target[0].value });
  };
</script>

<style lang="scss">
  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 5;
    width: 80%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 4px 6px 10px 2px rgba(0, 0, 0, 0.5);
    background-color: #fff;

    > h1 {
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .gift-res-msg {
      resize: none;
      width: 100%;
      height: 100px;
      font-size: 12px;
      line-height: 1.5;
      padding: 10px;
      border-radius: 3px;
      border: 1px solid #073c35;
      overflow-y: auto;
    }

    .btn-res {
      display: block;
      width: 80px;
      height: 35px;
      line-height: 35px;
      font-family: 'NanumGothic';
      font-size: 13px;
      color: #fff;
      margin: 15px auto 0;
      background-color: #073c35;
      cursor: pointer;
    }
  }
</style>

<Modal on:close>
  <div class="modal" slot="modal">
    <h1 class="align-center">소중한 한마디와 함께 선물을 예약해 주세요.</h1>
    <h1 class="align-center">
       {$user.name} 님께서 선물해 주신 {gift.name}은(는)
      <br />
      항상 감사한 마음으로 사용하겠습니다.
    </h1>
    <form on:submit|preventDefault={handleSubmit}>
      <textarea class="gift-res-msg" required />
      <input class="btn-res" type="submit" value="예약하기" />
    </form>
  </div>
</Modal>
