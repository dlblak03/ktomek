<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Column from '$lib/Column.svelte';
	import DataWidget from '$lib/DataWidget.svelte';
    import rowClick from '$lib/DataWidget.svelte';
	import Icon from '$lib/Icon.svelte';
	import Row from '$lib/Row.svelte';
    import Body from '$lib/Text/Body.svelte';
	import { onMount } from 'svelte';
	import { dark } from '../../ui_store';

    import type { PageData } from './$types';
	import Dialog from '$lib/Dialog.svelte';
	import Textbox from '$lib/Textbox.svelte';
	import Header from '$lib/Text/Header.svelte';
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
        },
        {
            column_name: 'Created',
            column: 'created_at'
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
    let users: any[] = []
    let allUsers: any[] = []

    let addUserDialog = '0';

    let tabOne = true;
    let organizationDialog = '0';
    let orgID = '-1'
    let orgName = '';
    let orgEmail = '';
    let orgPhone = '';
    let orgAddress = '';
    let orgContact = '';

    let windowWidth = 1001;

    const saveOrganization = async () => {
        const { data, error } = await supabase
        .from('organizations')
        .upsert({ organization: orgName, address: orgAddress, primarycontact: orgContact, email: orgEmail, phone: orgPhone }, { onConflict: 'organization'})
        .select()

        if(error == null) {
            if(data != undefined) {
                if(data?.length > 0) {
                    if(orgID != '-1') {
                        organizations = organizations.filter(o => o.organizationid != orgID)
                    }
                    organizations.push(data[0])
                    organizations = [...organizations]

                    organizationDialog = "0";

                    orgID = '-1'
                    orgName = '';
                    orgEmail = '';
                    orgPhone = '';
                    orgAddress = '';
                    orgContact = '';
                }
            }
        }
	};

    const openExistingOrganization = async (organization: any) => {
        organizationDialog = "1";

        orgID = organization.organizationid

        orgName = organization.organization;
        orgEmail = organization.email;
        orgPhone = organization.phone;
        orgAddress = organization.address;
        orgContact = organization.primarycontact;
        
        await loadAssignedUsers();
    }

    const clearDialog = async () => {
        orgName = '';
        orgEmail = '';
        orgPhone = '';
        orgAddress = '';
        orgContact = '';
    }

    const addUserToOrganization = async (userLocal: any) => {
        var localID = userLocal.id
        var localOrgID = orgID

        const { data, error } = await supabase
        .from('orgassignments')
        .upsert({ organizationid: orgID, userid: localID })
        .select()
    }

    onMount(async () => {
		const { data, error } = await supabase
		.from('organizations')
		.select()

		if(error == null) {
			organizations = data;
		}

        await loadAllUsers();
	})

    async function loadAssignedUsers() {
        var orgidparm = orgID
        const { data, error } = await supabase
		.rpc('getorgassignments', { orgidparm })
        
		if(error == null) {
			users = data;
		}
    }

    async function loadAllUsers() {
        const { data, error } = await supabase
		.from('users')
		.select()

		if(error == null) {
			allUsers = data;
		}
    }
    
    export let data: PageData;
    let { supabase, session } = data;
	$: ({ supabase, session } = data);
</script>

<svelte:head>
	<title>Ktomek Admin | Organizations</title>
</svelte:head>

<Row padding="{windowWidth > 1000 ? '50px' : '25px'}" grow="1" overflowy="auto">
    <Column grow="1" width="100%" gap="50px">
        <Row width="100%">
            <Column>
                <Header color="{$dark ? 'var(--darktext)' : 'initial'}" size="28px">Ktomek Organizations</Header>
                <Body color="{$dark ? 'var(--darktext)' : 'initial'}">Use this form to efficiently manage Ktomek Organizations. You can add, edit, and delete them with ease.</Body>
            </Column>
        </Row>
        <Row grow="1" width="100%">
            <DataWidget cursor="pointer" dark={$dark} columns={columns} data={organizations} searchid="orgsearch" rowClick={async (dr) => { await openExistingOrganization(dr) }}>
                <Row marginleft="20px">
                    <Button color="{$dark ? 'var(--darktext)' : 'initial'}" on:click={() => { organizationDialog = '1'; clearDialog(); }}><Icon color="{$dark ? 'var(--darktext)' : 'var(--primary)'}" icon="fa-plus" size="fa-xl" />Add Organization</Button>
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
		width="500px"
		on:click={() => {
			setTimeout(function () {
				organizationDialog = '1';
			}, 1);
		}}
	>
    <Column grow="1" gap="40px">
        <Row width="100%">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <Row grow="1" padding="0 25px">
                <div on:click={() => { tabOne = !tabOne }} class="hover-item" style="display: flex; flex-grow: 1; justify-content: center; {tabOne ? 'border-bottom: solid 2px var(--primary);' : 'border-bottom: solid 2px transparent;'} padding: 10px 0; cursor: pointer; transition: all 300ms;">
                    <Header color="{$dark ? 'var(--darktext)' : 'var(--primary)'}">Organization Information</Header>
                </div>

                <div on:click={() => { tabOne = !tabOne }} class="hover-item" style="display: flex; flex-grow: 1; justify-content: center; padding: 10px 0; cursor: pointer; transition: all 300ms; {tabOne ? 'border-bottom: solid 2px transparent;' : 'border-bottom: solid 2px var(--primary);'};">
                    <Header color="{$dark ? 'var(--darktext)' : 'var(--primary)'}">Assigned Users</Header>
                </div>
            </Row>            
        </Row>
        {#if tabOne}
            <Column width="100%" grow="1" gap="40px" margintop="20px">
                <Row width="100%" padding="10px 0">
                    <Textbox dark={$dark} id="orgname" bind:value={orgName}>Organization</Textbox>
                </Row>

                <Row width="100%">
                    <Textbox dark={$dark} id="orgemail" bind:value={orgEmail}>Email</Textbox>
                </Row>

                <Row width="100%">
                    <Textbox dark={$dark} id="orgphone" bind:value={orgPhone}>Phone</Textbox>
                </Row>

                <Row width="100%">
                    <Textbox dark={$dark} id="orgaddress" bind:value={orgAddress}>Address</Textbox>
                </Row>

                <Row width="100%">
                    <Textbox dark={$dark} id="orgcontact" bind:value={orgContact}>Primary Contact</Textbox>
                </Row>

                <Row padding="0 20px">
                    <Button buttonType="success"
                    on:click={() => { saveOrganization() }}
                    color={$dark ? 'var(--darktext)' : 'var(--primary)'}>Save</Button>
                </Row>
            </Column>
        {:else}
            <Column width="100%" grow="1" gap="40px" margintop="20px">
                <DataWidget width="100%" dark={$dark} columns={userColumns} data={users} searchid="usersearch" rowClick={async (dr) => {  }} cursor="pointer">
                    <Row marginleft="20px">
                        <Button color="{$dark ? 'var(--darktext)' : 'var(--primary)'}" on:click={() => { addUserDialog = '1'; }}><Icon color="{$dark ? 'var(--darktext)' : 'var(--primary)'}" icon="fa-plus" size="fa-xl" />Assign User</Button>
                    </Row>
                </DataWidget>
            </Column>
        {/if}
    </Column>
	</Row>
</Dialog>

<Dialog
	dark={$dark}
	scale={addUserDialog}
	on:click={(e) => {
		addUserDialog = '0';
	}}
>
	<Row
		padding="40px 20px"
		width="500px"
		on:click={() => {
			setTimeout(function () {
				addUserDialog = '1';
			}, 1);
		}}
	>
        <Column grow="1" gap="40px">
            <DataWidget width="100%" dark={$dark} columns={userColumns} data={allUsers} searchid="usersearch" rowClick={async (dr) => { await addUserToOrganization(dr) }}></DataWidget>
        </Column>
	</Row>
</Dialog>

<style type="text/css">
    .hover-item:hover {
        border-bottom: solid 2px var(--primary) !important;
    }
</style>