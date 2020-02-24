<script>
  import { onMount } from 'svelte';

  const url = 'https://khjlji-wedding-invitation.herokuapp.com';
  const title = document
    .querySelector("meta[property='og:title']")
    .getAttribute('content');
  const description = document
    .querySelector("meta[property='og:description']")
    .getAttribute('content');

  const shareFacebook = () => {
    FB.ui({
      method: 'share',
      href: url,
    });
  };

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
    height: 24px;
    vertical-align: top;
  }

  .share-kakaostory {
    width: 24px;
    height: 24px;
    vertical-align: top;
  }

  #custom-fb-button,
  #custom-tweet-button {
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    color: transparent;
    text-indent: -9999em;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  #custom-fb-button {
    background-image: url('/assets/images/ic-facebook.png');
  }

  #custom-tweet-button {
    background-image: url('/assets/images/ic-twitter.png');
  }
</style>

<div class="grid">
  <ul class="share-wrap">
    <li class="border-none">
      <button id="custom-fb-button" on:click={shareFacebook} alt="페이스북" />
    </li>
    <li>
      <a
        id="custom-tweet-button"
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
