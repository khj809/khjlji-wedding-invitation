<script>
  import { onMount } from 'svelte';

  let scrollY = 0;
  const scrollBarHeight =
    (window.innerHeight * window.innerHeight) / document.body.offsetHeight;

  onMount(() => {
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
      document.querySelectorAll('.section').forEach(element => {
        if (
          !element.classList.contains('loaded') &&
          element.offsetTop - scrollBarHeight < scrollY
        ) {
          element.classList.add('loaded');
        }
      });
    });
  });
</script>
