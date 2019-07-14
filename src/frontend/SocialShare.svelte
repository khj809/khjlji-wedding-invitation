<script>
  import { onMount } from 'svelte';

  const url = 'https://khjlji-wedding-invitation.herokuapp.com';
  const title = document
    .querySelector("meta[property='og:title']")
    .getAttribute('content');
  const description = document
    .querySelector("meta[property='og:description']")
    .getAttribute('content');

  const shareKakaoLink = () => {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: '/assets/images/og-image.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    });
  };

  const shareKakaoStory = () => {
    Kakao.Story.open({
      url,
      text: `${title} ${description}`,
    });
  };
</script>

<style lang="scss">
  .share-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2rem 0;

    > li {
      width: 100%;
      text-align: center;
      border-left: 1px solid #dfdcdc;
      &.border-none {
        border-left: 0 none;
      }
    }
  }

  .share-kakao {
    width: 24px;
    height: 25px;
  }

  .share-kakaostory {
    width: 24px;
    height: 24px;
  }
</style>

<div class="grid">
  <ul class="share-wrap">
    <li class="border-none">
      <button class="fb-share-button" data-href={url} data-layout="button">
        페이스북
      </button>
    </li>
    <li>
      <a
        class="twitter-share-button"
        href={`https://twitter.com/intent/tweet?text=${encodeURI(`${title} ${description}`)}&url=${url}`}>
        트위터
      </a>
    </li>
    <li>
      <button class="share-kakao" on:click={shareKakaoLink}>
        <img
          src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
          alt="카카오톡" />
      </button>
    </li>
    <li>
      <button class="share-kakaostory" on:click={shareKakaoStory}>
        <img
          src="https://developers.kakao.com/sdk/js/resources/story/icon_small.png"
          alt="카카오스토리로 공유하기" />
      </button>
    </li>
  </ul>
</div>
