<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Column from '$lib/Column.svelte';
	import DataWidget from '$lib/DataWidget.svelte';
    import rowClick from '$lib/DataWidget.svelte';
	import Icon from '$lib/Icon.svelte';
	import Row from '$lib/Row.svelte';
	import { onMount } from 'svelte';
	import { dark } from '../../ui_store';

    import type { PageData } from './$types';
	import Dialog from '$lib/Dialog.svelte';
	import Textbox from '$lib/Textbox.svelte';
	import Header from '$lib/Text/Header.svelte';
    import Body from '$lib/Text/Body.svelte';
	import HeaderLarge from '$lib/Text/Header Large.svelte';

    let columns = [
        {
            column_name: 'Organization',
            column: 'organization'
        },
        {
            column_name: 'Primary Contact',
            column: 'primarycontact'
        },
        {
            column_name: 'Email',
            column: 'email'
        },
        {
            column_name: 'Phone',
            column: 'phone'
        },
        {
            column_name: 'Address',
            column: 'address'
        }
    ]

    let userColumns = [
        {
            column_name: 'First Name',
            column: 'first_name'
        },
        {
            column_name: 'Last Name',
            column: 'last_name'
        }
    ]

    let organizations: any[] = [
    ]
    let windowWidth = 1001;
    let users: any[] = []
    let allOrgs: any[] = []

    let addUserDialog = '0';

    let tabOne = false;
    let organizationDialog = '0';

    onMount(async () => {
		const { data, error } = await supabase
		.rpc("getmspassignments")

		if(error == null) {
			organizations = data;
		}

        await loadAllOrgs();
        allOrgs = allOrgs.filter(org => !organizations.find(o => o.organizationid == org.organizationid))
	})

    async function loadAllOrgs() {
        const { data, error } = await supabase
		.from('organizations')
		.select()

		if(error == null) {
			allOrgs = data;
		}
    }

    async function assignOrgToMsp(org: any) {
        const { data, error } = await supabase
        .from('mspassignments')
        .upsert({ organizationid: org.organizationid })

        await reloadOrgs()
    }

    async function reloadOrgs() {
        const { data, error } = await supabase
		.rpc("getmspassignments")

		if(error == null) {
			organizations = data;
		}
    }
    
    export let data: PageData;
    let { supabase, session } = data;
	$: ({ supabase, session } = data);
</script>

<svelte:head>
	<title>Ktomek Admin | MSP</title>
</svelte:head>

<Row padding="{windowWidth > 1000 ? '50px' : '25px'}" grow="1" overflowy="auto">
    <Column grow="1" width="100%" gap="50px">
        <Row width="100%">
            <Column>
                <Header color="{$dark ? 'var(--darktext)' : 'initial'}" size="28px">Ktomek MSP</Header>
                <Body color="{$dark ? 'var(--darktext)' : 'initial'}">Use this form to add or remove organizations from the Ktomek MSP service. By adding an organization to the service, they will gain access to Ktomek Work, Leads and the Technological Oversight dashboard.</Body>
            </Column>
        </Row>
        <Row grow="1" width="100%">
            <DataWidget dark={$dark} columns={columns} data={organizations} searchid="orgsearch" rowClick={async (dr) => {  }}>
                <Row marginleft="20px">
                    <Button color="{$dark ? 'var(--darktext)' : 'initial'}" on:click={() => { organizationDialog = '1'; }}><Icon color="{$dark ? 'var(--darktext)' : 'var(--primary)'}" icon="fa-plus" size="fa-xl" />Add Organization</Button>
                </Row>
            </DataWidget>
        </Row>
    </Column>
</Row>

<Dialog
	dark={$dark}
	scale={organizationDialog}
	on:click={(e) => {
		organizationDialog = '0';
	}}
>
	<Row
		padding="40px 20px"
		on:click={() => {
			setTimeout(function () {
				organizationDialog = '1';
			}, 1);
		}}
	>
    <Column grow="1" gap="40px">
        <Column width="100%" grow="1" gap="40px" margintop="20px">
            <DataWidget width="100%" dark={$dark} columns={columns} data={allOrgs} searchid="allorgs" rowClick={async (dr) => { assignOrgToMsp(dr) }} cursor="pointer">
            </DataWidget>
        </Column>
    </Column>
	</Row>
</Dialog>

<style type="text/css">
    .hover-item:hover {
        border-bottom: solid 2px var(--primary) !important;
    }
</style>