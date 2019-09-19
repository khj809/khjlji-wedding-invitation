<script>
  import { onMount } from 'svelte';

  import { user, showLoginModal } from './store';
  import { getGifts, createReservation, deleteReservation } from './api';
  import GiftReservationModal from './GiftReservationModal.svelte';
  import { toastMsg } from './toast';
  import Loading from './Loading.svelte';

  let gifts = [];
  let isLoading = false;
  let showReservationModal = false;
  let selectedGift;

  onMount(async () => {
    isLoading = true;
    gifts = await getGifts();
    isLoading = false;
  });

  const onReserve = gift => {
    if (!$user) {
      showLoginModal.set(true);
    } else {
      selectedGift = gift;
      showReservationModal = true;
    }
  };

  const handleCreateReservation = async e => {
    try {
      const newReservation = await createReservation({
        user: $user,
        ...e.detail,
      });
      gifts = gifts.map(gift => {
        if (gift.id === newReservation.gift.id) {
          gift.reservation = newReservation;
        }
        return gift;
      });
      showReservationModal = false;
      toastMsg('선물 예약에 성공하였습니다!');
    } catch (err) {
      console.log(err);
      toastMsg('선물 예약에 실패하였습니다.');
    }
  };

  const handleCancelReservation = async gift => {
    if (confirm('정말로 예약을 취소하시겠습니까?')) {
      try {
        const deletedReservation = await deleteReservation({
          user: $user,
          reservation: gift.reservation,
        });
        gifts = gifts.map(_gift => {
          if (_gift.id === gift.id) {
            _gift.reservation = null;
          }
          return _gift;
        });
        toastMsg('예약이 취소되었습니다.');
      } catch (err) {
        console.log(err);
        toastMsg('예약 취소에 실패하였습니다.');
      }
    }
  };
</script>

<style lang="scss">
  .gift-wrap {
    padding: 42px 20px;
    background-color: #f7f7f7;
  }

  .gift-list {
    display: inline-block;
    width: 33.3333%;
    padding: 5px;
  }

  .gift {
    width: 100%;
    height: 180px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 20%;
    background-color: #000;
  }

  .gift-img.reserved {
    opacity: 0.3;
  }

  .btn-reservation {
    width: 100%;
    font-size: 18px;
    color: #fff;
    margin-top: 5px;
    padding: 5px;
    box-sizing: border-box;
    background-color: #073c35;
    &.disable {
      pointer-events: none;
      background-color: #aaa;
    }
  }

  .loading {
    width: 20px;
    height: 20px;
    margin: 0 auto;
  }

  .sub-content {
    font-size: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .gift {
      height: 30vw;
    }
  }

  @media (max-width: 411px) {
    .btn-reservation {
      font-size: 15px;
    }

    .sub-content {
      font-size: 16px;
    }
  }
</style>

<div id="id-gift" class="section gift-wrap">
  <div class="grid">
    <p class="sub-title align-center">선물 예약하기</p>
    <p class="sub-content align-center">
      저희에게 특별한 선물을
      <br />
      준비하려고 고민하실 분들을 위해
      <br />
      저희가 앞으로 살아나가는 데에
      <br />
      필요할 만한 것들을 정리해 보았습니다.
      <br />
      <br />
      정성을 가득 담아 보내주신 선물은
      <br />
      항상 감사한 마음을 잃지 않고
      <br />
      소중히 다루어 사용하겠습니다.
      <br />
      <br />
      소셜 계정으로 로그인하여
      <br />
      애정어린 한마디와 함께
      <br />
      선물을 예약해 주세요.
    </p>
    {#each gifts as gift, idx}
      <div class={`gift-list gift-${idx + 1}`}>
        <a href={gift.link} target="_blank">
          <img
            src={gift.image}
            alt={gift.name}
            class={`gift-img ${!!gift.reservation && 'reserved'}`} />
        </a>
        {#if !!$user && !!gift.reservation && $user.id === gift.reservation.user.id}
          <button
            class="btn-reservation"
            on:click|preventDefault={() => handleCancelReservation(gift)}>
            예약취소
          </button>
        {:else if !!gift.reservation}
          <button class="btn-reservation disable">예약완료</button>
        {:else}
          <button
            class="btn-reservation"
            on:click|preventDefault={() => onReserve(gift)}>
            예약하기
          </button>
        {/if}
      </div>
    {/each}

    {#if isLoading}
      <Loading type="gift" />
    {/if}
  </div>
</div>

{#if showReservationModal}
  <GiftReservationModal
    on:createReservation={handleCreateReservation}
    on:close={() => {
      showReservationModal = false;
    }}
    gift={selectedGift} />
{/if}
