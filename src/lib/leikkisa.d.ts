interface Game {
	id?: Number;
	createdAt?: Date;
	name: string;
	description: string;
	instructions?: Instruction[];
	locationId: Number;
	locations: Location[];
	gameTypeId: Number;
	gameType: GameType;
	ageCategories: AgeCategory[];
}

interface Instruction {
	id?: Number;
	createdAt?: Date;
	game?: Game;
	gameId?: Number;
	order?: Number;
	action: string;
	description?: string;
}

interface Location {
	id?: Number;
	createdAt?: Date;
	name: string;
	games?: Game[];
}

interface GameType {
	id?: Number;
	createdAt?: Date;
	name: string;
	games?: Game[];
}

interface AgeCategory {
	id?: Number;
	createdAt?: Date;
	minAge: Number;
	maxAge: Number;
	name: string;
	games?: Game[];
}

interface Icon {
	name: string;
	paths: string[];
}
