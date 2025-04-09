<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Column from '$lib/Column.svelte';
	import DataWidget from '$lib/DataWidget.svelte';
	import Icon from '$lib/Icon.svelte';
	import Row from '$lib/Row.svelte';
	import { dark } from '../../ui_store';
	import Body from '$lib/Text/Body.svelte';
	import type { PageData } from './$types';
	import Dialog from '$lib/Dialog.svelte';
	import Textbox from '$lib/Textbox.svelte';
	import Header from '$lib/Text/Header.svelte';

	import { onMount } from 'svelte';
	import Snackbar from '$lib/Snackbar.svelte';
	import ButtonHover from '$lib/v2/Buttons/button-hover.svelte';

	let columns = [
		{
			column_name: 'First Name',
			column: 'first_name'
		},
		{
			column_name: 'Last Name',
			column: 'last_name'
		},
		{
			column_name: 'Email',
			column: 'email'
		},
		{
			column_name: 'Email Verified',
			column: 'email_verification'
		},
		{
			column_name: 'Phone',
			column: 'phone'
		},
		{
			column_name: 'Phone Verified',
			column: 'phone_verification'
		},
		{
			column_name: 'Created',
			column: 'created_at'
		}
	];

	let users: any[] = [];

	let usersDialog = '0';
	let adduserDialog = '0';

	let windowWidth = 1001;

	var displayVar = '0';
	var backgroundVar = 'var(--success)';
	var messageVar = '';

	let userid = '';
	let userFirstName = '';
	let userLastName = '';
	let userEmail = '';
	let userPhoneNumber = '';
	let userExistingPhoneNumber = '';

	let inviteEmail = '';
	export let data: PageData;
	onMount(async () => {
		await loadUsers();
	});

	const loadUsers = async () => {
		const { data, error } = await supabase.from('users').select();

		if (error == null) {
			users = data;
		}
	};

	const openUser = async (user: any) => {
		usersDialog = '1';

		userid = user.id;
		userFirstName = user.first_name;
		userLastName = user.last_name;
		userEmail = user.email;
		userPhoneNumber = user.phone;
		userExistingPhoneNumber = user.phone;
	};

	const deleteUser = async () => {};

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
</script>

<svelte:head>
	<title>Ktomek Admin | Users</title>
</svelte:head>

<Row padding={windowWidth > 1000 ? '50px' : '25px'} grow="1" overflowy="auto">
	<Column grow="1" width="100%" gap="50px">
		<Row width="100%">
			<Column>
				<Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px">Ktomek Users</Header>
				<Body color={$dark ? 'var(--darktext)' : 'initial'}
					>Use this form to efficiently manage Ktomek Users. Easily add, edit, and delete users with
					ease and convenience.</Body
				>
			</Column>
		</Row>
		<Row grow="1" width="100%">
			<DataWidget
				dark={$dark}
				{columns}
				data={users}
				searchid="orgsearch"
				rowClick={async (dr) => {
					openUser(dr);
				}}
				cursor="pointer"
			>
				<Row marginleft="20px">
					<Button
						color={$dark ? 'var(--darktext)' : 'var(--primary)'}
						on:click={() => {
							adduserDialog = '1';
						}}
						><Icon
							color={$dark ? 'var(--darktext)' : 'var(--primary)'}
							icon="fa-plus"
							size="fa-xl"
						/>Add User</Button
					>
				</Row>
			</DataWidget>
		</Row>
	</Column>
</Row>

<Snackbar
	on:click={() => {
		displayVar = '0';
	}}
	scale={displayVar}
	background={backgroundVar}
	message={messageVar}
/>

<Dialog
	dark={$dark}
	scale={usersDialog}
	on:click={(e) => {
		usersDialog = '0';
	}}
>
	<Row
		padding="40px 20px"
		width="500px"
		on:click={() => {
			setTimeout(function () {
				usersDialog = '1';
			}, 1);
		}}
	>
		<Column grow="1" gap="40px">
			<form
				method="POST"
				action="?/saveUser"
				style="display: flex; width: 100%; gap: 40px; flex-direction: column;"
			>
				<div style="display: none;">
					<Row width="100%">
						<Textbox id="userid" name="userid" dark={$dark} bind:value={userid}>User ID</Textbox>
					</Row>
				</div>

				<Row width="100%">
					<Textbox id="userfirstname" name="userfirstname" dark={$dark} bind:value={userFirstName}
						>First Name</Textbox
					>
				</Row>

				<Row width="100%">
					<Textbox id="userlastname" name="userlastname" dark={$dark} bind:value={userLastName}
						>Last Name</Textbox
					>
				</Row>

				<Row width="100%">
					<Textbox id="useremail" name="useremail" dark={$dark} bind:value={userEmail}
						>Email</Textbox
					>
				</Row>

				<Row width="100%" grow="1">
					<Row padding="0 20px" grow="1">
						<Button
							buttonType="success"
							width="100%"
							color={$dark ? 'var(--darktext)' : 'var(--primary)'}>Save Information</Button
						>
					</Row>
				</Row>
			</form>

			<form
				method="POST"
				action="?/updatePhone"
				style="display: flex; width: 100%; gap: 40px; flex-direction: column;"
			>
				<div style="display: none;">
					<Row width="100%">
						<Textbox id="userid" name="userid" dark={$dark} bind:value={userid}>User ID</Textbox>
					</Row>
				</div>
				<Row width="100%">
					<Textbox
						id="userphonenumber"
						name="userphonenumber"
						dark={$dark}
						bind:value={userPhoneNumber}>Phone Number</Textbox
					>
					<ButtonHover dark={$dark}>Save</ButtonHover>
				</Row>
			</form>

			<Row width="100%" grow="1">
				<Row padding="0 20px" grow="1">
					<Button
						buttonType="warn"
						width="100%"
						color={$dark ? 'var(--darktext)' : 'var(--primary)'}
						on:click={() => {
							deleteUser();
						}}>Delete User</Button
					>
				</Row>
			</Row>
		</Column>
	</Row>
</Dialog>

<Dialog
	dark={$dark}
	scale={adduserDialog}
	on:click={(e) => {
		adduserDialog = '0';
	}}
>
	<Row
		padding="40px 20px"
		width="500px"
		on:click={() => {
			setTimeout(function () {
				adduserDialog = '1';
			}, 1);
		}}
	>
		<Column grow="1" gap="40px">
			<form
				method="POST"
				action="?/inviteUser"
				style="display: flex; width: 100%; gap: 40px; flex-direction: column;"
			>
				<Row width="100%">
					<Textbox
						pattern="*"
						type="email"
						dark={$dark}
						id="inviteemail"
						name="inviteemail"
						bind:value={inviteEmail}>Email Address</Textbox
					>
				</Row>

				<Row width="100%">
					<Row padding="0 20px" grow="1">
						<Button buttonType="success" color={$dark ? 'var(--darktext)' : 'var(--primary)'}
							>Send Invite</Button
						>
					</Row>
				</Row>
			</form>
		</Column>
	</Row>
</Dialog>
