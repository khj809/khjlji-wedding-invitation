<style lang="scss">
  .ic {
    &-bride,
    &-groom {
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    &-groom {
      background-image: url('/assets/images/ic-groom.png');
    }
    &-bride {
      background-image: url('/assets/images/ic-bride.png');
    }
    &-call,
    &-message {
      display: inline-block;
      vertical-align: middle;
      width: 25px;
      height: 25px;
    }
    &-call {
      margin-right: 20px;
    }
  }

  .name {
    font-size: 15px;
    font-weight: bold;
    > em {
      font-size: 13px;
      font-weight: normal;
      margin-right: 5px;
    }
  }

  .couple {
    .tel-wrap {
      padding: 0 2rem;
      box-sizing: border-box;
      > div {
        width: 50%;
        margin: 0.8rem 0;
      }
    }
  }

  .parents {
    margin-top: 5rem;
    background-color: #f7f7f7;
    > .flex {
      padding: 5rem 2rem;
      box-sizing: border-box;
      > div {
        width: 50%;
      }
    }

    .parent-title {
      font-size: 13px;
      text-align: center;
      color: #333;
      margin-bottom: 3rem;
    }
    .tel-wrap {
      text-align: center;
      &.mother {
        margin-bottom: 2rem;
      }
      .ic {
        &-call,
        &-message {
          width: 20px;
          height: 20px;
        }
      }
      .name {
        display: inline-block;
        font-size: 13px;
        margin-bottom: 1rem;
        > em {
          font-size: 10px;
        }
      }
    }
  }
</style>

<div class="info-wrap">
  <!-- 신부, 신랑 연락처 -->
  <div class="section couple">
    <div class="grid">
      <div class="tel-wrap flex">
        <div>
          <i class="ic-bride" />
          <span class="name">
            <em>신부</em>
            임정임
          </span>
        </div>
        <div class="align-right">
          <a href="tel:010-7378-2407" class="ic-call">
            <img src="/assets/images/ic-call.png" alt="신부에게 전화하기" />
          </a>
          <a href="sms:010-7378-2407" class="ic-message">
            <img src="/assets/images/ic-message.png" alt="신부에게 문자하기" />
          </a>
        </div>
      </div>
      <div class="tel-wrap flex">
        <div>
          <i class="ic-groom" />
          <span class="name">
            <em>신랑</em>
            김해준
          </span>
        </div>
        <div class="align-right">
          <a href="tel:010-2710-0109" class="ic-call">
            <img src="/assets/images/ic-call.png" alt="신랑에게 전화하기" />
          </a>
          <a href="sms:010-2710-0109" class="ic-message">
            <img src="/assets/images/ic-message.png" alt="신랑에게 문자하기" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- 신부, 신랑 연락처 끝 -->
  <div class="section parents">
    <div class="grid flex">
      <!-- 신부측 혼주 연락처 -->
      <div class="bride">
        <p class="parent-title">신부측 혼주</p>
        <div class="tel-wrap mother">
          <div>
            <span class="name">
              <em>어머니</em>
              우지순
            </span>
          </div>
          <div>
            <a href="tel:010-4478-7117" class="ic-call">
              <img
                src="/assets/images/ic-call.png"
                alt="신부 측 어머니께 전화하기" />
            </a>
            <a href="sms:010-4478-7117" class="ic-message">
              <img
                src="/assets/images/ic-message.png"
                alt="신부 측 어머니께 문자하기" />
            </a>
          </div>
        </div>
        <div class="tel-wrap">
          <div>
            <span class="name">
              <em>아버지</em>
              임종구
            </span>
          </div>
          <div>
            <a href="tel:010-8807-7117" class="ic-call">
              <img
                src="/assets/images/ic-call.png"
                alt="신부 측 아버지께 전화하기" />
            </a>
            <a href="sms:010-8807-7117" class="ic-message">
              <img
                src="/assets/images/ic-message.png"
                alt="신부 측 아버지께 문자하기" />
            </a>
          </div>
        </div>
      </div>
      <!-- 신랑측 혼주 연락처 -->
      <div class="groom">
        <p class="parent-title">신랑측 혼주</p>
        <div class="tel-wrap mother">
          <div>
            <span class="name">
              <em>어머니</em>
              박명숙
            </span>
          </div>
          <div>
            <a href="tel:010-4561-0108" class="ic-call">
              <img
                src="/assets/images/ic-call.png"
                alt="신랑 측 어머니께 전화하기" />
            </a>
            <a href="sms:010-4561-0108" class="ic-message">
              <img
                src="/assets/images/ic-message.png"
                alt="신랑 측 어머니께 문자하기" />
            </a>
          </div>
        </div>
        <div class="tel-wrap">
          <div>
            <span class="name">
              <em>아버지</em>
              김정수
            </span>
          </div>
          <div>
            <a href="tel:010-9615-0102" class="ic-call">
              <img
                src="/assets/images/ic-call.png"
                alt="신랑 측 아버지께 전화하기" />
            </a>
            <a href="sms:010-9615-0102" class="ic-message">
              <img
                src="/assets/images/ic-message.png"
                alt="신랑 측 아버지께 문자하기" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 혼주 연락처 끝 -->
  </div>
  <!-- 연락처 끝 -->
</div>
