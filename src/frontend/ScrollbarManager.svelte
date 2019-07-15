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

      let gnbScroll = document.querySelector('.gnb');
      let gnbWrapScroll = document.querySelector('.gnb-wrap');

      if (
        !gnbScroll.classList.contains('theme-dark') &&
        gnbScroll.offsetTop < scrollY
      ) {
        gnbScroll.classList.add('theme-dark');
      } else if (
        gnbScroll.classList.contains('theme-dark') &&
        gnbWrapScroll.offsetTop > scrollY
      ) {
        gnbScroll.classList.remove('theme-dark');
      }
    });
  });
</script>
