<script lang="ts">
    import Button from '$lib/Button.svelte';
	import Column from '$lib/Column.svelte';
	import DataWidget from '$lib/DataWidget.svelte';
    import rowClick from '$lib/DataWidget.svelte';
	import Icon from '$lib/Icon.svelte';
	import Row from '$lib/Row.svelte';
	import { dark } from '../../ui_store';

    import type { PageData } from './$types';
	import Dialog from '$lib/Dialog.svelte';
	import Textbox from '$lib/Textbox.svelte';
	import Header from '$lib/Text/Header.svelte';
	import Body from '$lib/Text/Body.svelte';
	import HeaderLarge from '$lib/Text/Header Large.svelte';

	import { onMount } from 'svelte';
	import Snackbar from '$lib/Snackbar.svelte';

    let columns = [
        {
            column_name: 'Role',
            column: 'rolename'
        },
        {
            column_name: 'Description',
            column: 'roledescription'
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

    let roles: any[] = [
    ]

	let windowWidth = 1001;
	let tabOne = true;
    let rolesDialog = '0'
	let addUserDialog = '0'

	let roleID = '';
	let roleName = '';
	let roleDescription = '';

	let users: any[] = [];
	let allUsers: any[] = []

	var displayVar = "0";
	var backgroundVar = "var(--success)";
	var messageVar = "";
    
    onMount(async () => {
		const { data, error } = await supabase
		.from('roles')
		.select()

		if(error == null) {
			roles = data;
		}

		await loadAllUsers();
	})

	const openRole = async (role: any) => {
        rolesDialog = "1";

        roleID = role.roleid
		roleName = role.rolename
		roleDescription = role.roledescription

		await loadUsersToRole();
		await loadAllUsers();
		allUsers = allUsers.filter(us => !users.find((u: any) => u.id == us.id))
    }

	async function loadUsersToRole() {
		var roleidparm = roleID
        const { data, error } = await supabase
		.rpc('getroleassignments', { roleidparm })

		if(error == null) {
			users = data;
		}
    }

	async function addUserToRole(userLocal: any) {
        var localID = userLocal.id
        var localRoleID = roleID

        const { data, error } = await supabase
        .from('roleassignments')
        .upsert({ roleid: localRoleID, id: localID })

		addUserDialog = '0'

		await loadUsersToRole();
		await loadAllUsers();
		allUsers = allUsers.filter(us => !users.find((u: any) => u.id == us.id))
    }

	async function loadAllUsers() {
        const { data, error } = await supabase
		.from('users')
		.select()

		if(error == null) {
			allUsers = data;
		}
    }

	async function saveRole() {
        const { data, error } = await supabase
        .from('roles')
        .upsert({ rolename: roleName, roledescription: roleDescription }, { onConflict: 'rolename'})

		await loadRoles()

		clearDialog();
		
		rolesDialog = '0';

		if(error == null) {
			displayVar = '1'
			messageVar = 'Successfully saved role information'
		}
    }

	const clearDialog = async () => {
        roleName = '';
		roleDescription = '';
    }

	async function loadRoles() {
        const { data, error } = await supabase
		.from('roles')
		.select()

		if(error == null) {
			roles = data;
		}
    }
    
    export let data: PageData;
    let { supabase, session } = data;
	$: ({ supabase, session } = data);
</script>

<svelte:head>
	<title>Ktomek Admin | Roles</title>
</svelte:head>

<Row padding="{windowWidth > 1000 ? '50px' : '25px'}" grow="1" overflowy="auto">
    <Column grow="1" width="100%" gap="50px">
        <Row width="100%">
            <Column>
                <Header color="{$dark ? 'var(--darktext)' : 'initial'}" size="28px">Ktomek Roles</Header>
                <Body color="{$dark ? 'var(--darktext)' : 'initial'}">Use this form to manage roles by adding, editing, and deleting them.</Body>
            </Column>
        </Row>
        <Row grow="1" width="100%">
            <DataWidget cursor="pointer" dark={$dark} columns={columns} data={roles} searchid="rolesearch" rowClick={async (dr) => { await openRole(dr) }}>
                <Row marginleft="20px">
                    <Button color="{$dark ? 'var(--darktext)' : 'initial'}" on:click={() => { rolesDialog = '1'; }}><Icon color="{$dark ? 'var(--darktext)' : 'var(--primary)'}" icon="fa-plus" size="fa-xl" />Add Role</Button>
                </Row>
            </DataWidget>
        </Row>
    </Column>
</Row>

<Snackbar on:click={() => { displayVar = "0" }} scale={displayVar} background={backgroundVar} message={messageVar}></Snackbar>

<Dialog
	dark={$dark}
	scale={rolesDialog}
	on:click={(e) => {
		rolesDialog = '0';
	}}
>
	<Row
		padding="40px 20px"
		width="500px"
		on:click={() => {
			setTimeout(function () {
				rolesDialog = '1';
			}, 1);
		}}
	>
		<Column grow="1" gap="40px">
            <Row width="100%">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<Row grow="1" padding="0 25px">
					<div on:click={() => { tabOne = !tabOne }} class="hover-item" style="display: flex; flex-grow: 1; justify-content: center; {tabOne ? 'border-bottom: solid 2px var(--primary);' : 'border-bottom: solid 2px transparent;'} padding: 10px 0; cursor: pointer; transition: all 300ms;">
						<Header color="{$dark ? 'var(--darktext)' : 'var(--primary)'}">Role Information</Header>
					</div>
	
					<div on:click={() => { tabOne = !tabOne }} class="hover-item" style="display: flex; flex-grow: 1; justify-content: center; padding: 10px 0; cursor: pointer; transition: all 300ms; {tabOne ? 'border-bottom: solid 2px transparent;' : 'border-bottom: solid 2px var(--primary);'};">
						<Header color="{$dark ? 'var(--darktext)' : 'var(--primary)'}">Assigned Users</Header>
					</div>
				</Row>            
			</Row>

			{#if tabOne}
			<Column width="100%" grow="1" gap="40px" margintop="20px">
                <Row width="100%" padding="10px 0">
                    <Textbox dark={$dark} id="orgname" bind:value={roleName}>Role Name</Textbox>
                </Row>

                <Row width="100%">
                    <Textbox dark={$dark} id="orgemail" bind:value={roleDescription}>Role Description</Textbox>
                </Row>

                <Row padding="0 20px">
                    <Button buttonType="success"
                    on:click={() => { saveRole() }}
                    color={$dark ? 'var(--darktext)' : 'var(--primary)'}>Save Information</Button>
                </Row>
            </Column>
			{:else}
				<Column width="100%" grow="1" gap="40px" margintop="20px">
					<DataWidget width="100%" dark={$dark} columns={userColumns} data={users} searchid="usersearch" rowClick={async (dr) => {  }}>
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
            <DataWidget cursor="pointer" width="100%" dark={$dark} columns={userColumns} data={allUsers} searchid="usersearch" rowClick={async (dr) => { await addUserToRole(dr) }}></DataWidget>
        </Column>
	</Row>
</Dialog>