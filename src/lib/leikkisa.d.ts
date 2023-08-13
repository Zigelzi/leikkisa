interface Game {
	id?: number;
	createdAt?: Date;
	name: string;
	description: string;
	instructions?: Instruction[];
	locations: Location[];
	locationId: Number;
	gameType: GameType;
	gameTypeId: Number;
}

interface Instruction {
	id?: number;
	createdAt?: Date;
	game?: Game;
	gameId?: number;
	order?: number;
	action: string;
	description?: string;
}

interface Location {
	id?: number;
	createdAt?: Date;
	name: String;
	games?: Game[];
}

interface GameType {
	id?;
	createdAt?;
	name;
	games?;
}
