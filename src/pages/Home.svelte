<script>
    import CharityList from '../components/CharityList.svelte';
	import Header from '../components/Header.svelte';
	import Welcome from '../components/Welcome.svelte';
	import Preload from '../components/Preload.svelte';
	import Promo from '../components/Promo.svelte';
	import Footer from '../components/Footer.svelte';

	let data = getData();

	async function getData() {
		const res  = await fetch("https://charity-api-bwa.herokuapp.com/charities/");
		const data = await res.json();
		
		if (res.ok) {
			console.log(data)
			return data;
		} else {
			throw new Error(data)
		}
	}
</script>

<Header />
	<Welcome />
	{#await data}
		<Preload />
	{:then charities} 
		<CharityList {charities} />
	{/await}
	<Promo />
<Footer />
