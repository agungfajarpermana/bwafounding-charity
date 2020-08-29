<script>
	import {onDestroy, onMount} from 'svelte';
	import CharityList from '../components/CharityList.svelte';
	import Loader from '../components/Preload.svelte'
	import Header from '../components/Header.svelte';
	import Welcome from '../components/Welcome.svelte';
	import Promo from '../components/Promo.svelte';
	import Footer from '../components/Footer.svelte';
	import { Loaders, loaders } from '../stores/store';

	onDestroy(() => {
		window.scrollTo(0,0)
	})

	onMount(() => {
		loaders.set(false)
	})

	$: Loaders(true)
</script>

{#if !$loaders}
	<Loader />
{/if}
	<Header />
		<Welcome />
			<CharityList />
		<Promo />
	<Footer />