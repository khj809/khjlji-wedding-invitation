<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Siema from 'siema';
  import Modal from './Modal.svelte';

  export let photoList;
  export let startIndex;
  let currentIndex;
  let siema;

  const dispatch = createEventDispatcher();

  onMount(() => {
    siema = new Siema({
      selector: '.siema',
      duration: 200,
      easing: 'ease-out',
      multipleDrag: false,
      startIndex: startIndex,
      loop: true,
      onInit: () => {
        currentIndex = startIndex;
      },
      onChange: () => {
        currentIndex = siema.currentSlide;
      },
    });
  });
</script>

<style lang="scss">
  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 8;
    width: 90%;
    transform: translate(-50%, -50%);
    border-radius: 0.2em;
  }

  .modal-header {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    width: 100%;
    max-width: 768px;
    justify-content: space-between;
    padding: 20px;
    z-index: 9;

    > h2,
    > button {
      font-size: 18px;
      font-weight: bold;
      line-height: 30px;
      height: 30px;
      color: #fff;
    }

    > button {
      width: 30px;
      text-indent: -9999em;
      background: url('/assets/images/ic-close.png') no-repeat 50%;
      background-size: 15px 15px;
    }
  }

  .photo-modal {
    width: 100%;
    padding-top: 100%;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50%;
  }

  .siema {
    max-width: 576px;
    max-height: 648px;
    margin: 0 auto;
  }
</style>

<Modal on:close>
  <div slot="modal">
    <div class="modal-header">
      <h2>{currentIndex + 1} / {photoList.length}</h2>
      <button on:click={() => dispatch('close')}>닫기</button>
    </div>
    <div class="modal">
      <div class="siema">
        {#each photoList as photo, idx}
          <div
            class={`photo-modal photo-modal-${idx + 1}`}
            style="background-image: url({photo.src})" />
        {/each}
      </div>
    </div>
  </div>
</Modal>
