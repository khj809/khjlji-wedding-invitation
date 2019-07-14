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
    font-family: 'NanumGothic';
    font-size: 12px;
    line-height: 1.5;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #dfdcdc;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      font-size: 12px;
      > i {
        display: inline-block;
        vertical-align: middle;
        width: 12px;
        height: 12px;
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
      font-size: 10px;
    }
  }

  .list-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    > p {
      width: calc(100% - 30px);
      font-size: 12px;
      line-height: 1.5;
      white-space: pre-wrap;
    }
    > .btn-delete {
      width: 30px;
      font-family: 'NanumGothic';
      font-size: 12px;
      line-height: 1.5;
      cursor: pointer;
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
