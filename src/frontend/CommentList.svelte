<script>
  import CommentItem from './CommentItem.svelte';
  export let comments;
</script>

<style>
  .comment-list-wrap {
    margin-top: 30px;
  }
</style>

<ul class="comment-list-wrap">
  {#each comments as comment (comment.id)}
    <CommentItem data={comment} on:delete />
  {/each}
</ul>
