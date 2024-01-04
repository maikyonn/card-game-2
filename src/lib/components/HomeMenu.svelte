<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { getContext, onMount } from 'svelte';
	import { PlayerFactions, type PlayerFactionType } from '$lib/data/factiontypes';

	function createPlayer(n: string, type: PlayerFactionType) {
		let name = n;
		let faction_type = $state(type);
		let faction_name = $state(type.name);
		let money = $state(0);
		let victory_points = $state(0);

		return {
			get name() {
				return name;
			},
			get faction_type() {
				return faction_type;
			},
			get faction_name() {
				return faction_name;
			},
			get money() {
				return money;
			},
			get victory_points() {
				return victory_points;
			}
		};
	}

	let createdPlayers: any = $state([]);
	let globalstate: any;
	onMount(() => {
		if (localStorage.getItem('createdPlayers')) {
			createdPlayers = JSON.parse(localStorage.getItem('createdPlayers') as string);
		}
		globalstate = getContext('globalstate');
	});

	let playerNameInput = $state('Player');
	let selectedPlayerFactionInput: PlayerFactionType = $state(PlayerFactions[0]);

	function CreatePlayerHandler() {
		console.log('Creating player: ', playerNameInput, selectedPlayerFactionInput);
		createdPlayers.push(createPlayer(playerNameInput, selectedPlayerFactionInput));
		console.log(createdPlayers);

		localStorage.setItem('createdPlayers', JSON.stringify(createdPlayers));
	}
	function ClearPlayerHandler() {
		console.log('Clearing All Players: ');
		createdPlayers = [];
		console.log(createdPlayers);
		localStorage.setItem('createdPlayers', JSON.stringify(createdPlayers));
	}
	function StartGameHandler() {
		globalstate.setDisplayState(1);
	}
</script>

<div
	class="flex min-h-screen min-w-min flex-col items-center justify-center bg-center"
	style="background-image: url('https://cdn.discordapp.com/attachments/405602890804232213/1192237938415783946/load100.png?ex=65a8591b&is=6595e41b&hm=b81cdffa39a68179505a4bab52496da2808209ddfa99ce923460b58aab777468&'); background-size: cover;"
>
	<h1 class="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Start Game</h1>
	<div class="flex flex-row">
		<Card.Root class="w-[800px]">
			<Card.Header>
				<Card.Title>Create project</Card.Title>
				<Card.Description>Deploy your new project in one-click.</Card.Description>
			</Card.Header>
			<Card.Content>
				<form>
					<div class="grid w-full items-center gap-4">
						<div class="flex flex-col space-y-1.5">
							<Label for="name">Name</Label>
							<Input id="name" placeholder="Name of your project" bind:value={playerNameInput} />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="framework">Class</Label>
							<Select.Root
								onSelectedChange={(selected) => (selectedPlayerFactionInput = selected?.value as PlayerFactionType)}
							>
								<Select.Trigger id="framework">
									<Select.Value placeholder="Select" />
								</Select.Trigger>
								<Select.Content>
									{#each PlayerFactions as faction}
										<Select.Item value={faction} label={faction.name}>{faction.name}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
					</div>
				</form>
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Button variant="outline">Cancel</Button>
				<Button onclick={CreatePlayerHandler}
					>Deploy as {playerNameInput}, {selectedPlayerFactionInput.name}</Button
				>
			</Card.Footer>
		</Card.Root>
		<Card.Root class="ml-8 w-[300px]">
			<Card.Header>
				<Card.Title>Current Players</Card.Title>
				<Card.Description>Here are all the players you've added.</Card.Description>
			</Card.Header>
			<Card.Content>
				{#each createdPlayers as player}
					<p>{player.name} {player.faction_name}</p>
				{/each}
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Button variant="outline" onclick={ClearPlayerHandler}>Clear</Button>
				<Button onclick={StartGameHandler}>Start Game</Button>
			</Card.Footer>
		</Card.Root>
	</div>

	<Card.Root class="mt-8 w-[500px]">
		<Card.Header>
			<Card.Title>Resume Games:</Card.Title>
			<Card.Description>Deploy your new project in one-click.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="framework">Framework</Label>
						<!-- <Select.Root
							onSelectedChange={(selected) => (selectedPlayerFactionInput = selected?.label)}
						>
							<Select.Trigger id="framework">
								<Select.Value placeholder="Select" />
							</Select.Trigger>
							<Select.Content>
								{#each PlayerFactions as faction}
									<Select.Item value={faction.id} label={faction.name}>{faction.name}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root> -->
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex justify-between">
			<Button variant="outline">Cancel</Button>
			<Button onclick={CreatePlayerHandler}
				>Deploy as {playerNameInput}, {selectedPlayerFactionInput}</Button
			>
		</Card.Footer>
	</Card.Root>
</div>
