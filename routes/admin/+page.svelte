<script lang="ts">
	import Card from '$lib/Card.svelte';
	import Column from '$lib/Column.svelte';
	import Image from '$lib/Image.svelte';
	import Row from '$lib/Row.svelte';
	import type { PageData } from './$types';

	import Button from '$lib/Button.svelte';
	import DataWidget from '$lib/DataWidget.svelte';
	import rowClick from '$lib/DataWidget.svelte';
	import Icon from '$lib/Icon.svelte';
	import { onMount } from 'svelte';
	import { dark } from '../ui_store';

	import Dialog from '$lib/Dialog.svelte';
	import Textbox from '$lib/Textbox.svelte';
	import Header from '$lib/Text/Header.svelte';
	import Body from '$lib/Text/Body.svelte';
	import HeaderLarge from '$lib/Text/Header Large.svelte';
	import Poster from '$lib/Poster.svelte';

	let windowWidth = 1001;
	let activeUsers = 0;
	let activeOrganizations = 0;
    let activeMSP = 0;
	let firstname = '';

	onMount(async () => {
		const { data, error } = await supabase.rpc('getuser');

		if (data) {
			var userObject = data[0];
			firstname = userObject.first_name;
		} else {
			var user = await supabase.auth.getUser();
			if (user.data.user) {
				firstname = user.data.user.user_metadata.first_name;
			}
		}
        await getActiveUserCount();
        await getActiveOrganizationCount();
        await getActiveMSPCount();
	});

    async function getActiveUserCount() {
        const { data, error } = await supabase.rpc('getactiveusercount');
        if(error == null) {
            activeUsers = data
        }
    }

    async function getActiveOrganizationCount() {
        const { data, error } = await supabase.rpc('getactiveorgcount');
        if(error == null) {
            activeOrganizations = data
        }
    }

    async function getActiveMSPCount() {
        const { data, error } = await supabase.rpc('getactivemspcount');
        if(error == null) {
            activeMSP = data
        }
    }

	function handleUsers() {
		window.location.href = '/admin/users';
	}

	function handleOrgs() {
		window.location.href = '/admin/organizations';
	}

    function handleMSP() {
        window.location.href = '/admin/msp';
    }

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
</script>

<svelte:head>
	<title>Ktomek Admin</title>
</svelte:head>

<Row padding={windowWidth > 1000 ? '50px' : '25px'} grow="1" overflowy="auto">
	<Column grow="1" width="100%">
		<Column>
			<Row>
				<Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px"
					>Welcome to Ktomek Admin, {firstname}<Icon
						marginleft="20px"
						icon="fa-face-smile"
						size="fa-lg"
					/></Header
				>
			</Row>
			<Row>
				<Body color={$dark ? 'var(--darktext)' : 'initial'}
					>Use this dashboard to gain a high-level overview of your company's technological
					insights. Easily visualize where your time and efforts are being allocated.</Body
				>
			</Row>
		</Column>

		<Column gap="50px">
			<Row margintop="50px" gap="50px">
				<Poster background={$dark ? 'rgb(75,75,75)' : 'initial'}>
					<Column width="100%">
						<Row
							width="100%"
							borderradius="5px 5px 0 0"
							background="var(--primary)"
							overflowx="hidden"
							overflowy="hidden"
							align="center"
							height="50px"
						>
							<Header color="white" padding="0 20px">App Users</Header>
							<Row grow="1" height="100%" align="center" justify="end" on:click={handleUsers}>
								<div
									style="background: white; position: absolute; right: 0; height: 1px; width: 55px; bottom: 0;"
								/>
								<div
									style="background: white; position: absolute; right: 50px; height: 1px; width: 20px; bottom: 5px; transform: rotate(45deg)"
								/>
								<div
									style="background: white; position: absolute; right: 60px; height: 1px; width: 55px; bottom: 12px;"
								/>
								<Row cursor="pointer" padding="0 20px">
									<Icon icon="fa-arrow-right" color="white" />
								</Row>
							</Row>
						</Row>
						<div
							style="background: var(--primary); height: 20px; width: 20px; position: absolute; top: 40px; right: 50px; transform: rotate(-45deg)"
						/>
						<div
							style="background: var(--primary); height: 20px; width: 60px; position: absolute; top: 45px; right: 0;"
						/>

						<Row width="100%" grow="1" align="center" justify="center">
							<Header padding="0 25px" color={$dark ? 'var(--darktext)' : 'initial'} size="28px"
								>{activeUsers} active user{activeUsers > 1 || activeUsers == 0 ? 's' : ''}</Header
							>
						</Row>
					</Column>
				</Poster>

				<Poster width="auto" background={$dark ? 'rgb(75,75,75)' : 'initial'}>
					<Column width="100%">
						<Row
							width="100%"
							borderradius="5px 5px 0 0"
							background="var(--primary)"
							overflowx="hidden"
							overflowy="hidden"
							align="center"
							height="50px"
						>
							<Header color="white" padding="0 20px">Organizations</Header>
							<Row grow="1" height="100%" align="center" justify="end" on:click={handleOrgs}>
								<div
									style="background: white; position: absolute; right: 0; height: 1px; width: 55px; bottom: 0;"
								/>
								<div
									style="background: white; position: absolute; right: 50px; height: 1px; width: 20px; bottom: 5px; transform: rotate(45deg)"
								/>
								<div
									style="background: white; position: absolute; right: 60px; height: 1px; width: 55px; bottom: 12px;"
								/>
								<Row cursor="pointer" padding="0 20px">
									<Icon icon="fa-arrow-right" color="white" />
								</Row>
							</Row>
						</Row>
						<div
							style="background: var(--primary); height: 20px; width: 20px; position: absolute; top: 40px; right: 50px; transform: rotate(-45deg)"
						/>
						<div
							style="background: var(--primary); height: 20px; width: 60px; position: absolute; top: 45px; right: 0;"
						/>

						<Row width="100%" grow="1" align="center" justify="center">
							<Header padding="0 25px" color={$dark ? 'var(--darktext)' : 'initial'} size="28px"
								>{activeOrganizations} active organization{activeOrganizations > 1 || activeOrganizations == 0
									? 's'
									: ''}</Header
							>
						</Row>
					</Column>
				</Poster>
			</Row>

			<Row>
				<Poster background={$dark ? 'rgb(75,75,75)' : 'initial'}>
					<Column width="100%">
						<Row
							width="100%"
							borderradius="5px 5px 0 0"
							background="var(--primary)"
							overflowx="hidden"
							overflowy="hidden"
							align="center"
							height="50px"
						>
							<Header color="white" padding="0 20px">Ktomek MSP</Header>
							<Row grow="1" height="100%" align="center" justify="end" on:click={handleMSP}>
								<div
									style="background: white; position: absolute; right: 0; height: 1px; width: 55px; bottom: 0;"
								/>
								<div
									style="background: white; position: absolute; right: 50px; height: 1px; width: 20px; bottom: 5px; transform: rotate(45deg)"
								/>
								<div
									style="background: white; position: absolute; right: 60px; height: 1px; width: 55px; bottom: 12px;"
								/>
								<Row cursor="pointer" padding="0 20px">
									<Icon icon="fa-arrow-right" color="white" />
								</Row>
							</Row>
						</Row>
						<div
							style="background: var(--primary); height: 20px; width: 20px; position: absolute; top: 40px; right: 50px; transform: rotate(-45deg)"
						/>
						<div
							style="background: var(--primary); height: 20px; width: 60px; position: absolute; top: 45px; right: 0;"
						/>

						<Row width="100%" grow="1" align="center" justify="center">
							<Header padding="0 25px" color={$dark ? 'var(--darktext)' : 'initial'} size="28px"
								>{activeMSP} organization{activeMSP > 1 || activeMSP == 0 ? 's' : ''}</Header
							>
						</Row>
					</Column>
				</Poster>
			</Row>
		</Column>
	</Column>
</Row>
