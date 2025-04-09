<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Column from '$lib/Column.svelte';
	import Icon from '$lib/Icon.svelte';
	import IconImage from '$lib/IconImage.svelte';
	import Image from '$lib/Image.svelte';
	import Row from '$lib/Row.svelte';
	import Tag from '$lib/Tag.svelte';
	import Body from '$lib/Text/Body.svelte';
	import Header from '$lib/Text/Header.svelte';
	var Main_Logo =
		' ktomek_white_logo_color_background_horizontal.png';

	import { dark } from './ui_store.js';

	const toggleDark = async () => {
		$dark = !$dark;
	};

	const toggleHome = async () => {
		window.location.href = '/';
	};
</script>

<svelte:head>
	<title>Welcome to Ktomek</title>

	<meta
		name="description"
		content="Driving transformative change through cutting-edge technology. 
	We offer IT consultancy, user-centric applications, and the innovative Ktomek Work app. 
	Based in Louisville, KY, we empower users with reliable and intuitive solutions that simplify complex challenges. 
	Join us in shaping the future of tech!"
	/>
</svelte:head>

<Column
	background={$dark ? 'rgb(20,20,20)' : 'rgb(250,250,250)'}
	grow="1"
	minheight="100vh"
	padding="0 20px"
>
	<Row align="center" height="100px" gap="20px" width="100%" zindex="2">
		<Row on:click={toggleHome} cursor="pointer" borderradius="5px">
			<Image src={Main_Logo} height="75px" width="150px" borderradius="5px" alt="Ktomek Logo" />
		</Row>
		<div class="tablet-above">
			<Row gap="20px">
				<!-- <Button color="{$dark ? 'var(--darktext)' : 'var(--primary)'}"><a href="/auth?type=life" class="link-a">Life</a></Button> -->
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'}
					><a href="/auth?type=work" class="link-a">Work</a></Button
				>
			</Row>

			<Row marginleft="auto" gap="20px" align="center">
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'}
					><a href="/about-us" class="link-a">About</a></Button
				>
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'}
					><a href="/testimonials" class="link-a">Testimonials</a></Button
				>
				<Button color={$dark ? 'var(--darktext)' : 'var(--primary)'}
					><a href="/contact-us" class="link-a">Contact</a></Button
				>
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
						<Icon color="var(--darktext)" icon="fa-sun-bright" size="fa-xl" />
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
						<Icon color="var(--primary)" icon="fa-moon" size="fa-xl" />
					</Row>
				{/if}
			</Row>
		</div>
		<div class="mobile-only" style="display: flex; align-items: center; gap: 10px;">
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
					<Icon color="var(--darktext)" icon="fa-sun-bright" size="fa-xl" />
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
					<Icon color="var(--primary)" icon="fa-moon" size="fa-xl" />
				</Row>
			{/if}

			<input id="menu-toggle" type="checkbox" />
			<label class="menu-button-container" for="menu-toggle">
				<div
					style="background-color: {$dark ? 'var(--darktext)' : 'var(--primary)'}"
					class="menu-button {$dark ? 'dark-menu' : 'light-menu'}"
				/>
			</label>

			<ul class="menu" style="background: {$dark ? 'rgb(20,20,20)' : 'rgb(250,250,250)'}">
				<li>
					<a
						href="/"
						class="link-a"
						style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'} !important">Home</a
					>
				</li>
				<li>
					<a
						href="/about-us"
						class="link-a"
						style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'} !important">About</a
					>
				</li>
				<li>
					<a
						href="/testimonials"
						class="link-a"
						style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'} !important">Testimonials</a
					>
				</li>
				<li>
					<a
						href="/contact-us"
						class="link-a"
						style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'} !important">Contact</a
					>
				</li>
				<!-- <li><a href="/auth?type=life" class="link-a" style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'} !important">Ktomek Life</a></li> -->
				<li>
					<a
						href="/auth?type=work"
						class="link-a"
						style="color: {$dark ? 'var(--darktext)' : 'var(--primary)'} !important">Ktomek Work</a
					>
				</li>
			</ul>
		</div>
	</Row>

	<Column grow="1" align="center" justify="center" gap="20px" width="100%">
		<Row justify="center">
			<Body align="center" spacing="0.75rem" color={$dark ? 'var(--darktext)' : 'var(--primary)'}
				>EXPERIENCE</Body
			>
		</Row>
		<Row justify="center">
			<Body
				align="center"
				spacing="0.75rem"
				size="32px"
				color={$dark ? 'var(--darktext)' : 'var(--primary)'}>KTOMEK LIFE</Body
			>
		</Row>
		<Row justify="center">
			<h1
				style="    font-size: 14px;
			height: auto;
			width: auto;
			color: var(--primary);
			letter-spacing: 0.75rem;
			transition: all 300ms ease 0s;
			font-weight: initial;
			text-align: center;"
			>
				INNOVATIVE, TRANSFORMATIVE CHANGE
			</h1>
		</Row>
	</Column>

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
	@media screen and (min-width: 800px) {
		.tablet-above {
			display: flex;
			align-items: center;
			flex-grow: 1;
		}

		.mobile-only {
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
		background-color: var(--primary) !important;
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
		background-color: var(--primary) !important;
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
			top: 0;
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
