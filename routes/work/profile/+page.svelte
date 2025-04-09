<script lang="ts">
	import Column from '$lib/Column.svelte';
	import Row from '$lib/Row.svelte';

	import Textbox from '$lib/Textbox.svelte';
	import DateTB from '$lib/Date.svelte';
	import ButtonHover from '$lib/v2/Buttons/button-hover.svelte';

	import Icon from '$lib/Icon.svelte';
	import Body from '$lib/Text/Body.svelte';
	import Header from '$lib/Text/Header.svelte';

	import Snackbar from '$lib/Snackbar.svelte';

	import type { ActionData, PageData } from './$types';
	import { onMount } from 'svelte';
	import { dark } from '../../ui_store';
	import { enhance } from '$app/forms';
	

	export let form: ActionData;
	export let data: PageData;
	let { supabase, session, whitelabel, primarycolor, secondarycolor } = data;
	$: ({ supabase, session, whitelabel, primarycolor, secondarycolor } = data);

	let windowWidth = 1001;

	let phone: string = '';
	let otp: string = '';
	let showverify: boolean = false;
	let phonecounter: number = 60;
	let phonedescription: string = '';

	onMount(async () => {
		windowWidth = window.innerWidth;
		window.addEventListener('resize', onresize);

		phone = data.phone;
	});

	var onresize = function () {
		windowWidth = window.innerWidth;
	};

	const updatePhone = async () => {
		let logactionparm = 'Update';
		let logdescriptionparm = 'Ktomek Work Phone OTP Code Sent';
		let loglocationparm = '/work/profile';
		await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

		const { data, error: et } = await supabase.auth.updateUser({
			phone: '+1' + phone.replaceAll('-', '')
		});
	};

	const verifyPhone = async () => {
		let logactionparm = 'Update';
		let logdescriptionparm = 'Ktomek Work Phone OTP Code Verified';
		let loglocationparm = '/work/profile';
		await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

		const {
			data: { session: s },
			error: et
		} = await supabase.auth.verifyOtp({
			phone: '+1' + phone?.replaceAll('-', ''),
			token: otp ?? '',
			type: 'phone_change'
		});

		if (et == null) {
			const { error: ett } = await supabase.rpc('updateuserphone', { phoneparm: phone });
			const { error: ef } = await supabase.rpc('updateuserphoneverify', {
				phoneverificationparm: true
			});

			if (ett == null && ef == null) {
				data.phone_verification = true;
				showverify = false;
			}
		}
	};

	const setIntervalForPhone = () => {
		var clearThisGuy = setInterval(() => {
			phonedescription = phonecounter + ' seconds remaining to verify OTP.';

			if (phonecounter == 0) {
				showverify = false;
				clearInterval(clearThisGuy);
			}

			phonecounter = phonecounter - 1;
		}, 1000);
	};
</script>

<svelte:head>
	<title>Ktomek Work | Profile</title>
</svelte:head>

<Row
	padding={windowWidth > 1000 ? '50px' : '25px'}
	grow="1"
	height={windowWidth > 1000 ? 'calc(100% - 100px)' : 'calc(100% - 50px)'}
	overflowy="auto"
	justify="center"
>
	<Column grow="1" padding="0 0 50px 0" align="center" width="100%" gap="50px">
		<Row width="100%">
			<Column>
				<Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px">Profile</Header>
				<Body color={$dark ? 'var(--darktext)' : 'initial'}
					>Use this form to edit your profile information.</Body
				>
			</Column>
		</Row>
		<Column gap="30px" align="center">
			<form
				method="post"
				action="?/saveProfileInformation"
				style="display: flex; flex-direction: column; gap: 30px; width: 100%;"
				use:enhance={() => {
					return async ({ update }) => {
						update({ reset: false });
					};
				}}
			>
				<Row width="100%" margintop="100px">
					<!-- First name -->
					<Textbox
						{whitelabel}
						{primarycolor}
						dark={$dark}
						id="firstname"
						name="firstname"
						required={true}
						placeholder=" "
						value={data.firstname}>First name</Textbox
					>
				</Row>

				<Row width="100%">
					<!-- Last name -->
					<Textbox
						{whitelabel}
						{primarycolor}
						dark={$dark}
						id="lastname"
						name="lastname"
						required={true}
						value={data.lastname}
						placeholder=" ">Last name</Textbox
					>
				</Row>

				<Row width="100%">
					<!-- Date of birth -->
					<DateTB
						{whitelabel}
						{primarycolor}
						dark={$dark}
						id="dob"
						name="dob"
						required={true}
						value={data.dob}
						placeholder=" ">DOB</DateTB
					>
				</Row>

				<Row width="100%" justify="center">
					<ButtonHover {whitelabel} {primarycolor} dark={$dark}>Save Information</ButtonHover>
				</Row>
			</form>

			<Row width="100%" align="center" margintop="50px">
				<!-- Phone -->
				<Textbox
					{whitelabel}
					{primarycolor}
					dark={$dark}
					id="phone"
					name="phone"
					bind:value={phone}
					placeholder="xxx-xxx-xxxx"
					disabled={data.phone_verification}>Phone number</Textbox
				>
				{#if data.phone_verification}
					<Row align="center" gap="10px">
						<Icon color="var(--success)" icon="fa-circle-check" size="fa-xl" />
						<Body color="var(--success)">Verified</Body>
					</Row>
				{:else}
					<Row align="center" gap="10px">
						<ButtonHover
						dark={$dark}
						whitelabel={whitelabel}
						primarycolor={primarycolor}
							on:click={async () => {
								showverify = true;
								phonecounter = 60;
								setIntervalForPhone();
								await updatePhone();
							}}
						>
							Send OTP
						</ButtonHover>
					</Row>
				{/if}
			</Row>

			{#if showverify}
				<Row width="100%" align="center">
					<!-- OTP -->
					<Textbox
						{whitelabel}
						{primarycolor}
						dark={$dark}
						id="otp"
						name="otp"
						bind:value={otp}
						placeholder="Ktomek OTP code"
						required={true}>OTP</Textbox
					>
					<Row align="center" gap="10px">
						<ButtonHover
						dark={$dark}
						whitelabel={whitelabel}
						primarycolor={primarycolor}
							on:click={async () => {
								await verifyPhone();
							}}>Verify</ButtonHover
						>
					</Row>
				</Row>
			{/if}

			{#if showverify}
				<Row padding="0 20px">
					<Body color={$dark ? 'var(--darktext)' : 'initial'}>
						{phonedescription}
					</Body>
				</Row>
			{/if}

			<Row width="100%" align="center">
				<!-- Email -->
				<Textbox
					{whitelabel}
					{primarycolor}
					dark={$dark}
					id="email"
					name="email"
					required={true}
					disabled={data.email_verification}
					value={data.email}
					placeholder=" ">Email</Textbox
				>
				{#if data.email_verification}
					<Row align="center" gap="10px">
						<Icon color="var(--success)" icon="fa-circle-check" size="fa-xl" />
						<Body color="var(--success)">Verified</Body>
					</Row>
				{:else}
					<Row align="center" gap="10px">
						<Icon color="var(--warn)" icon="fa-circle-check" size="fa-xl" />
						<Body color="var(--warn)">Not verified</Body>
					</Row>
				{/if}
			</Row>

			<Row borderradius="5px" width="100%" margintop="50px">
				<!-- <Collapsable
					titleiconimage={data.titleimage}
					titleiconimageval={data.packageicon}
					title={data.subscription}
					titlecolor={$dark ? 'var(--darktext)' : 'var(--primary)'}
				>
					<Column padding="20px 25px" gap="10px">
						{#if data.apphosting}
							<Row align="center" gap="10px">
								<Body color={$dark ? 'var(--darktext)' : 'var(--primary)'}>Application Hosting</Body
								>
							</Row>
						{/if}
						<Row align="center" gap="10px">
							<Body color={$dark ? 'var(--darktext)' : 'var(--primary)'}
								>{data.ktomekworkeula} Ktomek Work End User License{data.ktomekworkeula > 1
									? 's'
									: ''}</Body
							>
						</Row>
						<Row align="center" gap="10px">
							<Body color={$dark ? 'var(--darktext)' : 'var(--primary)'}
								>{data.developmenthours} Application Design and Development Hours</Body
							>
						</Row>
						<Row align="center" gap="10px">
							<Body color={$dark ? 'var(--darktext)' : 'var(--primary)'}
								>{data.socialaccounts} managed social media account{data.socialaccounts > 1
									? 's'
									: ''} ({data.socialmediaposts}
								post per account)</Body
							>
						</Row>
						{#if data.seo}
							<Row align="center" gap="10px">
								<Body color={$dark ? 'var(--darktext)' : 'var(--primary)'}
									>SEO management and optimization with analytics, audits and reports (available
									soon)</Body
								>
							</Row>
						{/if}
						<Row width="calc(100% - 50px)" borderradius="5px" margintop="20px">
							<Header color={$dark ? 'var(--darktext)' : 'var(--primary)'}>PRICE:</Header>
							<Row marginleft="auto">
								<Header color={$dark ? 'var(--darktext)' : 'var(--primary)'}
									>${data.packagecost} / month</Header
								>
							</Row>
						</Row>
					</Column>
				</Collapsable> -->
			</Row>
			<Row minheight="100px" />
		</Column>
	</Column>
</Row>

<Snackbar scale={form?.scaleSnackbar} message={form?.message} background={form?.background} />
