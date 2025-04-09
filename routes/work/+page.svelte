<script lang="ts">
	import Card from '$lib/Card.svelte';
	import Column from '$lib/Column.svelte';
	import Image from '$lib/Image.svelte';
	import Row from '$lib/Row.svelte';
	import HeaderLarge from '$lib/Text/Header Large.svelte';
	import Header from '$lib/Text/Header.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Icon from '$lib/Icon.svelte';
	import Body from '$lib/Text/Body.svelte';
	import Poster from '$lib/Poster.svelte';
	import { dark } from '../ui_store';
	import { ktomek_msp } from '../ui_store';

	let firstname = '';
    let windowWidth = 1001;

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
	});

	async function handleWebsiteLeads() {
		window.location.href = '/work/leads';
	}

	export let data: PageData;

	let { supabase, session, whitelabel, primarycolor, secondarycolor } = data;
	$: ({ supabase, session, whitelabel, primarycolor, secondarycolor } = data);
</script>

<svelte:head>
	<title>Ktomek Work</title>
</svelte:head>

<Row padding="{windowWidth > 1000 ? '50px' : '25px'}" grow="1" height="{windowWidth > 1000 ? 'calc(100% - 100px)' : 'calc(100% - 50px)'}" overflowy="auto">
    <Column grow="1" padding="0 0 50px 0" width="100%" gap="50px">
        <Column>
            <Row>
                <Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px"
                    >Welcome to the Ktomek Work application, {firstname}</Header
                >
            </Row>
            <Row>
                <Body color={$dark ? 'var(--darktext)' : 'initial'}
                    >Use this dashboard to gain a high-level overview of your company's technological
                    insights. Easily visualize where your time and efforts are being allocated.</Body
                >
            </Row>

            <Row margintop="50px">
                {#if $ktomek_msp}
                    <Poster background={$dark ? 'rgb(75,75,75)' : 'initial'}>
                        <Column width="100%">
                            <Row
                                width="100%"
                                borderradius="5px 5px 0 0"
                                background={whitelabel ? primarycolor : 'var(--primary)'}
                                overflowx="hidden"
                                overflowy="hidden"
                                align="center"
                                height="50px"
                            >
                                <Header color="white" padding="0 20px">Website Leads</Header>
                                <Row grow="1" height="100%" align="center" justify="end">
                                    <div
                                        style="background: white; position: absolute; right: 0; height: 1px; width: 55px; bottom: 0;"
                                    />
                                    <div
                                        style="background: white; position: absolute; right: 50px; height: 1px; width: 20px; bottom: 5px; transform: rotate(45deg)"
                                    />
                                    <div
                                        style="background: white; position: absolute; right: 60px; height: 1px; width: 55px; bottom: 12px;"
                                    />
                                    <Row cursor="pointer" padding="0 20px" on:click={handleWebsiteLeads}>
                                        <Icon icon="fa-arrow-right" color="white" />
                                    </Row>
                                </Row>
                            </Row>
                            <div
                                style="background: {whitelabel ? primarycolor : 'var(--primary)'}; height: 20px; width: 20px; position: absolute; top: 40px; right: 50px; transform: rotate(-45deg)"
                            />
                            <div
                                style="background: {whitelabel ? primarycolor : 'var(--primary)'}; height: 20px; width: 60px; position: absolute; top: 45px; right: 0;"
                            />

                            <Row width="100%" grow="1" align="center" justify="center">
                                <Header color={$dark ? 'var(--darktext)' : 'initial'} size="28px"
                                    >{data.leads_count} active lead{data.leads_count > 1 ? 's' : ''}</Header
                                >
                            </Row>
                        </Column>
                    </Poster>
                {/if}
            </Row>
        </Column>
    </Column>
</Row>
