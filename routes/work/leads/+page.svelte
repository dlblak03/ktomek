<script lang="ts">
	import Column from '$lib/Column.svelte';	
	import Row from '$lib/Row.svelte';

    import DataWidget from '$lib/DataWidget.svelte';
	
    import Header from '$lib/Text/Header.svelte';
    import Body from '$lib/Text/Body.svelte';

    import { onMount } from 'svelte';
	import { dark } from '../../ui_store';
    import type { PageData } from './$types';
    
    export let data: PageData;
    let { supabase, session, whitelabel, primarycolor, secondarycolor } = data;
	$: ({ supabase, session, whitelabel, primarycolor, secondarycolor } = data);

    var leads: any[] = []
    let columns: any = []

    let windowWidth = 1001;

    onMount(async () => {
        leads = JSON.parse(data.leads)

        windowWidth = window.innerWidth;
		window.addEventListener('resize', onresize);

        columns = JSON.parse(data.columns)
    })

    var onresize = function () {
		windowWidth = window.innerWidth;
	};
</script>

<svelte:head>
	<title>Ktomek Work | Leads</title>
</svelte:head>

<Row padding="{windowWidth > 1000 ? '50px' : '25px'}" grow="1" height="{windowWidth > 1000 ? 'calc(100% - 100px)' : 'calc(100% - 50px)'}" overflowy="auto">
    <Column grow="1" padding="0 0 50px 0" width="100%" gap="50px">
        <Row width="100%">
            <Column>
                <Header color="{$dark ? 'var(--darktext)' : 'initial'}" size="28px">Leads</Header>
                <Body color="{$dark ? 'var(--darktext)' : 'initial'}">Utilize this form to efficiently handle leads, including managing, archiving (available soon), and deleting (available soon) them.</Body>
            </Column>
        </Row>
        <Row grow="1" width="100%">
            <DataWidget leadsView={true} whitelabel={whitelabel} primarycolor={primarycolor} dark={$dark} columns={columns} data={leads} searchid="orgsearch">
            </DataWidget> 
        </Row>
        <Row minheight="100px" />
    </Column>
</Row>
