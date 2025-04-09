<script lang="ts">
	import Column from '$lib/Column.svelte';
	import Row from '$lib/Row.svelte';
	import RowV2 from '$lib/v2/Containers/row.svelte';
	import Snackbar from '$lib/v2/Containers/snackbar.svelte';

	import Dialog from '$lib/v2/Containers/dialog.svelte';
	import DataWidget from '$lib/DataWidget.svelte';

	import Textbox from '$lib/Textbox.svelte';

	import Header from '$lib/Text/Header.svelte';
	import Body from '$lib/Text/Body.svelte';
	import Icon from '$lib/Icon.svelte';
	import P from '$lib/v2/Text/p.svelte';

	import ButtonHover from '$lib/v2/Buttons/button-hover.svelte';

	import { onMount } from 'svelte';
	import { dark } from '../../ui_store';
	import type { ActionData, PageData } from '../assets/$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
	export let data: PageData;
	let { supabase, session, whitelabel, primarycolor, secondarycolor, labels, labelsarray } = data;
	$: ({ supabase, session, whitelabel, primarycolor, secondarycolor, labels, labelsarray } = data);

	let windowWidth = 1001;

	let images: any[] = [];
	let columns: any[] = [];

	let shortcode: string = '';
	let files: any;

	let editDialog: Dialog;
	let editForm: any;
	let editFormButton: any;
	let activeID: string;
	let activePath: string;
	let activeLabel: string;
	let labelOptionsToggler: boolean = false;

	let snackbar: Snackbar;
	let snackbarDisplay: boolean = false;
	let snackbarMessage: string = '';

	let refreshData: boolean = false;

	$: if (files) {
		for (const file of files) {
			uploadFile(file);
		}
		snackbar.openSnackbar();
		snackbarMessage = 'Successfully uploaded image' + (files.length > 1 ? 's' : '') + ' to storage';
		setTimeout(() => {
			snackbar.closeSnackbar();
		}, 3000);
	}

	$: if (form?.success) {
		images = form.images;
		form = null;
		editDialog.closeDialog();
		snackbar.openSnackbar();
		snackbarMessage = 'Successfully updated image label';
		setTimeout(() => {
			snackbar.closeSnackbar();
		}, 3000);
	}

	const uploadFile = async (file: File) => {
		const { data, error } = await supabase.storage
			.from('msp')
			.upload('/' + shortcode + '/images/' + file.name, file, {
				cacheControl: '3600',
				upsert: true
			});

		if (error == null) {
			await fetch('https://ktomek.com/api/assets', {
				body: JSON.stringify({ name: file.name, labels: labels }),
				method: 'POST'
			});
		}
	};

	onMount(async () => {
		images = data.images ?? [];

		windowWidth = window.innerWidth;
		window.addEventListener('resize', onresize);

		columns = data.columns ?? [];
		shortcode = data.shortcode ?? '';
	});

	var onresize = function () {
		windowWidth = window.innerWidth;
	};
</script>

<svelte:head>
	<title>Ktomek Work | Assets</title>
</svelte:head>

<Row
	padding={windowWidth > 1000 ? '50px' : '25px'}
	grow="1"
	height={windowWidth > 1000 ? 'calc(100% - 100px)' : 'calc(100% - 120px)'}
	overflowy="auto"
>
	<Column grow="1" padding="0 0 50px 0" width="100%" gap="50px">
		<Row width="100%">
			<Column>
				<Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px">Assets</Header>
				<Body color={$dark ? 'var(--darktext)' : 'initial'}
					>Utilize this form to upload assets to your agencies website.</Body
				>
			</Column>
		</Row>
		<Row grow="1" width="100%">
			<DataWidget
				imageTileView={true}
				imageColumn={'path_name'}
				altColumn={'alt'}
				imageBase={' /ktomek/msp/' + shortcode + '/images'}
				{whitelabel}
				{primarycolor}
				rowClick={async (dr) => {
					activeLabel = dr.alt;
					activePath = dr.path_name;
					activeID = dr.id
					editDialog.openDialog();
				}}
				dark={$dark}
				{columns}
				data={images}
				searchid="seosearch"
			>
				<Row grow="1" align="center" gap="25px">
					<Row>
						<ButtonHover
							{whitelabel}
							{primarycolor}
							dark={$dark}
							on:click={() => {
								document.getElementById('files')?.click();
							}}
							><Icon
								color={$dark ? 'var(--darktext)' : whitelabel ? primarycolor : 'var(--primary)'}
								icon="fa-plus"
								size="fa-xl"
							/>Upload Image</ButtonHover
						>
						<input
							style="display: none;"
							type="file"
							id="files"
							name="files"
							bind:files
							multiple
							required
						/>
					</Row>

					<Row padding="0 20px 0 0" grow="1" justify="end" align="center">
						<P
							color={$dark ? 'var(--darktext)' : whitelabel ? primarycolor : 'var(--primary)'}
							fontweight="500">Labels: {labels}</P
						>
					</Row>
				</Row>
			</DataWidget>
		</Row>
		<Row minheight="100px" />
	</Column>
</Row>

<Snackbar bind:this={snackbar} bind:display={snackbarDisplay}>
	<Row
		background={'var(--success)'}
		height="100px"
		align="center"
		justify="center"
		padding="0 20px"
		on:click={() => {
			snackbarDisplay = false;
		}}
	>
		<P color="white">{snackbarMessage}</P>
	</Row>
</Snackbar>

<div style="position: absolute; height: {windowWidth > 1000 ? 'calc(100% - 70px)' : 'calc(100% - 70px)'}; min-height: fit-content; width: 100%; overflow-y: hidden; overflow-x: hidden; left: 0; top: 0;">
	<Dialog minheight="none" overflowWrapper="auto" align="center" position="relative" overflow={"visible"} {whitelabel} {primarycolor} dark={$dark} bind:this={editDialog}>
		<Column borderradius="5px" height="100%">
			<Column gap="30px" width="300px">
				<Row
					on:click={() => {
						labelOptionsToggler = !labelOptionsToggler;
					}}
					cursor="pointer"
					width="calc(100% - 40px)"
					border="solid 1px {whitelabel ? primarycolor : 'var(--primary)'}"
					borderradius="5px"
					padding="20px"
				>
					<P color={$dark ? 'var(--darktext)' : whitelabel ? primarycolor : 'var(--primary)'}
						>{activeLabel}</P
					>
				</Row>
	
				<div
					style="overflow: hidden; position: absolute; top: calc(100% + 10px); left: 0; transform: scale({labelOptionsToggler
						? '1'
						: '0'}); border-radius: 5px; background: {$dark
						? 'rgb(60,60,60)'
						: 'white'}; width: 100%; border: solid 1px {whitelabel ? primarycolor : 'var(--primary)'}"
				>
					{#each labelsarray as label}
						<form bind:this={editForm} method="POST" action="?/updateImage" use:enhance>
							<RowV2
								on:click={async () => {
									document.getElementById(label)?.click();
									labelOptionsToggler = !labelOptionsToggler;
	
								}}
								cursor="pointer"
								dark={$dark}
								includeHover={true}
								padding="20px"
							>
								<P color={$dark ? 'var(--darktext)' : whitelabel ? primarycolor : 'var(--primary)'}
									>{label}</P
								>
							</RowV2>
	
							<div style="display: none;">
								<Textbox id="idimage" name="idimage" value={activeID} />
								<Textbox id="pathname" name="pathname" value={activePath} />
								<Textbox id="label" name="label" value={label} />
							</div>
	
							<button id={label} style="display: none;" />
						</form>
					{/each}
				</div>
			</Column>
		</Column>
	</Dialog>
</div>


