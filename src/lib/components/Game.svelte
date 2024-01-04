<script lang="ts">
	import { getContext, onMount } from 'svelte';
	class GameSnapshot {
		action: number;
		turn: number;
		round: number;
		phase: number;

		constructor(action = 0, turn = 0, round = 0, phase = 0) {
			this.action = action;
			this.turn = turn;
			this.round = round;
			this.phase = phase;
		}

		clone() {
			let clone = new GameSnapshot(this.action, this.turn, this.round, this.phase);
			return clone;
		}

		nextAction() {
			this.action++;
			return this;
		}
	}

	let globalstate: any;
	let snapshotHistory: any = $state([new GameSnapshot()]);
	let currentSnapshot = $derived(snapshotHistory.slice(-1)[0]);
	$inspect(snapshotHistory);

	onMount(() => {
		console.log('Mounting');
		globalstate = getContext('globalstate');
	});

	function action() {
		let clone = currentSnapshot.clone();
		clone.nextAction();
		snapshotHistory.push(clone);
		localStorage.setItem('ShapshotHistory', snapshotHistory);
	}

	function undo() {
		if (snapshotHistory.length <= 1) {
			return;
		}
		snapshotHistory.pop();
	}
</script>

{currentSnapshot.action}
<button onclick={action}>Next Turn</button>
<button onclick={undo}>Undo</button>
