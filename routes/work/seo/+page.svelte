<script lang="ts">
	import Column from '$lib/Column.svelte';
	import Row from '$lib/Row.svelte';

	import DataWidget from '$lib/DataWidget.svelte';

	import Icon from '$lib/Icon.svelte';
	import Header from '$lib/Text/Header.svelte';
	import Body from '$lib/Text/Body.svelte';
	import ButtonHover from '$lib/v2/Buttons/button-hover.svelte';

	import type { PageData } from './$types';
	import { dark, ktomek_employee } from '../../ui_store';
	import { onMount } from 'svelte';

	export let data: PageData;
	let { supabase, session, whitelabel, primarycolor, secondarycolor } = data;
	$: ({ supabase, session, whitelabel, primarycolor, secondarycolor } = data);

	let windowWidth = 1001;

	let filesList: any[] = [];
	let columns: any[] = [];

	let shortcode: string = '';
	let files: any;

	$: if (files) {
		for (const file of files) {
			uploadFile(file);
		}
	}

	const uploadFile = async (file: File) => {
		const { data, error } = await supabase.storage
			.from('msp_private')
			.upload('/' + shortcode + '/seo/weekly/' + file.name, file, {
				cacheControl: '3600',
				upsert: false
			});
	};

	onMount(async () => {
		filesList = data.files ?? [];

		windowWidth = window.innerWidth;
		window.addEventListener('resize', onresize);

		columns = data.columns ?? [];
		shortcode = data.shortcode;
	});

	var onresize = function () {
		windowWidth = window.innerWidth;
	};
</script>

<svelte:head>
	<title>Ktomek Work | SEO</title>
</svelte:head>

<Row
	padding={windowWidth > 1000 ? '50px' : '25px'}
	grow="1"
	height={windowWidth > 1000 ? 'calc(100% - 100px)' : 'calc(100% - 50px)'}
	overflowy="auto"
>
	<Column grow="1" padding="0 0 50px 0" width="100%" gap="50px">
		<Row width="100%">
			<Column>
				<Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px">SEO</Header>
				<Body color={$dark ? 'var(--darktext)' : 'initial'}
					>Use this form to gain access to comprehensive SEO reports for your company's website.</Body
				>
			</Column>
		</Row>
		<Row grow="1" width="100%">
			<DataWidget
			whitelabel={whitelabel}
			primarycolor={primarycolor}
				cursor="pointer"
				rowClick={async (dr) => {
					var response = await fetch('https://ktomek.com/api/seo/weekly', {
						body: dr['name'],
						method: 'POST'
					})
						.then((response) => response.body)
						.then((rb) => {
							const reader = rb?.getReader();

							return new ReadableStream({
								start(controller) {
									// The following function handles each data chunk
									function push() {
										if (reader != undefined) {
											reader.read().then(({ done, value }) => {
												// If there is no more data to read
												if (done) {
													controller.close();
													return;
												}
												// Get the data and send it to the browser via the controller
												controller.enqueue(value);
												// Check chunks by logging to the console
												push();
											});
										}
										// "done" is a Boolean and value a "Uint8Array"
									}
									push();
								}
							});
						})
						.then((stream) =>
							// Respond with our stream
							new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()
						);

					if (JSON.parse(response)) {
						if (JSON.parse(response).url != undefined) {
							const anchor = window.document.createElement('a');
							anchor.href = JSON.parse(response).url;
							anchor.download = dr['name'];
							document.body.appendChild(anchor);
							anchor.click();
							document.body.removeChild(anchor);
						}
					}
				}}
				dark={$dark}
				{columns}
				data={filesList}
				searchid="seosearch"
			>
				{#if $ktomek_employee}
					<Row>
						<ButtonHover
						whitelabel={whitelabel}
						primarycolor={primarycolor}
							dark={$dark}
							on:click={() => {
								document.getElementById('files')?.click();
							}}
							><Icon
								color={$dark ? 'var(--darktext)' : whitelabel ? primarycolor : 'var(--primary)'}
								icon="fa-plus"
								size="fa-xl"
							/>Upload Report</ButtonHover
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
				{/if}
			</DataWidget>
		</Row>
		<Row minheight="100px" />
	</Column>
</Row>
