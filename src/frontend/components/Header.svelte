<script>
  import { onMount } from 'svelte';
  let burger;
  let gnb;

  onMount(() => {
    gnb.querySelectorAll('li>a').forEach(el => {
      el.onclick = e => {
        e.preventDefault(); // <=== Don't follow the link
        smoothScroll(el.hash.substring(1), 300);
      };
    });
  });

  function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }

  function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  }

  function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      }
      return;
    }
    for (var i = startY; i > stopY; i -= step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
  }
</script>

<style lang="scss">
  header {
    position: relative;
    width: 100%;
    height: 50vw;
    background: url('/assets/images/ogImage.jpg') no-repeat;
    background-position: 50% 90%;
    background-size: cover;
    animation: fadein 0.5s ease-in;
    animation-fill-mode: both;
    &::after {
      position: absolute;
      display: block;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.1;
      z-index: 1;
    }
  }

  .title-area {
    position: relative;
    z-index: 2;
    display: table;
    width: 100%;
    height: 100%;
    > h1 {
      display: table-cell;
      vertical-align: middle;
      font-family: 'Coming Soon', cursive;
      font-size: 5rem;
      font-weight: 400;
      text-shadow: 1px 1px 1px #000;
      letter-spacing: 5px;
      color: #fff;
    }
  }

  .lim {
    animation: fadeInDown 0.5s 0.5s;
    animation-fill-mode: both;
  }

  .kim {
    animation: fadeInUp 0.5s 0.5s;
    animation-fill-mode: both;
  }

  @media (max-width: 1023px) {
    header {
      height: 100vh;
      background-position: 50% 50%;
    }
    .title-area {
      > h1 {
        display: block;
        font-size: 5vh;
        margin-top: 4vh;
      }
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .gnb {
    position: relative;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 5;
    width: 100%;
    background-color: transparent;
    transition: 0.5s;
    > li {
      width: 100%;
      padding: 10.5px 5px;
      > a {
        display: block;
        font-size: 18px;
        letter-spacing: -1.5px;
        text-align: center;
      }
    }
  }

  /* :global(&.theme-dark) {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.55);
    transition: 0.5s;
    > li {
      > a {
        color: #fff;
      }
      &.active {
        > a {
          text-indent: -9999em;
          background-size: 18px 18px;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          &.ic {
            &-phone {
              background-image: url('/assets/images/ic-phone.png');
            }
            &-gallery {
              background-image: url('/assets/images/ic-gallery.png');
            }
            &-gift {
              background-image: url('/assets/images/ic-gift.png');
            }
            &-comeon {
              background-image: url('/assets/images/ic-comeon.png');
            }
            &-comment {
              background-image: url('/assets/images/ic-comment.png');
            }
          }
        }
      }
    }
  } */

  @media (max-width: 411px) {
    .gnb {
      > li {
        > a {
          font-size: 14px;
          letter-spacing: -1.5px;
        }
      }
    }
  }
</style>

<header>
  <div class="grid title-area align-center">
    <h1>
      <p class="lim">
        LIM
        <br class="ls-tablet" />
        JEONGIM
      </p>
      <div class="mid-line">&</div>
      <p class="kim">
        KIM
        <br class="ls-tablet" />
        HAEJOON
      </p>
    </h1>
  </div>
</header>

<div class="gnb-wrap">
  <ul class="gnb flex" bind:this={gnb}>
    <li>
      <a href="#id-information" class="ic-phone">연락처</a>
    </li>
    <li>
      <a href="#id-gallery" class="ic-gallery">사진첩</a>
    </li>
    <li>
      <a href="#id-gift" class="ic-gift">선물예약</a>
    </li>
    <li>
      <a href="#id-map" class="ic-comeon">오시는길</a>
    </li>
    <li>
      <a href="#id-comment" class="ic-comment">댓글달기</a>
    </li>
  </ul>
</div>
