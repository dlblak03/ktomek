<script lang="ts">
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';

	var Main_Logo_Inverse =
		' ktomek_white_logo_color_background_horizontal.png';
	var Main_Logo =
		' ktomek_white_logo_color_background_horizontal.png';

	import Column from '$lib/Column.svelte';
	import Row from '$lib/Row.svelte';

	import Avatar from '$lib/Avatar.svelte';
	import Icon from '$lib/Icon.svelte';
	import IconImage from '$lib/IconImage.svelte';
	import Image from '$lib/Image.svelte';

	import Card from '$lib/Card.svelte';

	import { dark } from '../ui_store';
	import { ktomek_admin } from '../ui_store';
	import { ktomek_msp } from '../ui_store';
	import { ktomek_supa_msp_admin } from '../ui_store';

	export let data: LayoutData;

	import { invalidate } from '$app/navigation';

	let { supabase, session, whitelabel, shortcode, primarycolor, secondarycolor } = data;
	$: ({ supabase, session, whitelabel, shortcode, primarycolor, secondarycolor } = data);

	let firstLetter = '';
	let logoutDisplay = false;
	let windowWidth = 1001;

	let whitelabelimage: string = '';

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		setFirstLetter();

		windowWidth = window.innerWidth;
		window.addEventListener('resize', onresize);

		if (whitelabel) {
			supabase.storage
				.from('msp_private')
				.download(shortcode + '/whitelabel/logo/business-logo')
				.then(({ data: dt, error }) => {
					if (error == null) {
						whitelabelimage = URL.createObjectURL(dt);
					}
				});
		}

		return () => data.subscription.unsubscribe();
	});

	const setFirstLetter = async () => {
		const { data, error } = await supabase.rpc('getuser');

		if (data) {
			var userObject = data[0];
			firstLetter = userObject.first_name.substring(0, 1).toLowerCase();
			if (firstLetter.length == 0) {
				firstLetter = 'u';
			}
		}
	};

	const toggleLogout = async () => {
		logoutDisplay = !logoutDisplay;
	};

	const handleLogout = async () => {
		window.location.href = '/auth/logout';
	};

	const handleProfile = async () => {
		window.location.href = '/work/profile';
	};

	const handleAdmin = async () => {
		window.location.href = '/admin';
	};

	const handleDashboard = async () => {
		window.location.href = '/work';
	};

	const handleLeads = async () => {
		window.location.href = '/work/leads';
	};

	const handleSocialMedia = async () => {
		window.location.href = '/work/social';
	};

	const handleSeo = async () => {
		window.location.href = '/work/seo';
	};

	const handleImages = async () => {
		window.location.href = '/work/assets';
	};

	const handleWebpages = async () => {
		window.location.href = '/work/webpages';
	};

	const handleRockets = async () => {
		window.location.href = '/work/rockets';
	};

	const handleServiceConfiguration = async () => {
		window.location.href = '/work/services';
	};

	const toggleDark = async () => {
		$dark = !$dark;
	};

	var onresize = function () {
		windowWidth = window.innerWidth;
	};
</script>

<svelte:head>
	{#if whitelabel}
		<style type="text/css">
			::-webkit-scrollbar-thumb {
				border-radius: 8px;
				border: 3px solid transparent;
				background-clip: content-box;
				background-color: rgb(125, 125, 125);
			}
		</style>
	{/if}
</svelte:head>

<Column
	background={$dark ? 'rgb(20,20,20)' : 'rgb(250,250,250)'}
	height="100vh"
	width="100vw"
	minwidth="100vw"
	maxheight="100vh"
	minheight="none"
>
	<Column height="100vh" width="100vw">
		<Row
			width={windowWidth > 1000 ? 'calc(100% - 100px)' : '100%'}
			height={windowWidth > 1000 ? 'calc(100% - 100px)' : '100%'}
			padding={windowWidth > 1000 ? '50px' : '0'}
		>
			<Card
				borderradius={windowWidth > 1000 ? '5px' : '0'}
				dark={$dark}
				grow="1"
				height="100%"
				maxwidth="none"
			>
				<Row
					background={whitelabel
						? $dark
							? secondarycolor
							: primarycolor
						: $dark
						? '#E0AC8D'
						: 'var(--primary)'}
					height="75px"
					minheight="70px"
					width="100%"
					align="center"
					zindex="2"
				>
					{#if $dark}
						<Row on:click={handleDashboard} height="100%" padding="0 {windowWidth > 1000 ? '20px' : windowWidth > 800 ? '20px' : '0'}" cursor="pointer">
							{#if !whitelabel}
								<Image
									bordersides={$dark ? 'solid 1px var(--darktext)' : 'none'}
									height="100%"
									width="135px"
									src={Main_Logo}
								/>
							{:else}
								<Image
									bordersides={$dark ? 'solid 1px var(--darktext)' : 'none'}
									height="100%"
									width="135px"
									src={whitelabelimage}
								/>
							{/if}
						</Row>
					{:else}
						<Row on:click={handleDashboard} height="100%" padding="0 20px" cursor="pointer">
							{#if !whitelabel}
								<Image height="100%" width="135px" src={Main_Logo_Inverse} />
							{:else}
								<Image
									bordersides={$dark ? 'solid 1px var(--darktext)' : 'none'}
									height="100%"
									width="135px"
									src={whitelabelimage}
								/>{/if}
						</Row>
					{/if}

					<Row grow="1" align="center" gap="20px">
						<div
							class="mobile-work-menu"
							style="display: flex; align-items: center; gap: 20px; grow: 1;"
						>
							<div class="hover-label-parent" style="position: relative;">
								<IconImage
									border={$dark ? 'solid 1px var(--darktext)' : 'none'}
									background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
									on:click={handleImages}
									name="mspassets"
									width="40px"
									height="40px"
								/>

								<div
									class="hover-label"
									style="white-space: nowrap; left: 1px; left: -10px; color: {$dark
										? whitelabel
											? primarycolor
											: 'var(--primary)'
										: 'white'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500; background: {$dark
										? whitelabel
											? secondarycolor
											: '#E0AC8D'
										: whitelabel
										? primarycolor
										: 'var(--primary)'}"
								>
									Assets
								</div>
							</div>

							{#if $ktomek_msp}
								<div class="hover-label-parent" style="position: relative;">
									<IconImage
										border={$dark ? 'solid 1px var(--darktext)' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										on:click={handleLeads}
										name="lead"
										width="40px"
										height="40px"
									/>

									<div
										class="hover-label"
										style="white-space: nowrap; color: {$dark
											? whitelabel
												? primarycolor
												: 'var(--primary)'
											: 'white'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500; background: {$dark
											? whitelabel
												? secondarycolor
												: '#E0AC8D'
											: whitelabel
											? primarycolor
											: 'var(--primary)'}"
									>
										Leads
									</div>
								</div>

								<!-- <div class="hover-label-parent" style="position: relative;">
									<IconImage
										border={$dark ? 'solid 1px var(--darktext)' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										on:click={handleSeo}
										name="seo"
										width="40px"
										height="40px"
									/>

									<div
										class="hover-label"
										style="white-space: nowrap; left: 1px; color: {$dark
											? whitelabel
												? primarycolor
												: 'var(--primary)'
											: 'white'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500; background: {$dark
											? whitelabel
												? secondarycolor
												: '#E0AC8D'
											: whitelabel
											? primarycolor
											: 'var(--primary)'}"
									>
										SEO
									</div>
								</div> -->

								<!-- <div class="hover-label-parent" style="position: relative;">
									<IconImage
										border={$dark ? 'solid 1px var(--darktext)' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										on:click={handleSocialMedia}
										name="socialmedia"
										width="40px"
										height="40px"
									/>

									<div
										class="hover-label"
										style="white-space: nowrap; left: 1px; left: -32px; color: {$dark
											? whitelabel
												? primarycolor
												: 'var(--primary)'
											: 'white'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500; background: {$dark
											? whitelabel
												? secondarycolor
												: '#E0AC8D'
											: whitelabel
											? primarycolor
											: 'var(--primary)'}"
									>
										Social Media
									</div>
								</div> -->

								<div class="hover-label-parent" style="position: relative;">
									<IconImage
										border={$dark ? 'solid 1px var(--darktext)' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										on:click={handleWebpages}
										name="mspwebpages"
										width="40px"
										height="40px"
									/>

									<div
										class="hover-label"
										style="white-space: nowrap; left: 1px; left: -25px; color: {$dark
											? whitelabel
												? primarycolor
												: 'var(--primary)'
											: 'white'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500; background: {$dark
											? whitelabel
												? secondarycolor
												: '#E0AC8D'
											: whitelabel
											? primarycolor
											: 'var(--primary)'}"
									>
										Webpages
									</div>
								</div>
							{/if}
							<!-- <IconImage
								border={$dark ? 'solid 1px var(--darktext)' : 'none'}
								background={$dark ? 'var(--primary)' : 'white'}
								on:click={handleTimesheet}
								name="timesheet"
								width="40px"
								height="40px"
							/> -->

							<div class="hover-label-parent" style="position: relative;">
								<IconImage
									border={$dark ? 'solid 1px var(--darktext)' : 'none'}
									background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
									on:click={handleRockets}
									name="rockets_launched"
									width="40px"
									height="40px"
								/>

								<div
									class="hover-label"
									style="white-space: nowrap; left: 1px; left: -12px; color: {$dark
										? whitelabel
											? primarycolor
											: 'var(--primary)'
										: 'white'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500; background: {$dark
										? whitelabel
											? secondarycolor
											: '#E0AC8D'
										: whitelabel
										? primarycolor
										: 'var(--primary)'}"
								>
									Rockets
								</div>
							</div>
						</div>
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
							<Icon
								color={whitelabel ? primarycolor : 'var(--primary)'}
								icon="fa-sun-bright"
								size="fa-xl"
							/>
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

					{#if $dark}
						{#if $ktomek_supa_msp_admin}
							<Row on:click={handleServiceConfiguration} padding="0 10px" cursor="pointer">
								<Icon
									color={whitelabel
										? primarycolor
										: 'var(--primary)'}
									
									icon="fa-gear"
									size="fa-xl"
								/>
							</Row>
						{/if}
					{:else if $ktomek_supa_msp_admin}
						<Row on:click={handleServiceConfiguration} padding="0 10px" cursor="pointer">
							<Icon
								color="white"
								on:click={handleServiceConfiguration}
								icon="fa-gear"
								size="fa-xl"
							/>
						</Row>
					{/if}

					<Row align="center" justify="center" height="50%" padding="0 20px">
						<Avatar
							bordercolor={$dark ? 'var(--darktext)' : 'inherit'}
							color={$dark ? 'var(--darktext)' : 'inherit'}
							background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
							on:click={toggleLogout}>{firstLetter}</Avatar
						>

						{#if logoutDisplay}
							<div
								id="logout"
								style="position: absolute; display: flex; flex-direction: column; gap: 20px; top: calc(100% + 25px); cursor: pointer; left: {$ktomek_admin
									? '-85px'
									: '-25px'}; background: {$dark
									? whitelabel
										? secondarycolor
										: '#E0AC8D'
									: 'white'}; border-radius: 5px; padding: 15px 25px;box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);"
							>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									on:click={handleProfile}
									style="white-space: nowrap; color: {$dark
										? whitelabel
											? primarycolor
											: 'var(--primary)'
										: 'inherit'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500;"
								>
									Profile
								</div>

								{#if $ktomek_admin}
									<Row>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<div
											on:click={handleAdmin}
											style="cursor: pointer; white-space: nowrap; color: {$dark
												? whitelabel
													? primarycolor
													: 'var(--primary)'
												: 'inherit'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500;"
										>
											Ktomek Admin
										</div>
									</Row>
								{/if}

								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									on:click={handleLogout}
									style=" white-space: nowrap; color: {$dark
										? whitelabel
											? primarycolor
											: 'var(--primary)'
										: 'inherit'}; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; font-weight: 500;"
								>
									Logout
								</div>
							</div>
						{/if}
					</Row>

					<div
						class="mobile-work-menu-open"
						style="display: flex; align-items: center; gap: 20px; grow: 1; width: 50px; height: 40px; padding-left: 10px;"
					>
						<input id="menu-toggle" type="checkbox" />
						<label class="menu-button-container" for="menu-toggle">
							<div
								style="background-color: {$dark
									? whitelabel
										? primarycolor
										: 'var(--primary)'
									: 'var(--darktext)'}"
								class="menu-button {$dark ? 'dark-menu' : 'light-menu'}"
							/>
						</label>

						<ul
							class="menu"
							style="background: {$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}"
						>
							{#if $ktomek_msp}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
								<li
									style="color: {$dark
										? 'var(--darktext)'
										: whitelabel
										? primarycolor
										: 'var(--primary)'}"
									on:click={handleImages}
								>
									<IconImage
										border={$dark ? 'none' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										name="mspassets"
										width="40px"
										height="40px"
									/>
									Assets
								</li>

								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
								<li
									style="color: {$dark
										? 'var(--darktext)'
										: whitelabel
										? primarycolor
										: 'var(--primary)'}"
									on:click={handleLeads}
								>
									<IconImage
										border={$dark ? 'none' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										name="lead"
										width="40px"
										height="40px"
									/>
									Leads
								</li>

								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
								<!-- <li
									style="color: {$dark
										? 'var(--darktext)'
										: whitelabel
										? primarycolor
										: 'var(--primary)'}"
									on:click={handleSeo}
								>
									<IconImage
										border={$dark ? 'none' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										name="seo"
										width="40px"
										height="40px"
									/>
									SEO
								</li> -->

								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
								<!-- <li
									style="color: {$dark
										? 'var(--darktext)'
										: whitelabel
										? primarycolor
										: 'var(--primary)'}"
									on:click={handleSocialMedia}
								>
									<IconImage
										border={$dark ? 'none' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										name="socialmedia"
										width="40px"
										height="40px"
									/>
									Social Media
								</li> -->

								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
								<li
									style="color: {$dark
										? 'var(--darktext)'
										: whitelabel
										? primarycolor
										: 'var(--primary)'}"
									on:click={handleWebpages}
								>
									<IconImage
										border={$dark ? 'none' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										name="mspwebpages"
										width="40px"
										height="40px"
									/>
									Webpages
								</li>

								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
								<li
									style="color: {$dark
										? 'var(--darktext)'
										: whitelabel
										? primarycolor
										: 'var(--primary)'}"
									on:click={handleRockets}
								>
									<IconImage
										border={$dark ? 'none' : 'none'}
										background={$dark ? (whitelabel ? primarycolor : 'var(--primary)') : 'white'}
										name="rockets_launched"
										width="40px"
										height="40px"
									/>
									Rockets
								</li>
							{/if}
						</ul>
					</div>
				</Row>

				<Row grow="1" height="100%" width="100%">
					<slot />
				</Row>
			</Card>
			
		</Row>
	</Column>
</Column>

<slot name="dialogs" />

<style>
	.hover-label-parent:hover > .hover-label {
		transform: scale(1) !important;
	}

	.hover-label {
		transition: all 300ms;
		transform: scale(0);
		position: absolute;
		bottom: -50px;
		left: -5px;
		height: 10px;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.035) 0px 2.8px 2.2px, rgba(0, 0, 0, 0.047) 0px 6.7px 5.3px,
			rgba(0, 0, 0, 0.06) 0px 12.5px 10px, rgba(0, 0, 0, 0.07) 0px 22.3px 17.9px,
			rgba(0, 0, 0, 0.086) 0px 41.8px 33.4px, rgba(0, 0, 0, 0.12) 0px 100px 80px;
	}

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

	@media screen and (max-width: 800px) {
		.mobile-work-menu {
			display: none !important;
		}
	}

	@media screen and (min-width: 800px) {
		.mobile-work-menu-open {
			display: none !important;
		}
	}

	.menu {
		display: flex;
		flex-direction: row;
		list-style-type: none;
		justify-content: center !important;
		align-items: center !important;
		margin: 0;
		padding: 0;
		width: 100% !important;
	}

	.menu > li {
		margin: 0 1rem;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 300ms;
		letter-spacing: 0.03rem;
	}

	.menu-button-container {
		display: none;
		height: 100%;
		width: 30px;
		cursor: pointer;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#menu-toggle {
		display: none;
	}

	.menu-button {
		display: block;
		background-color: var(--primary);
		position: absolute;
		height: 3px;
		width: 30px;
		transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
		border-radius: 2px;
	}

	.menu-button::before,
	.menu-button::after {
		display: block;
		background-color: inherit;
		position: absolute;
		height: 3px;
		width: 30px;
		transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
		border-radius: 2px;
	}

	.menu-button::before {
		content: '';
		margin-top: -8px;
	}

	.menu-button::after {
		content: '';
		margin-top: 8px;
	}

	#menu-toggle:checked + .menu-button-container .menu-button::before {
		margin-top: 0px;
		transform: rotate(405deg);
	}

	#menu-toggle:checked + .menu-button-container .dark-menu::before {
		background-color: var(--darktext) !important;
	}

	#menu-toggle:checked + .menu-button-container .light-menu::before {
		background-color: var(--darktext) !important;
	}

	#menu-toggle:checked + .menu-button-container .menu-button {
		background: transparent !important;
	}

	#menu-toggle:checked + .menu-button-container .menu-button::after {
		margin-top: 0px;
		transform: rotate(-405deg);
	}

	#menu-toggle:checked + .menu-button-container .dark-menu::after {
		background-color: var(--darktext) !important;
	}

	#menu-toggle:checked + .menu-button-container .light-menu::after {
		background-color: var(--darktext) !important;
	}

	@media screen and (max-width: 800px) {
		.tablet-above {
			display: none;
		}

		.mobile-only {
			height: 30px;
			margin-left: auto;
			z-index: 10000;
		}

		.menu-button-container {
			display: flex;
		}
		.menu {
			position: absolute;
			top: -25px;
			margin-top: 100px;
			left: 0;
			flex-direction: column;
			width: 100%;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			overflow: hidden;
			box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
				0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
				0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
		}
		#menu-toggle ~ .menu li {
			height: 0;
			margin: 0;
			padding: 0;
			border: 0;
		}
		#menu-toggle:checked ~ .menu li {
			height: 3.5em;
			padding: 0;
		}
		.menu > li {
			display: flex;
			justify-content: center;
			margin: 0;
			padding: 0 0;
			width: 100%;
			color: var(--primary);
			background-color: var(--secondary);
			transition: all 300ms;
			cursor: pointer !important;
		}
		.menu > li:hover {
			background-color: var(--secondary);
		}
		.menu > li:not(:last-child) {
			border-bottom: 1px solid #444;
		}
	}
</style>
