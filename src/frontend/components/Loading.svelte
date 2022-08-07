<script>
  export let type;
</script>

<style lang="scss">
  // 일반로딩
  .loading-wrap {
    display: table;
    width: 100%;
    height: 100vh;

    .loading-content {
      display: table-cell;
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }

    .rhombus {
      width: 75px;
      height: 75px;
      margin: -80px auto 0;
    }

    .rhombus::before,
    .rhombus .circle1,
    .rhombus .circle2 {
      position: absolute;
      content: '';
      width: 40px;
      height: 40px;
      background: #ea4c89;
    }

    .rhombus .circle1,
    .rhombus .circle2 {
      z-index: 1;
      border-radius: 50%;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }

    .rhombus:before {
      z-index: 0;
      margin-top: 15px;
      margin-left: 15px;
      transform: rotate(45deg);
      background: #ea4c89;
    }

    .rhombus .circle1 {
      animation-name: change1;
    }

    .rhombus .circle2 {
      margin-left: 30px;
      animation-name: change2;
    }
  }

  // 일반 로딩
  .loading {
    width: 20px;
    height: 20px;
    margin: 0 auto;
  }

  // 애니메이션
  @keyframes change1 {
    0%,
    25% {
      margin-top: 0px;
      margin-left: 0px;
    }
    50%,
    75% {
      margin-top: 30px;
      margin-left: 30px;
    }
  }

  @keyframes change2 {
    25%,
    50% {
      margin-top: 30px;
      margin-left: 0px;
    }
    75%,
    100% {
      margin-top: 0px;
      margin-left: 30px;
    }
  }
</style>

{#if type === 'main'}
  <div class="loading-wrap">
    <div class="loading-content">
      <div class="rhombus">
        <div class="circle1" />
        <div class="circle2" />
      </div>
    </div>
  </div>
{:else}
  <div class="loading">
    <img src="/assets/images/loading.gif" alt="loading-comments" />
  </div>
{/if}
