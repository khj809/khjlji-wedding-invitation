<script>
  import { onMount } from 'svelte';
  import CommentList from './CommentList.svelte';
  import Loading from './Loading.svelte';
  import { user, authToken, showLoginModal } from '../utils/store';
  import { toastMsg } from '../utils/toast';
  import { getComments, createComment, deleteComment } from '../graphql';

  let commentWrap = null;
  let comments = [];
  let isLoading = false;

  onMount(async () => {
    commentWrap = document.querySelector('.comment-wrap');
    await fetchComments();
    window.addEventListener('scroll', handleScrollEvent);
  });

  const fetchComments = async () => {
    isLoading = true;
    const newComments = await new Promise((resolve, reject) => {
      setTimeout(async () => {
        const newComments = await getComments({
          offset: comments.length,
          limit: 10,
        });
        resolve(newComments);
      }, 300);
    });
    comments = comments.concat(newComments);
    isLoading = false;
    return newComments;
  };

  const handleScrollEvent = async () => {
    if (isLoading) return;

    const scrollY = window.scrollY;
    if (scrollY > commentWrap.offsetTop - 150) {
      const newComments = await fetchComments();
      if (newComments.length === 0) {
        window.removeEventListener('scroll', handleScrollEvent);
      }
    }
  };

  const handleTextareaFocused = e => {
    if (!$user) {
      e.target.blur();
      showLoginModal.set(true);
    }
  };

  const handleSubmit = async e => {
    if (!$user) {
      showLoginModal.set(true);
      return;
    }

    const text = e.target[0].value;
    if (!text) {
      toastMsg('내용을 입력해 주세요.');
      return;
    }

    try {
      const newComment = await createComment({ text }, $authToken);
      comments = [newComment].concat(comments);
      e.target[0].value = '';
      handleTextareaResize(e.target[0]);
    } catch (err) {
      console.log(err);
      toastMsg('댓글 등록에 실패하였습니다.');
    }
  };

  const handleDeleteComment = async e => {
    try {
      const deletedComment = await deleteComment({
        id: e.detail.id,
      }, $authToken);
      comments = comments.filter(c => c.id !== deletedComment.id);
    } catch (err) {
      console.log(err);
      toastMsg('댓글 삭제에 실패하였습니다.');
    }
  };

  const handleTextareaResize = el => {
    const BtnComment = document.getElementById('btn-comment');
    el.style.cssText = 'height: auto';
    el.style.cssText =
      el.scrollHeight >= el.offsetHeight
        ? 'height:' + el.scrollHeight + 'px'
        : 'height:' + el.offsetHeight + 'px';
    BtnComment.style.cssText =
      el.scrollHeight >= el.offsetHeight
        ? 'height:' + el.scrollHeight + 'px'
        : 'height:' + el.offsetHeight + 'px';
  };
</script>

<style lang="scss">
  .comment-wrap {
    background-color: #f7f7f7;
    > .padding {
      padding: 42px 20px 21px;
    }
  }

  .login-name {
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 18px;
    text-align: left;
    margin-bottom: 10px;
    > i {
      display: inline-block;
      vertical-align: middle;
      width: 18px;
      height: 18px;
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

  .input-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > textarea,
    > input {
      max-height: 100px;
      font-family: 'Nanum Gothic', sans-serif;
      font-size: 18px;
      line-height: 1.5;
      padding: 5px 10px;
      border: 1px solid #073c35;
      border-radius: 0;
      box-sizing: border-box;
    }

    > textarea {
      width: calc(100% - 80px);
      resize: none;
    }

    > input {
      width: 80px;
      color: #fff;
      background-color: #073c35;
      cursor: pointer;
    }
  }

  @media (max-width: 411px) {
    .login-name {
      font-size: 14px;
      > i {
        width: 15px;
        height: 15px;
      }
    }

    .input-wrap {
      > textarea,
      > input {
        font-size: 14px;
      }
    }
  }
</style>

<div id="id-comment" class="section comment-wrap">
  <div class="grid padding">
    <form on:submit|preventDefault={handleSubmit}>
      {#if !!$user}
        <h5 class="login-name">
          <i class={$user.provider} />
          {$user.name}
        </h5>
      {/if}

      <div class="input-wrap">
        <textarea
          rows="1"
          maxlength="1000"
          placeholder={!!$user ? '1000자 이내 입력' : '소셜 로그인을 해주세요.'}
          on:focus|preventDefault={handleTextareaFocused}
          on:input={e => {
            handleTextareaResize(e.target);
          }} />
        <input
          id="btn-comment"
          type="submit"
          value={!!$user ? '등록' : '로그인'} />
      </div>
    </form>

    <CommentList {comments} on:delete={handleDeleteComment} />

    {#if isLoading}
      <Loading type="comment" />
    {/if}
  </div>
</div>
