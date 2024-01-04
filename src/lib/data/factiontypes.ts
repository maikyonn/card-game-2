export type PlayerFactionType =
	| WarriorFaction
	| FarmingFaction
	| ExplorationFaction
	| DiplomacyFaction;

type WarriorFaction = {
	name: string;
	id: number;
};

type FarmingFaction = {
	name: string;
	id: number;
};
type ExplorationFaction = {
	name: string;
	id: number;
};
type DiplomacyFaction = {
	name: string;
	id: number;
};

export const PlayerFactions: PlayerFactionType[] = [
	{
		name: 'Warrior Faction',
		id: 1
	},
	{
		name: 'Farming Faction',
		id: 2
	},
	{
		name: 'Exploration Faction',
		id: 3
	},
	{
		name: 'Diplomacy Faction',
		id: 4
	}
];
