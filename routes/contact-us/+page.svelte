<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Column from '$lib/Column.svelte';
	import Row from '$lib/Row.svelte';
	import Image from '$lib/Image.svelte';
	import Body from '$lib/Text/Body.svelte';

	var Main_Logo_Inverse =
		' ktomek_logo_white_background_horizontal.png';
	var Main_Logo =
		' ktomek_white_logo_color_background_horizontal.png';
	import type { PageData } from '../$types';
	import Card from '$lib/Card.svelte';
	import Textbox from '$lib/Textbox.svelte';
	import Textarea from '$lib/Textarea.svelte';
	import { dark } from '../ui_store';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	export let data: PageData;
</script>

<svelte:head>
	<title>Ktomek | Contact</title>

	<meta
		name="description"
		content="Reach out to our team of experts for cutting-edge technology and innovative tech solutions tailored to your needs. 
		Our minimalistic approach ensures clarity and precision in every interaction. Connect with us today."
	/>
</svelte:head>

<h1 style="display: none;">Contact Ktomek</h1>

<Column grow="1" minheight="100vh" padding="0 20px" background={'var(--primary)'}>
	<Row align="center" height="100px" gap="20px" width="100%">
		<Button inverse={true}><a href="/" class="link-a" style="color: white;">Back</a></Button>
	</Row>

	<Row grow="1" width="100%" align="center" justify="center" marginbottom="100px" margintop="100px">
		<Card padding="20px 20px 40px 20px" width="300px" gap="25px">
			<Row width="calc(100% - 40px)" justify="center" padding="0 20px" marginbottom="25px">
				<Image borderradius="5px" src={Main_Logo_Inverse} width="100%" alt="Ktomek Logo" />
			</Row>
			<form
				action="?/postLead"
				style="width: 100%; gap: 25px; display: flex; flex-direction: column;"
				method="post"
				use:enhance
			>
				<Row width="100%">
					<Textbox id="name" name="name">Name</Textbox>
				</Row>
				<Row width="100%">
					<Textbox id="email" name="email">Email</Textbox>
				</Row>
				<Row width="100%">
					<Textbox id="phone" name="phone">Phone</Textbox>
				</Row>
				<Row width="100%">
					<Textarea id="message" name="message">Message</Textarea>
				</Row>
				<Row width="100%" justify="center">
					<Button>Submit</Button>
				</Row>

				{#if form?.success}
					<Row width="100%" justify="center">
						<p>Form was successfully submitted.</p>
					</Row>
				{:else if form}
					<Row width="100%" justify="center">
						<p>{form?.error}</p>
					</Row>
				{/if}
			</form>
		</Card>
	</Row>

	<div class="hide-mobile">
		<Row align="center" height="100px" gap="20px" width="100%" marginbottom="10px">
			<Image src={Main_Logo_Inverse} height="100px" alt="Ktomek Logo" borderradius="5px" />
		</Row>
	</div>

	<Row width="100%" align="center" justify="end">
		<Column width="100%">
			<div
				style="background: {$dark
					? 'var(--darktext)'
					: 'var(--darktext)'}; height: 1px; width: 100%;"
			/>

			<Row width="100%" margintop="6px">
				<Row padding="0 50px">
					<div
						style="background: {$dark
							? 'var(--darktext)'
							: 'var(--darktext)'}; height: 1px; width: 20px; transform: rotate(-45deg);"
					/>
				</Row>
				<Row padding="0 50px" marginleft="auto">
					<div
						style="background: {$dark
							? 'var(--darktext)'
							: 'var(--darktext)'}; height: 1px; width: 20px; transform: rotate(45deg);"
					/>
				</Row>
			</Row>

			<Row width="100%" margintop="6px">
				<Row padding="0 25px">
					<div
						style="background: {$dark
							? 'var(--darktext)'
							: 'var(--darktext)'}; height: 1px; width: 25vw;"
					/>
				</Row>
				<Row padding="0 25px" marginleft="auto">
					<div
						style="background: {$dark
							? 'var(--darktext)'
							: 'var(--darktext)'}; height: 1px; width: 25vw;"
					/>
				</Row>
			</Row>
		</Column>
	</Row>

	<Row align="center" justify="center" gap="20px" width="100%" wrap="wrap">
		<Column align="center">
			<Row align="center" justify="center" gap="20px" padding="25px 0 0 0" wrap="wrap">
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'} buttonType="link"
					><a href="https://app.termly.io/document/acceptable-use/b1f25949-cf46-4706-b2f8-01472460a6bb" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--darktext)'}">Acceptable Use Policy</a></Button
				>
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'} buttonType="link"
					><a href="https://app.termly.io/document/cookie-policy/9ce880e1-fbcd-4629-a923-5f9572bdba8f" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--darktext)'}">Cookie Policy</a></Button
				>
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'} buttonType="link"
					><a href="https://app.termly.io/document/privacy-policy/2d0d5556-51b5-4389-8a6e-d6792f445981" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--darktext)'}">Privacy Policy</a></Button
				>
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'} buttonType="link"
					><a href="https://app.termly.io/document/terms-of-service/a49a49d6-6997-4fdd-b62b-d1dabd4b9031" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--darktext)'}">Terms of Use</a></Button
				>
			</Row>

			<Row justify="center" padding="0 0 20px 0">
				<!-- svelte-ignore a11y-missing-attribute -->
				<Body color={$dark ? 'var(--darktext)' : 'var(--darktext)'}>© 2022-2024 Ktomek LLC | <a class="termly-display-preferences" style="text-decoration: underline; cursor: pointer; color: {$dark ? 'var(--darktext)' : 'var(--darktext)'}">Preferences</a>  | <a href="https://app.termly.io/document/disclaimer/fb265c67-66a9-4545-a5f0-e6643e25c715" target="_blank" style="color: {$dark ? 'var(--darktext)' : 'var(--darktext)'}">Disclaimer</a></Body>
			</Row>
		</Column>
	</Row>
</Column>

<style type="text/css">
	.hide-mobile {
		display: none;
	}
</style>
