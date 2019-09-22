<script>
  import { createEventDispatcher } from 'svelte';
  import dayjs from 'dayjs';
  import { user } from './store';

  export let data;

  const dispatch = createEventDispatcher();
  let createdAt = dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss');
</script>

<style lang="scss">
  .comment-list {
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #dfdcdc;
    &:last-of-type {
      margin-bottom: 21px;
    }
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      font-family: 'Nanum Gothic', sans-serif;
      font-size: 18px;
      > i {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        margin-right: 3px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        &.kakao {
          background-image: url('/assets/images/ic-kakao.png');
        }
        &.facebook {
          background-image: url('/assets/images/ic-facebook.png');
        }
        &.naver {
          background-image: url('/assets/images/ic-naver.png');
        }
        &.google {
          background-image: url('/assets/images/ic-google.png');
        }
      }
    }
    span {
      font-family: 'Nanum Gothic', sans-serif;
      font-size: 18px;
    }
  }

  .list-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    > p {
      width: calc(100% - 30px);
      font-family: 'Nanum Gothic', sans-serif;
      font-size: 18px;
      line-height: 1.5;
      white-space: pre-wrap;
    }
    > .btn-delete {
      width: 30px;
      font-size: 18px;
      line-height: 1.5;
      cursor: pointer;
    }
  }

  @media (max-width: 411px) {
    .comment-list {
      font-size: 14px;
    }

    .list-header {
      h5 {
        font-size: 14px;
        > i {
          width: 15px;
          height: 15px;
        }
      }
      span {
        font-size: 13px;
      }
    }

    .list-text {
      > p {
        font-size: 14px;
      }
      > .btn-delete {
        font-size: 13px;
      }
    }
  }
</style>

<li class="comment-list">
  <div class="list-header">
    <h5>
      <i class={data.user.provider} />
      {data.user.name}
    </h5>
    <span>{createdAt}</span>
  </div>
  <div class="list-text">
    <p>{data.text}</p>
    {#if !!$user && $user.id === data.user.id}
      <button
        class="btn-delete"
        on:click|preventDefault={() => dispatch('delete', data)}>
        삭제
      </button>
    {/if}
  </div>
</li>
