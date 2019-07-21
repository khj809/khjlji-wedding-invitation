<script>
  import { onMount } from 'svelte';

  let scrollY = 0;
  const scrollBarHeight =
    (window.innerHeight * window.innerHeight) / document.body.offsetHeight;
  let menuItems;

  onMount(() => {
    menuItems = Array.from(document.querySelectorAll('.gnb>li>a'));

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

      // gnb 색상변경
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

      var underScrollMenus = menuItems.filter(a => {
        var targetDiv = document.querySelector(a.hash);
        return targetDiv.offsetTop < scrollY + 42;
      });

      menuItems.forEach(menu => {
        menu.parentElement.classList.remove('active');
      });

      var curMenu = underScrollMenus[underScrollMenus.length - 1];
      if (!!curMenu) {
        curMenu.parentElement.classList.add('active');
      }
    });
  });
</script>
