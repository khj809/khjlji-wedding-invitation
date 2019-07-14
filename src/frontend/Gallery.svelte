<script>
  import GalleryModal from './GalleryModal.svelte';

  let showModal = false;
  let selectedPhotoIdx = -1;
  let photoList = [
    {
      src: '/assets/images/photo-01.jpg',
    },
    {
      src: '/assets/images/photo-02.jpg',
    },
    {
      src: '/assets/images/photo-03.jpg',
    },
    {
      src: '/assets/images/photo-04.jpg',
    },
    {
      src: '/assets/images/photo-05.jpg',
    },
    {
      src: '/assets/images/photo-06.jpg',
    },
    {
      src: '/assets/images/photo-07.jpg',
    },
    {
      src: '/assets/images/ogImage.jpg',
    },
    {
      src: '/assets/images/photo-09.jpg',
    },
    {
      src: '/assets/images/photo-10.jpg',
    },
  ];
</script>

<style lang="scss">
  .gallery {
    margin: 5rem 0;
    padding: 0 2rem;
  }

  .photo-wrap {
    display: inline-block;
    width: 33.3333%;
    padding: 5px;
  }

  .photo {
    width: 100%;
    height: 180px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 20%;
  }

  @media (max-width: 768px) {
    .photo {
      height: 30vw;
    }
  }
</style>

<div class="section gallery-wrap">
  <div class="grid">
    <div class="gallery">
      <p class="sub-title align-center">사진첩</p>
      {#each photoList as photo, idx}
        <div
          class={`photo-wrap photo-${idx + 1}`}
          on:click={() => {
            showModal = true;
            selectedPhotoIdx = idx;
          }}>
          <div class="photo" style="background-image: url({photo.src})" />
        </div>
      {/each}
    </div>
  </div>
</div>

{#if showModal}
  <GalleryModal
    on:close={() => (showModal = false)}
    {photoList}
    startIndex={selectedPhotoIdx} />
{/if}
