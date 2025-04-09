<!-- // src/routes/auth/+page.svelte -->
<script lang="ts">
	import Column from '$lib/Column.svelte';
	import Row from '$lib/Row.svelte';
	import Card from '$lib/Card.svelte';

	import Button from '$lib/Button.svelte';
	import Textbox from '$lib/Textbox.svelte';

	import Body from '$lib/Text/Body.svelte';
	import Image from '$lib/Image.svelte';
	import Secondary from '$lib/Text/Secondary.svelte';

	import { onMount } from 'svelte';

	import { dark } from '../../ui_store.js';

	import { ktomek_admin } from '../../ui_store.js';
	import { ktomek_life } from '../../ui_store.js';
	import { ktomek_work } from '../../ui_store.js';

	import { ktomek_msp } from '../../ui_store.js';
	import { ktomek_supa_msp_admin } from '../../ui_store.js';
	import { ktomek_employee } from '../../ui_store.js';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	var Main_Logo =
		' ktomek_white_logo_color_background_horizontal.png';

	let otp = '';

	let phoneVerification = true;

	let error = false;
	let description = '';
	var appType = '';

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.get('phone')?.toString() === undefined && urlParams.get('email')?.toString() === undefined) {
			window.location.href = '/auth';
			return;
		}

		appType = urlParams.get('type')?.toString() ?? 'work';
		phoneVerification = urlParams.get('phone')?.toString() === undefined ? false : true;
	});

	const handleVerificationPhone = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		var localPhone = urlParams.get('phone')?.toString();

		if (localPhone === undefined) {
			window.location.href = '/auth';
			return;
		}

		if(otp.length != 8) {
			error = true;
			description = 'Please provide an 8 digit code.'
			return;
		}

		var response = await supabase.auth
			.verifyOtp({
				phone: localPhone,
				token: otp,
				type: 'sms'
			})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error;
			});

		if (!response.error) {
			var phoneverificationparm = true;
			const { data, error } = await supabase.rpc('updateuserphoneverify', {
				phoneverificationparm
			});

			await checkAdmin();
			await checkLife();
			await checkWork();

			await checkMSP();
			await checkMSPSupa();
			await checkEmployee();

			if (urlParams.get('type')?.toString() == 'life') {
				window.location.href = '/life';
			}
			if (urlParams.get('type')?.toString() == 'work') {
				window.location.href = '/work';
			}
		} else {
			error = true;
			description = 'System error, please try again.'
			return;
		}
	};

	const handleVerificationEmail = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		var localEmail = urlParams.get('email')?.toString();

		if (localEmail === undefined) {
			window.location.href = '/auth';
			return;
		}

		if(otp.length != 6) {
			error = true;
			description = 'Please provide a 6 digit code.'
			return;
		}

		var response = await supabase.auth
			.verifyOtp({
				email: localEmail,
				token: otp,
				type: 'email'
			})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error;
			});

		if (!response.error) {
			var emailverificationparm = true;
			const { data, error } = await supabase.rpc('updateuseremailverify', {
				emailverificationparm
			});

			await checkAdmin();
			await checkLife();
			await checkWork();

			await checkMSP();
			await checkMSPSupa();
			await checkEmployee();

			if (urlParams.get('type')?.toString() == 'life') {
				window.location.href = '/life';
			}
			if (urlParams.get('type')?.toString() == 'work') {
				window.location.href = '/work';
			}
		} else {
			error = true;
			description = 'System error, please try again.'
			return;
		}
	};

	async function checkAdmin() {
		if (await isUserInRole('ktomek_admin')) {
			$ktomek_admin = true;
		} else {
			$ktomek_admin = false;
		}
	}

	async function checkLife() {
		if (await isUserInRole('ktomek_life')) {
			$ktomek_life = true;
		} else {
			$ktomek_life = false;
		}
	}

	async function checkWork() {
		if (await isUserInRole('ktomek_work')) {
			$ktomek_work = true;
		} else {
			$ktomek_work = false;
		}
	}

	async function checkMSP() {
		if (await isUserInRole('ktomek_msp')) {
			$ktomek_msp = true;
		} else {
			$ktomek_msp = false;
		}
	}

	async function checkEmployee() {
		if (await isUserInRole('ktomek_employee')) {
			$ktomek_employee = true;
		} else {
			$ktomek_employee = false;
		}
	}

	async function checkMSPSupa() {
		if (await isUserInRole('ktomek_supa_msp_admin')) {
			$ktomek_supa_msp_admin = true;
		} else {
			$ktomek_supa_msp_admin = false;
		}
	}

	async function isUserInRole(rolenameparm: string) {
		const { data, error } = await supabase.rpc('isuserinrole', { rolenameparm });

		if (data != undefined) {
			if (data?.length > 0) {
				return true;
			}
			return false;
		}
		return false;
	}
</script>

<svelte:head>
	<title>Ktomek | Auth</title>

	<meta
		name="description"
		content="Access your personalized Ktomek App with our secure login page. 
	Designed with your privacy and convenience in mind, our login process safeguards your information while providing seamless access to our innovative technology solutions."
	/>
</svelte:head>

<Column
	background={$dark ? 'rgb(20,20,20)' : 'rgb(250,250,250)'}
	grow="1"
	height="auto"
	minheight="100vh"
	padding="0 20px"
>
	<Row width="100%" padding="20px 0">
		<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'}
			><a href="/" class="link-a">Back</a></Button
		>
	</Row>

	<Row grow="1" align="center" justify="center" width="100%" marginbottom="100px">
		<Card dark={$dark} width="300px" height="fit-content" padding="25px 0" gap="20px">
			<Row width="100%" height="fit-content" align="center" justify="center" marginbottom="20px">
				<Image
					src={Main_Logo}
					background={$dark ? 'transparent' : 'transparent'}
					borderradius="5px"
					border={$dark ? '' : ''}
					width="calc(100% - 40px)"
					alt="Ktomek Logo"
				/>
			</Row>

			<Column gap="20px" width="100%">
				<Row width="100%">
					<Textbox
						dark={$dark}
						id="otp"
						name="otp"
						required={true}
						bind:value={otp}
						on:keyup={(e) => {
							e.key === 'Enter' && handleVerificationPhone();
						}}
						placeholder="{phoneVerification ? '8' : '6'} digit code">OTP</Textbox
					>
				</Row>

				{#if error}
					<Row width="calc(100% - 40px)" padding="0 20px">
						<Secondary color="var(--warn)">{description}</Secondary>
					</Row>
				{/if}

				{#if phoneVerification}
					<Row width="100%" align="center" justify="center" margintop="20px">
						<Button
							color={$dark ? 'var(--darktext)' : 'var(--primary)'}
							on:click={handleVerificationPhone}>Verify</Button
						>
					</Row>
				{:else}
					<Row width="100%" align="center" justify="center" margintop="20px">
						<Button
							color={$dark ? 'var(--darktext)' : 'var(--primary)'}
							on:click={handleVerificationEmail}>Verify</Button
						>
					</Row>
				{/if}
			</Column>
		</Card>
	</Row>

	<Row width="100%" height="100%" align="center" justify="end">
		<Column width="100%">
			<div
				style="background: {$dark
					? 'var(--darktext)'
					: 'var(--primary)'}; height: 1px; width: 100%;"
			/>

			<Row width="100%" margintop="6px">
				<Row padding="0 50px">
					<div
						style="background: {$dark
							? 'var(--darktext)'
							: 'var(--primary)'}; height: 1px; width: 20px; transform: rotate(-45deg);"
					/>
				</Row>
				<Row padding="0 50px" marginleft="auto">
					<div
						style="background: {$dark
							? 'var(--darktext)'
							: 'var(--primary)'}; height: 1px; width: 20px; transform: rotate(45deg);"
					/>
				</Row>
			</Row>

			<Row width="100%" margintop="6px">
				<Row padding="0 25px">
					<div
						style="background: {$dark
							? 'var(--darktext)'
							: 'var(--primary)'}; height: 1px; width: 25vw;"
					/>
				</Row>
				<Row padding="0 25px" marginleft="auto">
					<div
						style="background: {$dark
							? 'var(--darktext)'
							: 'var(--primary)'}; height: 1px; width: 25vw;"
					/>
				</Row>
			</Row>
		</Column>
	</Row>

	<Row align="center" justify="center" gap="20px" width="100%" wrap="wrap">
		<Column align="center">
			<Row align="center" justify="center" gap="20px" padding="25px 0 0 0" wrap="wrap">
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'} buttonType="link"
					><a href="https://app.termly.io/document/acceptable-use/b1f25949-cf46-4706-b2f8-01472460a6bb" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Acceptable Use Policy</a></Button
				>
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'} buttonType="link"
					><a href="https://app.termly.io/document/cookie-policy/9ce880e1-fbcd-4629-a923-5f9572bdba8f" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Cookie Policy</a></Button
				>
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'} buttonType="link"
					><a href="https://app.termly.io/document/privacy-policy/2d0d5556-51b5-4389-8a6e-d6792f445981" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Privacy Policy</a></Button
				>
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'} buttonType="link"
					><a href="https://app.termly.io/document/terms-of-service/a49a49d6-6997-4fdd-b62b-d1dabd4b9031" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Terms of Use</a></Button
				>
			</Row>

			<Row justify="center" padding="0 0 20px 0">
				<!-- svelte-ignore a11y-missing-attribute -->
				<Body color={$dark ? 'var(--darktext)' : 'var(--darktext)'}>© 2022-2024 Ktomek LLC | <a class="termly-display-preferences" style="text-decoration: underline; cursor: pointer; color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Preferences</a>  | <a href="https://app.termly.io/document/disclaimer/fb265c67-66a9-4545-a5f0-e6643e25c715" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--darktext)'}">Disclaimer</a></Body>
			</Row>
		</Column>
	</Row>
</Column>
