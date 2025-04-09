<!-- // src/routes/auth/+page.svelte -->
<script>
	import { onMount } from 'svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

    onMount(async () => {
		await supabase.auth.signOut();

		window.location.href = '/'
    });
</script>
