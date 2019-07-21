<script>
  import { onMount } from 'svelte';
  import Notifications from 'svelte-notifications';

  import Header from './Header.svelte';
  import Greeting from './Greeting.svelte';
  import Information from './Information.svelte';
  import Gallery from './Gallery.svelte';
  import Gift from './Gift.svelte';
  import DaumMap from './DaumMap.svelte';
  import Comment from './Comment.svelte';
  import SocialShare from './SocialShare.svelte';
  import Footer from './Footer.svelte';
  import Loading from './Loading.svelte';

  import ScrollbarManager from './ScrollbarManager.svelte';
  import LoginManager from './LoginManager.svelte';
  import ThirdPartyManager from './ThirdPartyManager.svelte';

  import { thirdPartyContext } from './store';

  const appReadyDelayMs = 1000;
  let appReady = false;

  onMount(() => {
    setTimeout(() => {
      appReady = true;
    }, appReadyDelayMs);
  });
</script>

{#if appReady}
  <Notifications>
    <Header />
    <Greeting />
    <Information />
    <Gallery />
    <Gift />
    <DaumMap />
    <Comment />
    <SocialShare />
    <Footer />

    <ThirdPartyManager />
    <ScrollbarManager />
    <LoginManager />

  </Notifications>
{:else}
  <Loading type="main" />
{/if}
