<script lang="ts">
	import Row from '$lib/Row.svelte';
	import Column from '$lib/Column.svelte';

	import DataWidget from '$lib/DataWidget.svelte';
	import Dialog from '$lib/v2/Containers/dialog.svelte';
	import Header from '$lib/Text/Header.svelte';
	import Body from '$lib/Text/Body.svelte';
	import Icon from '$lib/v2/Graphics/icon.svelte';

	import Form from '$lib/v2/Inputs/form.svelte';
	import Textarea from '$lib/Textarea.svelte';
	import ButtonPrimary from '$lib/v2/Buttons/button-primary.svelte';
	import ButtonHover from '$lib/v2/Buttons/button-hover.svelte';

	import { onMount } from 'svelte';
	import { dark } from '../../ui_store';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Textbox from '$lib/Textbox.svelte';

	let windowWidth = 1001;

	export let data: PageData;
	let { supabase, session, whitelabel, primarycolor, secondarycolor } = data;
	$: ({ supabase, session, whitelabel, primarycolor, secondarycolor } = data);

	const handleInserts = (payload: any) => {
		console.log('Change received!', payload);
	};

	$: if (rocketChatBoolean) {
		if (!loadedRocketChatBoolean) {
			supabase
				.channel('msprocketchat')
				.on(
					'postgres_changes',
					{ event: 'INSERT', schema: 'ktomek', table: 'msprocketchat' },
					handleInserts
				)
				.subscribe();

			supabase
				.rpc('getmsprocketchat', { rocketidparm: selectedRocket['rocketid'] })
				.then((response: any) => {
					rocketChat = response.data;
				});

			chatTextareaForm.reset();

			console.log(rocketChat);

			loadedRocketChatBoolean = true
		}
		else {
			loadedRocketChatBoolean = false
		}
	}

	var rockets: any[] = [];
	let columns: any = [];

	let addRocketDialog: Dialog;
	let selectedRocket: any = null;

	let editRocketNameDialog: Dialog;
	let editRocketDescriptionDialog: Dialog;
	let rocketChatDialog: Dialog;
	let rocketChat: any[] = [];
	let chatTextareaForm: any;
	let rocketChatBoolean: boolean = false;
	let loadedRocketChatBoolean: boolean = false;

	onMount(async () => {
		windowWidth = window.innerWidth;
		window.addEventListener('resize', onresize);

		rockets = data.rockets;
		console.log(rockets);
	});

	var onresize = function () {
		windowWidth = window.innerWidth;
	};

	async function auto_grow(idparm: any) {
		let element = document.getElementById(idparm);
		if (element != null) {
			element.style.height = '5px';
			element.style.height = element.scrollHeight + 'px';
		}
	}
</script>

<svelte:head>
	<title>Ktomek Work | Rockets</title>
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
				<Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px">Rockets</Header>
				<Body color={$dark ? 'var(--darktext)' : 'initial'}
					>Utilize this form to submit rockets for Ktomek to produce. After submitting, our team
					will evaulate the rocket, provide an estimated completion date, and develop the rocket for
					you to use by the date. (Coming soon)</Body
				>
			</Column>
		</Row>
		<Row grow="1" width="100%">
			<DataWidget
				{whitelabel}
				{primarycolor}
				{columns}
				data={rockets}
				dark={$dark}
				searchid="rocketsearch"
				rocketsView={true}
				bind:selectedRocket
				rocketNameDialog={editRocketNameDialog}
				rocketDescriptionDialog={editRocketDescriptionDialog}
				{rocketChatDialog}
			>
				<Row>
					<ButtonHover
						{whitelabel}
						{primarycolor}
						dark={$dark}
						on:click={() => {
							addRocketDialog.openDialog();
						}}
						><Icon
							color={$dark ? 'var(--darktext)' : whitelabel ? primarycolor : 'var(--primary)'}
							icon="fa-plus"
							size="fa-xl"
						/>Add Rocket</ButtonHover
					>
				</Row>
			</DataWidget>
		</Row>
		<Row minheight="100px" />
	</Column>
</Row>

<div
	style="position: absolute; height: {windowWidth > 1000
		? 'calc(100%)'
		: 'calc(100%)'}; min-height: fit-content; width: 100%; overflow-y: hidden; overflow-x: hidden; left: 0; top: 0;"
>
	<Dialog
		minheight="none"
		overflowWrapper="auto"
		align="center"
		position="relative"
		overflow={'visible'}
		{whitelabel}
		{primarycolor}
		dark={$dark}
		bind:this={addRocketDialog}
	>
		<Column borderradius="5px" height="100%">
			<Column gap="50px" width={windowWidth > 550 ? '500px' : '300px'}>
				<form
					style="display: flex; flex-direction: column; gap: 50px; width: 100%;"
					method="POST"
					action="?/submitRocket"
					use:enhance
				>
					<Row width="100%">
						<Textarea
							id="problem"
							name="problem"
							rows={5}
							bind:dark={$dark}
							{whitelabel}
							{primarycolor}>Problem</Textarea
						>
					</Row>

					<Row width="100%">
						<Textarea
							id="request"
							name="request"
							rows={5}
							bind:dark={$dark}
							{whitelabel}
							{primarycolor}>Request</Textarea
						>
					</Row>

					<Row padding="0 20px">
						<ButtonHover {whitelabel} {primarycolor} dark={$dark}>Submit Rocket</ButtonHover>
					</Row>
				</form>
			</Column>
		</Column>
	</Dialog>
</div>

<div
	style="position: absolute; height: {windowWidth > 1000
		? 'calc(100%)'
		: 'calc(100%)'}; min-height: fit-content; width: 100%; overflow-y: hidden; overflow-x: hidden; left: 0; top: 0;"
>
	<Dialog
		minheight="none"
		minwidth={'none'}
		overflowWrapper="auto"
		align="center"
		position="relative"
		overflow={'visible'}
		{whitelabel}
		{primarycolor}
		dark={$dark}
		bind:this={editRocketNameDialog}
	>
		<Column borderradius="5px" height="100%">
			<Column gap="50px" width={windowWidth > 550 ? '500px' : '300px'}>
				<form
					style="display: flex; flex-direction: column; gap: 50px; width: 100%;"
					method="POST"
					action="?/updateRocketName"
					use:enhance
				>
					<div style="display: none;">
						<Textbox
							id="rocketid"
							name="rocketid"
							value={selectedRocket != null ? selectedRocket['rocketid'] : ''}
							bind:dark={$dark}
							{whitelabel}
							{primarycolor}>Rocket ID</Textbox
						>
					</div>

					<Row width="100%">
						<Textbox
							id="rocketname"
							name="rocketname"
							value={selectedRocket != null ? selectedRocket['rocketname'] : ''}
							bind:dark={$dark}
							{whitelabel}
							{primarycolor}>Rocket Name</Textbox
						>
					</Row>

					<Row padding="0 20px">
						<ButtonHover {whitelabel} {primarycolor} dark={$dark}>Save Rocket</ButtonHover>
					</Row>
				</form>
			</Column>
		</Column>
	</Dialog>
</div>

<div
	style="position: absolute; height: {windowWidth > 1000
		? 'calc(100%)'
		: 'calc(100%)'}; min-height: fit-content; width: 100%; overflow-y: hidden; overflow-x: hidden; left: 0; top: 0;"
>
	<Dialog
		minheight="none"
		minwidth={'none'}
		overflowWrapper="auto"
		align="center"
		position="relative"
		overflow={'visible'}
		{whitelabel}
		{primarycolor}
		dark={$dark}
		bind:this={editRocketDescriptionDialog}
	>
		<Column borderradius="5px" height="100%">
			<Column gap="50px" width={windowWidth > 550 ? '500px' : '300px'}>
				<form
					style="display: flex; flex-direction: column; gap: 50px; width: 100%;"
					method="POST"
					action="?/updateRocketDescription"
					use:enhance
				>
					<div style="display: none;">
						<Textbox
							id="rocketid"
							name="rocketid"
							value={selectedRocket != null ? selectedRocket['rocketid'] : ''}
							bind:dark={$dark}
							{whitelabel}
							{primarycolor}>Rocket ID</Textbox
						>
					</div>

					<Row width="100%">
						<Textarea
							id="rocketdescription"
							name="rocketdescription"
							rows={5}
							value={selectedRocket != null ? selectedRocket['rocketdescription'] : ''}
							bind:dark={$dark}
							{whitelabel}
							{primarycolor}>Rocket Description</Textarea
						>
					</Row>

					<Row padding="0 20px">
						<ButtonHover {whitelabel} {primarycolor} dark={$dark}>Save Rocket</ButtonHover>
					</Row>
				</form>
			</Column>
		</Column>
	</Dialog>
</div>

<div
	style="position: absolute; height: {windowWidth > 1000
		? 'calc(100%)'
		: 'calc(100%)'}; min-height: fit-content; width: 100%; overflow-y: hidden; overflow-x: hidden; left: 0; top: 0;"
>
	<Dialog
		minheight="none"
		minwidth={'none'}
		overflowWrapper="auto"
		align="center"
		position="relative"
		overflow={'visible'}
		{whitelabel}
		{primarycolor}
		dark={$dark}
		bind:display={rocketChatBoolean}
		bind:this={rocketChatDialog}
	>
		<Column borderradius="5px" height="100%">
			<Column gap="50px" width={windowWidth > 600 ? '650px' : '300px'}>
				<Column width="calc(100% - 40px)" padding="20px" height="calc(40vh - 40px)" maxheight="40vh" gap="10px" overflowy="auto">
					{#each rocketChat as chat}
						{#if chat.side == 'left'}
							<Row width="100%">
								<Column
									border="solid 1px {whitelabel ? primarycolor : 'var(--primary)'}"
									borderradius="5px 10px 5px 10px"
									width="calc(50% - 20px)"
									background={$dark ? 'rgb(90,90,90)' : ''}
									padding="0 10px"
								>
									<Row align="center" gap="10px" width="100%">
										<Header color={$dark ? 'var(--darktext)' : 'black'}>{chat.name}</Header>
										<Row marginleft="auto">
											<Body color="rgb(150,150,150)">{chat.created_at}</Body>
										</Row>
									</Row>

									<Body color={$dark ? 'var(--darktext)' : 'black'}>
										{chat.message}
									</Body>
								</Column>
							</Row>
						{:else}
							<Row width="100%" justify="end">
								<Column
									border="solid 1px {whitelabel ? primarycolor : 'var(--primary)'}"
									borderradius="5px 10px 5px 10px"
									width="calc(50% - 20px)"
									background={$dark ? 'rgb(90,90,90)' : ''}
									padding="0 10px"
								>
									<Row align="center" gap="10px" width="100%">
										<Header color={$dark ? 'var(--darktext)' : 'black'}>{chat.name}</Header>
										<Row marginleft="auto">
											<Body color="rgb(150,150,150)">{chat.created_at}</Body>
										</Row>
									</Row>

									<Body color={$dark ? 'var(--darktext)' : 'black'}>
										{chat.message}
									</Body>
								</Column>
							</Row>
						{/if}
					{/each}
				</Column>

				<form
					bind:this={chatTextareaForm}
					method="POST"
					action="?/addChat"
					style="width: 100%;"
					use:enhance
				>
					<Row width="100%">
						<div style="display: none;">
							<Textbox
								id="rocketid"
								name="rocketid"
								value={selectedRocket != null ? selectedRocket['rocketid'] : ''}
								bind:dark={$dark}
								{whitelabel}
								{primarycolor}>Rocket ID</Textbox
							>
						</div>

						<Textarea
							dark={$dark}
							{whitelabel}
							{primarycolor}
							transition="none !important"
							on:keyup={async () => {
								await auto_grow('rocketchatinput');
							}}
							id="rocketchatinput"
							name="rocketchatinput">Add chat</Textarea
						>
						<button
							style="background: none; outline: none; border: none; position: absolute; right: 25px; bottom: 10px; cursor: pointer;"
							><Icon
								color={$dark ? 'var(--darktext)' : 'black'}
								icon="fa-paper-plane-top"
							/></button
						>
					</Row>
				</form>
			</Column>
		</Column>
	</Dialog>
</div>
