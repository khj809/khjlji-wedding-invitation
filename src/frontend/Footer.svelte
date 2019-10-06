<style lang="scss">
  .footer-wrap {
    padding: 20px;
    background-color: #073c35;

    .position {
      position: relative;
    }

    .thankyou {
      font-family: 'Coming Soon', cursive;
      font-size: 28px;
      text-align: center;
      line-height: 1.5;
      color: #fff;
    }

    .copyright {
      display: block;
      font-family: 'Coming Soon', cursive;
      font-size: 16px;
      text-align: center;
      line-height: 1.5;
      color: #fff;
      margin-top: 10px;
    }

    .github {
      position: absolute;
      right: 0;
      animation: dongdong 0.5s 1s infinite linear alternate;
      > a {
        display: block;
        width: 28px;
        height: 28px;
      }
    }
  }

  @media (max-width: 411px) {
    .footer-wrap {
      .thankyou {
        font-size: 20px;
      }
      .copyright {
        font-size: 12px;
      }
      .github {
        > a {
          width: 23px;
          height: 23px;
        }
      }
    }
  }

  @keyframes dongdong {
    0% {
      top: -5px;
    }
    100% {
      top: 0px;
    }
  }
</style>

<div class="footer-wrap">
  <div class="grid position">
    <p class="thankyou">Thank you</p>
    <div class="github">
      <a
        href="https://github.com/khj809/khjlji-wedding-invitation"
        target="_blank">
        <img src="/assets/images/ic-github.png" alt="github" />
      </a>
    </div>
    <small class="copyright">
      © 2019 Jeongim & Haejoon. All Rights Reserved.
    </small>
  </div>
</div>
