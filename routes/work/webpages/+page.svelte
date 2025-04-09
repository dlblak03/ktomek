<script lang="ts">
	import Row from '$lib/Row.svelte';
	import Column from '$lib/Column.svelte';

	import DataWidget from '$lib/DataWidget.svelte';

	import Header from '$lib/Text/Header.svelte';
	import Body from '$lib/Text/Body.svelte';

	import { onMount } from 'svelte';
	import { dark } from '../../ui_store';
	import type { PageData } from './$types';
	import ButtonHover from '$lib/v2/Buttons/button-hover.svelte';
	import Icon from '$lib/Icon.svelte';
	import Dialog from '$lib/v2/Containers/dialog.svelte';
	import Form from '$lib/v2/Inputs/form.svelte';
	import Textbox from '$lib/Textbox.svelte';

	let windowWidth = 1001;

	export let data: PageData;
	let { supabase, session, whitelabel, primarycolor, secondarycolor } = data;
	$: ({ supabase, session, whitelabel, primarycolor, secondarycolor } = data);

	let addWebpageDialog: Dialog;

	onMount(async () => {
		windowWidth = window.innerWidth;
		window.addEventListener('resize', onresize);
	});

	var onresize = function () {
		windowWidth = window.innerWidth;
	};
</script>

<svelte:head>
	<title>Ktomek Work | Webpages</title>
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
				<Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px">Webpages</Header>
				<Body color={$dark ? 'var(--darktext)' : 'initial'}
					>Use this form to manage the webpages for your agencies website.</Body
				>
			</Column>
		</Row>
		<Row grow="1" width="100%">
			<DataWidget
				{whitelabel}
				{primarycolor}
				rowClick={async (dr) => {}}
				dark={$dark}
				columns={data.columns}
				data={data.webpages}
				searchid="webpagessearch"
			>
				<Row>
					<ButtonHover
						{whitelabel}
						{primarycolor}
						dark={$dark}
						on:click={() => {
							addWebpageDialog.openDialog();
						}}
						><Icon
							color={$dark ? 'var(--darktext)' : whitelabel ? primarycolor : 'var(--primary)'}
							icon="fa-plus"
							size="fa-xl"
						/>Add Webpage</ButtonHover
					>
				</Row>
			</DataWidget>
		</Row>
	</Column>
</Row>

<Dialog {whitelabel} {primarycolor} dark={$dark} bind:this={addWebpageDialog}>
	<Column>
		<Form method="POST" action="?/addWebpage">
			<Column gap="30px" width="300px">
				<Row width="100%">
					<Textbox
						{whitelabel}
						{primarycolor}
						dark={$dark}
						id="webpagename"
						name="webpagename"
						placeholder=" ">Webpage</Textbox
					>
				</Row>

				<Row width="100%">
					<Textbox
						{whitelabel}
						{primarycolor}
						dark={$dark}
						id="webpagepath"
						name="webpagepath"
						placeholder=" ">Path</Textbox
					>
				</Row>

				<Row width="100%">
					<Textbox
						{whitelabel}
						{primarycolor}
						dark={$dark}
						id="webpagelabel"
						name="webpagelabel"
						placeholder=" ">Label</Textbox
					>
				</Row>

				<Row padding="0 20px">
					<ButtonHover {whitelabel} {primarycolor} dark={$dark}>Add Webpage</ButtonHover>
				</Row>
			</Column>
		</Form>
	</Column>
</Dialog>
