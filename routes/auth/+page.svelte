<!-- // src/routes/auth/+page.svelte -->
<script lang="ts">
	import Column from '$lib/Column.svelte';
	import Row from '$lib/Row.svelte';
	import Card from '$lib/Card.svelte';

	import Button from '$lib/Button.svelte';
	import Textbox from '$lib/Textbox.svelte';

	import Image from '$lib/Image.svelte';
	import Body from '$lib/Text/Body.svelte';
	import Secondary from '$lib/Text/Secondary.svelte';

	import { dark } from '../ui_store.js';

	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import P from '$lib/v2/Text/p.svelte';

	export let form: ActionData;
	export let data;

	let { supabase } = data;
	$: ({ supabase } = data);

	var Main_Logo =
		' ktomek_white_logo_color_background_horizontal.png';

	let emailSignIn = false;
	let left = '45px';

	let countries: any[] = [
		{
			country: 'US',
			code: '+1',
		}
	]
	let selectedCountry: number = 0

	onMount(async () => {
		setTimeout(() => {
			document.getElementById('phone')?.focus();
		}, 150);

		emailSignIn = form?.esi ?? false;
		if(emailSignIn) {
			left = '153px'
		}
	});
</script>

<svelte:head>
	<title>Ktomek | Auth</title>

	<meta
		name="description"
		content="Access your personalized Ktomek App with our secure login page. 
	Designed with your privacy and convenience in mind, our login process safeguards your information while providing seamless access to our innovative technology solutions."
	/>
</svelte:head>

<div style="display: none;">
	<a href="https://www.freepnglogos.com/images/american-usa-flag-38746.html">Get it on simple american flag</a>
</div>

<h1
	style="    font-size: 14px;
			height: auto;
			width: auto;
			color: var(--primary);
			letter-spacing: 0.75rem;
			transition: all 300ms ease 0s;
			font-weight: initial;
			text-align: center;
			display: none;"
>
	Ktomek Auth - Application Login
</h1>

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
		<Card maxwidth="300px" dark={$dark} height="fit-content" padding="25px 0" gap="20px">
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
				<Row align="center" justify="center" marginbottom="40px" width="100%" gap="20px">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						on:click={() => {
							left = '45px';
							emailSignIn = false;
							setTimeout(() => {
								document.getElementById('phone')?.focus();
							}, 100);
						}}
						style="color: {$dark
							? 'var(--darktext)'
							: 'var(--primary)'}; font-weight: 400; font-size: 18px; padding: 0 20px; cursor: pointer;"
					>
						Phone
					</div>

					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						on:click={() => {
							left = '153px';
							emailSignIn = true;
							setTimeout(() => {
								document.getElementById('email')?.focus();
							}, 100);
						}}
						style="color: {$dark
							? 'var(--darktext)'
							: 'var(--primary)'}; font-weight: 400; font-size: 18px; padding: 0 20px; cursor: pointer;"
					>
						Email
					</div>

					<div class="active-selected-sign-in-type" style="left: {left};" />
				</Row>

				{#if emailSignIn}
					<form
						method="POST"
						action="?/handleSignInEmail"
						style="display: flex; width: 100%; gap: 40px; flex-direction: column;"
						use:enhance
					>
						<Row width="100%">
							<Textbox
								dark={$dark}
								id="email"
								name="email"
								value={form?.email ?? ''}
								placeholder="example@ktomek.com">Email</Textbox
							>
						</Row>

						{#if form?.error}
							<Row width="calc(100% - 40px)" padding="0 20px" marginbottom="-50px" margintop="-25px">
								<Secondary color="var(--warn)">{form?.description}</Secondary>
							</Row>
						{/if}

						<Row width="100%" align="center" justify="center" margintop="20px">
							<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'}>Login</Button>
						</Row>
					</form>
				{:else}
					<form
						method="POST"
						action="?/handleSignInPhone"
						style="display: flex; width: 100%; gap: 40px; flex-direction: column;"
						use:enhance
					>
						<Row justify="center" marginleft="20px">
							<div style="cursor: default; border: solid 1px var(--primary); padding: 0 10px; gap: 10px; border-radius: 5px; align-items: center; height: 55px; width: 55px; display: flex; justify-content: center; background: {$dark ? 'rgb(60, 60, 60)' : 'white'}">
								<P color={$dark ? 'var(--darktext)' : 'var(--primary)'}>{countries[selectedCountry].country}</P>
								<P color={$dark ? 'var(--darktext)' : 'var(--primary)'}>{countries[selectedCountry].code}</P>
							</div>
							<div style="display: none;">
								<Textbox
								dark={$dark}
								id="country"
								name="country"
								value={countries[selectedCountry].code}
								placeholder=" "></Textbox>
							</div>
							<Textbox
								dark={$dark}
								id="phone"
								name="phone"
								value={form?.phone ?? ''}
								placeholder="xxx-xxx-xxxx">Phone</Textbox
							>
						</Row>

						{#if form?.error}
							<Row width="calc(100% - 40px)" padding="0 20px" marginbottom="-50px" margintop="-25px">
								<Secondary color="var(--warn)">{form?.description}</Secondary>
							</Row>
						{/if}

						<Row width="100%" align="center" justify="center" margintop="20px">
							<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'}>Login</Button>
						</Row>
					</form>

					<Row width="calc(100% - 40px)" padding="0 20px">
						<Secondary color="rgb(150,150,150)"
							><span style="display: flex; justify-content: center; text-align: center;"
								>By submitting this request, you authorize Ktomek LLC to send text messages with
								offers and other information. Message/data rates may apply.</span
							></Secondary
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
				<Body color={$dark ? 'var(--darktext)' : 'var(--primary)'}>© 2022-2024 Ktomek LLC | <a class="termly-display-preferences" style="text-decoration: underline; cursor: pointer; color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Preferences</a>  | <a href="https://app.termly.io/document/disclaimer/fb265c67-66a9-4545-a5f0-e6643e25c715" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'}">Disclaimer</a></Body>
			</Row>
		</Column>
	</Row>
</Column>

<style type="text/css">
	.active-selected-sign-in-type {
		position: absolute;
		height: 100%;
		width: 100px;
		padding: 10px 0;
		border-radius: 5px;
		border: solid 2px var(--primary);
		transition: all 300ms;
		pointer-events: none;
	}
</style>
