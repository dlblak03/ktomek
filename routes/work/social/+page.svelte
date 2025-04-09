<script lang="ts">
	import Row from '$lib/Row.svelte';
	import Column from '$lib/Column.svelte';
	
	import Header from '$lib/Text/Header.svelte';
	import Body from '$lib/Text/Body.svelte';
	
	import { onMount } from 'svelte';
	import { dark } from '../../ui_store';
    import type { PageData } from './$types';

    let windowWidth = 1001;
    
    export let data: PageData;

	onMount(async () => {
		windowWidth = window.innerWidth;
		window.addEventListener('resize', onresize);
	});

	var onresize = function () {
		windowWidth = window.innerWidth;
	};
</script>

<svelte:head>
	<title>Ktomek Work | Social Media</title>
</svelte:head>

<Row
	padding={windowWidth > 1000 ? '50px' : '25px'}
	grow="1"
	height={windowWidth > 1000 ? 'calc(100% - 100px)' : 'calc(100% - 50px)'}
	overflowy="auto"
>
	<Column grow="1" padding="0 0 50px 0" width="100%" gap="20px">
		<Row width="100%">
			<Column>
				<Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px">Social Media</Header>
				<Body color={$dark ? 'var(--darktext)' : 'initial'}
					>Use this form to set up social media accounts managed by Ktomek, access posts, and view reports on those accounts. (available soon)</Body
				>
			</Column>
		</Row>
	</Column>
</Row>