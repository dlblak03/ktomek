<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import { dark } from './ui_store';
	import { ktomek_admin } from './ui_store';
	import { ktomek_life } from './ui_store';
	import { ktomek_work } from './ui_store';
	import { ktomek_msp } from './ui_store';
	import { ktomek_supa_msp_admin } from './ui_store';
	import { ktomek_employee } from './ui_store';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let savestore = false;
	$: if (savestore) {
		setCookie('dark', $dark, 1);
		setCookie('ktomek_admin', $ktomek_admin, 1);
		setCookie('ktomek_life', $ktomek_life, 1);
		setCookie('ktomek_work', $ktomek_work, 1);
		setCookie('ktomek_msp', $ktomek_msp, 1);
		setCookie('ktomek_supa_msp_admin', $ktomek_supa_msp_admin, 1);
		setCookie('ktomek_employee', $ktomek_employee, 1);
	}

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		let darkCookie = getCookie('dark');
		if (darkCookie) {
			$dark = darkCookie === 'true' ? true : false;
		}
		let ktomek_adminCookie = getCookie('ktomek_admin');
		if (ktomek_adminCookie) {
			$ktomek_admin = ktomek_adminCookie === 'true' ? true : false;
		}
		let ktomek_lifeCookie = getCookie('ktomek_life');
		if (ktomek_lifeCookie) {
			$ktomek_life = ktomek_lifeCookie === 'true' ? true : false;
		}
		let ktomek_workCookie = getCookie('ktomek_work');
		if (ktomek_workCookie) {
			$ktomek_work = ktomek_workCookie === 'true' ? true : false;
		}
		let ktomek_mspCookie = getCookie('ktomek_msp');
		if (ktomek_mspCookie) {
			$ktomek_msp = ktomek_mspCookie === 'true' ? true : false;
		}
		let ktomek_supaMspCookie = getCookie('ktomek_supa_msp_admin');
		if (ktomek_supaMspCookie) {
			$ktomek_supa_msp_admin = ktomek_supaMspCookie === 'true' ? true : false;
		}
		let ktomek_employeeCookie = getCookie('ktomek_employee');
		if (ktomek_employeeCookie) {
			$ktomek_employee = ktomek_employeeCookie === 'true' ? true : false;
		}
		savestore = true;

		return () => data.subscription.unsubscribe();
	});

	function setCookie(cname: string, cvalue: boolean, exdays: number) {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	function getCookie(cname: string) {
		let name = cname + '=';
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}
</script>

<slot />
