<script lang="ts">
	import Card from '$lib/Card.svelte';
	import Column from '$lib/Column.svelte';
	import Image from '$lib/Image.svelte';
	import Row from '$lib/Row.svelte';
	import IconCustom from '$lib/IconCustom.svelte';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';

	var Main_Logo_Inverse = ' ktomek_white_logo_color_background_horizontal.png';
	var Main_Logo = ' ktomek_white_logo_color_background_horizontal.png';
	import Avatar from '$lib/Avatar.svelte';

	import { dark } from '../ui_store';
	import { ktomek_life } from '../ui_store';
	import { ktomek_work } from '../ui_store';

	export let data: LayoutData;

	import { invalidate } from '$app/navigation';
	import Icon from '$lib/Icon.svelte';
	import IconImage from '$lib/IconImage.svelte';

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let firstLetter = '';
	let logoutDisplay = false;

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		setFirstLetter();

		return () => data.subscription.unsubscribe();
	});

	const setFirstLetter = async () => {
		const { data, error } = await supabase
		.rpc('getuser')

		if(data) {
			var userObject = data[0];
			firstLetter = userObject.first_name.substring(0,1).toLowerCase()
			if(firstLetter.length == 0) {
				firstLetter = "u"
			}
		}
	}

	const toggleLogout = async () => {
		logoutDisplay = !logoutDisplay;
	};

	const handleLogout = async () => {
		window.location.href = '/auth/logout';
	};

	const handleDashboard = async () => {
		window.location.href = '/admin';
	};

	const handleLife = async () => {
		window.location.href = '/life';
	};

	const handleWork = async () => {
		window.location.href = '/work';
	};

	const handleOrganizations = async () => {
		window.location.href = '/admin/organizations';
	};

	const handleMSP = async () => {
		window.location.href = '/admin/msp';
	};

	const handleUsers = async () => {
		window.location.href = '/admin/users';
	};

	const handleRoles = async () => {
		window.location.href = '/admin/roles';
	};

	const toggleDark = async () => {
		$dark = !$dark;
	};
</script>

<Column
	background={$dark ? 'rgb(20,20,20)' : 'rgb(250,250,250)'}
	height="100vh"
	width="100vw"
	minwidth="100vw"
	maxheight="100vh"
	minheight="none"
>
	<Column height="100vh" width="100vw">
		<Row width="calc(100% - 100px)" height="calc(100% - 100px)" padding="50px">
			<Card dark={$dark} grow="1" height="100%" maxwidth="none">
				<Row
					background={$dark ? '#E0AC8D' : 'var(--primary)'}
					height="75px"
					width="100%"
					align="center"
					zindex="2"
				>
					{#if $dark}
						<Row on:click={handleDashboard} height="100%" padding="0 20px" cursor="pointer">
							<Image bordersides={$dark ? 'solid 1px var(--darktext)' : 'none'} height="100%" src={Main_Logo} />
						</Row>
					{:else}
						<Row on:click={handleDashboard} height="100%" padding="0 20px" cursor="pointer">
							<Image height="100%" src={Main_Logo_Inverse} />
						</Row>
					{/if}

					<Row grow="1" align="center" gap="20px">
						<IconImage border={$dark ? 'solid 1px var(--darktext)' : 'none'} background={$dark ? 'var(--primary)' : 'white'} on:click={handleUsers} name="users" width="40px" height="40px"></IconImage>
						<IconImage border={$dark ? 'solid 1px var(--darktext)' : 'none'} background={$dark ? 'var(--primary)' : 'white'} on:click={handleRoles} name="role" width="40px" height="40px"></IconImage>
						<IconImage border={$dark ? 'solid 1px var(--darktext)' : 'none'} background={$dark ? 'var(--primary)' : 'white'} on:click={handleOrganizations} name="organizations" width="40px" height="40px"></IconImage>
						<IconImage border={$dark ? 'solid 1px var(--darktext)' : 'none'} background={$dark ? 'var(--primary)' : 'white'} on:click={handleMSP} name="applications" width="40px" height="40px"></IconImage>
					</Row>
	
					{#if $dark}
						<Row
							on:click={toggleDark}
							id="ui_mode"
							marginleft="auto"
							align="center"
							justify="center"
							padding="0 20px"
							cursor="pointer"
						>
							<Icon color="var(--primary)" icon="fa-sun-bright" size="fa-xl" />
						</Row>
					{:else}
						<Row
							on:click={toggleDark}
							id="ui_mode"
							marginleft="auto"
							align="center"
							justify="center"
							padding="0 20px"
							cursor="pointer"
						>
							<Icon color="white" icon="fa-moon" size="fa-xl" />
						</Row>
					{/if}
	
					<Row align="center" justify="center" height="50%" padding="0 20px">
						<Avatar
							bordercolor={$dark ? 'var(--darktext)' : 'inherit'}
							color={$dark ? 'var(--darktext)' : 'inherit'}
							background={$dark ? 'var(--primary)' : 'white'}
							on:click={toggleLogout}>{firstLetter}</Avatar
						>
	
						{#if logoutDisplay}
							<div
								id="logout"
								style="position: absolute; display: flex; flex-direction: column; gap: 20px; top: calc(100% + 25px); cursor: pointer; left: -75px; background: {$dark
									? '#E0AC8D'
									: 'white'}; border-radius: 5px; padding: 15px 25px;box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);"
							>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									on:click={handleLife}
									style="white-space: nowrap; color: {$dark
										? 'var(--primary)'
										: 'inherit'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500;"
								>
									Ktomek Life
								</div>

								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									on:click={handleWork}
									style="white-space: nowrap; color: {$dark
										? 'var(--primary)'
										: 'inherit'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500;"
								>
									Ktomek Work
								</div>
	
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									on:click={handleLogout}
									style="white-space: nowrap; color: {$dark
										? 'var(--primary)'
										: 'inherit'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500;"
								>
									Logout
								</div>
							</div>
						{/if}
					</Row>
				</Row>
				
				<Row grow="1" height="100%" width="100%">
					<slot />
				</Row>
			</Card>
		</Row>
	</Column>
	
	
</Column>

<style>
	.menu-item {
		border: solid 1px var(--darktext); 
		border-radius: 50px; 
		background: #590000; 
		color: white; 
		width: 45px; 
		height: 45px; 
		display: flex; 
		align-items: center; 
		justify-content: center;
		cursor: pointer;
	}
</style>
