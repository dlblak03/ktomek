<script lang="ts">
	import Cropper from 'svelte-easy-crop';
	import Row from '$lib/Row.svelte';
	import Column from '$lib/Column.svelte';

	import Header from '$lib/Text/Header.svelte';
	import Body from '$lib/Text/Body.svelte';
	import Icon from '$lib/Icon.svelte';
	import ImageComp from '$lib/Image.svelte';
	import Toggle from '$lib/v2/Inputs/toggle.svelte';
	import ButtonHover from '$lib/v2/Buttons/button-hover.svelte';

	import { onMount } from 'svelte';
	import { dark } from '../../ui_store';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	let windowWidth = 1001;

    export let form: ActionData;
	export let data: PageData;
	let { supabase, session, whitelabel, primarycolor, secondarycolor } = data;
	$: ({ supabase, session, whitelabel, primarycolor, secondarycolor } = data);

	let toggler: boolean = false;
	let localToggler: boolean = false;
	let t: string = '#ffffff';

	let crop = { x: 0, y: 0 };
	let zoom = 1;

	let image: any,
		fileinput,
		pixelCrop: any,
		croppedImage: any = null;

	let whitelabelimage: any = '';
	let shortcode: string = '';

    let primaryForm: any;
    let secondaryForm: any;

	$: if (croppedImage) {
		uploadFile(new File([croppedImage], 'business-logo', { type: 'image/png' }));
		whitelabelimage = URL.createObjectURL(croppedImage);
		croppedImage = null;
	}

	const uploadFile = async (file: File) => {
		const { data, error } = await supabase.storage
			.from('msp_private')
			.upload('/' + shortcode + '/whitelabel/logo/' + file.name, file, {
				cacheControl: '3600',
				upsert: true
			});
	};

	onMount(async () => {
		windowWidth = window.innerWidth;
		window.addEventListener('resize', onresize);

		toggler = data.whitelabel;
		localToggler = data.whitelabel;
		shortcode = data.shortcode;

		const { data: dt, error } = await supabase.storage
			.from('msp_private')
			.download(shortcode + '/whitelabel/logo/business-logo');

		if (error == null) {
			whitelabelimage = URL.createObjectURL(dt);
		}
	});

	var onresize = function () {
		windowWidth = window.innerWidth;
	};

	function onFileSelected(e: any) {
		let imageFile = e.target.files[0];
		let reader = new FileReader();
		reader.onload = (e) => {
			image = e.target?.result;
			whitelabelimage = '';
		};
		reader.readAsDataURL(imageFile);
	}

	async function cropImage() {
		croppedImage = await getCroppedImg(image, pixelCrop);
	}

	function previewCrop(e: any) {
		pixelCrop = e.detail.pixels;
		const { x, y, width } = e.detail.pixels;
		const scale = 200 / width;
	}

	const createImage = (url: any) =>
		new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener('load', () => resolve(image));
			image.addEventListener('error', (error) => reject(error));
			image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
			image.src = url;
		});

	function getRadianAngle(degreeValue: any) {
		return (degreeValue * Math.PI) / 180;
	}

	function rotateSize(width: any, height: any, rotation: any) {
		const rotRad = getRadianAngle(rotation);

		return {
			width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
			height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
		};
	}

	async function getCroppedImg(
		imageSrc: any,
		pixelCrop: any,
		rotation = 0,
		flip = { horizontal: false, vertical: false }
	) {
		const image: any = await createImage(imageSrc);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			return null;
		}

		const rotRad = getRadianAngle(rotation);

		// calculate bounding box of the rotated image
		const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
			image.width,
			image.height,
			rotation
		);

		// set canvas size to match the bounding box
		canvas.width = bBoxWidth;
		canvas.height = bBoxHeight;

		// translate canvas context to a central location to allow rotating and flipping around the center
		ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
		ctx.rotate(rotRad);
		ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
		ctx.translate(-image.width / 2, -image.height / 2);

		// draw rotated image
		ctx.drawImage(image, 0, 0);

		// croppedAreaPixels values are bounding box relative
		// extract the cropped image using these values
		const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

		// set canvas width to final desired crop size - this will clear existing context
		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;

		// paste generated rotate image at the top left corner
		ctx.putImageData(data, 0, 0);

		// As Base64 string
		// return canvas.toDataURL('image/jpeg');

		// As a blob
		return new Promise((resolve, reject) => {
			canvas.toBlob((file) => {
				resolve(file);
			}, 'image/png');
		});
	}
</script>

<svelte:head>
	<title>Ktomek Work | Service Configuration</title>
</svelte:head>

<Row
	padding={windowWidth > 1000 ? '50px' : '25px'}
	grow="1"
	height={windowWidth > 1000 ? 'calc(100% - 100px)' : 'calc(100% - 50px)'}
	overflowy="auto"
>
	<Column grow="1" padding="0 0 50px 0" width="100%" gap="20px">
		<Row width="100%">
			<Column grow="1">
				<Header color={$dark ? 'var(--darktext)' : 'var(--pr)'} size="28px"
					>Service Configuration</Header
				>
				<Body color={$dark ? 'var(--darktext)' : 'initial'}
					>Utilize this form to customize the services offered by Ktomek LLC.</Body
				>

				<Column grow="1" align="center" justify="center" width="100%" margintop="100px" gap="25px">
					<Row justify="center" align="center" grow="1" width="100%" gap="50px">
						<Body color={$dark ? 'var(--darktext)' : 'initial'}
							>Enable Ktomek Work White Label:</Body
						>
						<Toggle
							bind:toggle={toggler}
							background={!toggler ? 'var(--warn)' : 'var(--success)'}
							on:click={async () => {
								localToggler = !localToggler;
								await fetch('/api/services/whitelabel', {
									body: localToggler.toString(),
									method: 'POST'
								});
							}}
						>
							<Icon
								color={toggler ? ($dark ? 'var(--darktext)' : 'var(--primary)') : 'var(--darktext)'}
								icon="fa-x"
								marginleft="2px"
							/>
							<Icon
								color={!toggler
									? $dark
										? 'var(--darktext)'
										: 'var(--primary)'
									: 'var(--darktext)'}
								icon="fa-check"
								marginleft="5px"
							/>
						</Toggle>
					</Row>

					{#if toggler}
						<Column border="solid 1px {whitelabel ? primarycolor : 'var(--primary)'}" borderradius="5px" padding="20px" gap="25px">
							<Row align="center" gap="25px">
								<Body color={$dark ? 'var(--darktext)' : 'initial'}>Upload Business Logo:</Body>
								<Row
									width="135px"
									height="70px"
									border="solid 1px {whitelabel ? primarycolor : 'var(--primary)'}"
									borderradius="5px"
									cursor="pointer"
									align="center"
									justify="center"
									on:click={() => {
										document.getElementById('businesslogo')?.click();
									}}
								>
									{#if image == null && croppedImage == null && whitelabelimage == ''}
										<Icon color={$dark ? 'var(--darktext)' : 'initial'} icon="fa-upload" />
									{:else if croppedImage == null && whitelabelimage == ''}
										<Cropper
											{image}
											bind:crop
											bind:zoom
											on:cropcomplete={previewCrop}
											aspect={1}
											cropSize={{ width: 135, height: 70 }}
										/>
									{:else if croppedImage != null && whitelabelimage == ''}
										<ImageComp borderradius="5px" src={croppedImage} />
									{:else if image != null && whitelabelimage == ''}
										<ImageComp borderradius="5px" src={image} />
									{:else if whitelabelimage != ''}
										<ImageComp borderradius="5px" src={whitelabelimage} />
									{/if}
									<input
										type="file"
										id="businesslogo"
										accept=".jpg, .jpeg, .png"
										on:change={(e) => onFileSelected(e)}
										bind:this={fileinput}
										style="display: none;"
									/>
								</Row>

								{#if croppedImage == null && whitelabelimage == ''}
									<Row>
										<ButtonHover
											on:click={async () => {
												await cropImage();
											}}>Upload</ButtonHover
										>
									</Row>
								{/if}
							</Row>

							<Row width="100%" align="center" gap="25px">
								<Body color={$dark ? 'var(--darktext)' : 'initial'}>Primary Color:</Body>
								<Row marginleft="auto">
									<form use:enhance bind:this={primaryForm} method="POST" action="?/updatePrimaryColor">
										<input value={form?.primarycolor == undefined ? primarycolor : form?.primarycolor} type="color" id="primarycolor" name="primarycolor" on:change={() => { primaryForm.submit() }} />
									</form>
								</Row>
							</Row>

                            <Row width="100%" align="center" gap="25px">
								<Body color={$dark ? 'var(--darktext)' : 'initial'}>Secondary Color:</Body>
								<Row marginleft="auto">
									<form use:enhance bind:this={secondaryForm} method="POST" action="?/updateSecondaryColor">
										<input value={form?.secondarycolor == undefined ? secondarycolor : form?.secondarycolor} type="color" id="secondarycolor" name="secondarycolor" on:change={() => { secondaryForm.submit() }} />
									</form>
								</Row>
							</Row>
						</Column>
					{/if}
				</Column>
			</Column>
		</Row>
	</Column>
</Row>
