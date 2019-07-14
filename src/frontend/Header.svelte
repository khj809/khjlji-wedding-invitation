<script>
  let burger;
</script>

<style lang="scss">
  header {
    position: relative;
    width: 100%;
    height: 50vw;
    font-family: 'Chalisa Octavia';
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
    width: 400px;
    height: 100%;
    text-align: center;
    > h1 {
      display: table-cell;
      vertical-align: middle;
      font-size: 6rem;
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
      width: 280px;
      > h1 {
        display: block;
        margin-top: 15px;
      }
    }
  }

  @media (max-width: 768px) {
    .title-area {
      width: 200px;
      > h1 {
        display: block;
        font-size: 5vh;
        margin-top: 5vh;
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
</style>

<header>
  <div class="grid title-area">
    <h1>
      <p class="lim">
        Lim
        <br class="ls-mobile" />
        Jeongim
      </p>
      <div class="mid-line">&</div>
      <p class="kim">
        Kim
        <br class="ls-mobile" />
        Haejoon
      </p>
    </h1>
  </div>
</header>
