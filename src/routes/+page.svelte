<script lang="ts">
	import Game from '$lib/components/Game.svelte';
	import HomeMenu from '$lib/components/HomeMenu.svelte';
	import { getContext, onMount, setContext } from 'svelte';

	enum DisplayState {
		Home,
		InGame,
		Loading
	}
	onMount(() => {
		global.setDisplayState(DisplayState.Home);
		setContext('globalstate', global);
	});

	function createGlobalState() {
		let display_state = $state(DisplayState.Loading);

		function setDisplayState(state: DisplayState) {
			display_state = state;
		}
		return {
			get display_state() {
				return display_state;
			},
			setDisplayState
		};
	}

	let global = createGlobalState();
</script>

{#if global.display_state == DisplayState.Loading}
	hi
{:else if global.display_state == DisplayState.InGame}
	<Game></Game>
{:else if global.display_state == DisplayState.Home}
	<HomeMenu></HomeMenu>
{/if}
