<script lang="ts">
	import Row from '$lib/Row.svelte';
	import Column from '$lib/Column.svelte';

	import Header from '$lib/Text/Header.svelte';
	import Body from '$lib/Text/Body.svelte';

	import Form from '$lib/v2/Inputs/form.svelte';
	import ButtonPrimary from '$lib/v2/Buttons/button-primary.svelte';

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
	<title>Ktomek Work | EULA</title>
</svelte:head>

<Row
	padding={windowWidth > 1000 ? '50px' : '25px'}
	grow="1"
	height={windowWidth > 1000 ? 'calc(100% - 100px)' : 'calc(100% - 50px)'}
	overflowy="auto"
>
	<Column grow="1" padding="0 0 50px 0" width="100%" height="calc(100% - 50px)" gap="20px">
		<Row grow="1" width="100%">
			<Column grow="1" height="100%" width="100%">
				<Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px"
					>Ktomek Work End User License Agreement (EULA)</Header
				>
				<Column
					minheight="800px"
					grow="1"
					align="center"
					justify="center"
					margintop="-200px"
					width="100%"
				>
					<Body color={$dark ? 'var(--darktext)' : 'initial'}
						>By continuing to use the Ktomek Work application, you accept the <a
							href="https://app.termly.io/document/acceptable-use/b1f25949-cf46-4706-b2f8-01472460a6bb"
							target="_blank"
							style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Acceptable Use Policy</a
						>,
						<a
							href="https://app.termly.io/document/terms-of-service/a49a49d6-6997-4fdd-b62b-d1dabd4b9031"
							target="_blank"
							style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Terms of Use</a
						>
						and the
						<a
							href="https://app.termly.io/document/eula/27f99a41-eccd-417c-ba31-8a7f01bd4963"
							target="_blank"
							style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Ktomek Work EULA</a
						>.</Body
					>
					<Row margintop="25px">
						<Form method="POST" action="?/acceptEULA">
							<ButtonPrimary>Accept</ButtonPrimary>
						</Form>
					</Row>
				</Column>
			</Column>
		</Row>
	</Column>
</Row>
