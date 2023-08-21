interface Game {
	id?: Number;
	createdAt?: Date;
	name: String;
	description: String;
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
	action: String;
	description?: String;
}

interface Location {
	id?: Number;
	createdAt?: Date;
	name: String;
	games?: Game[];
}

interface GameType {
	id?: Number;
	createdAt?: Date;
	name: String;
	games?: Game[];
}

interface AgeCategory {
	id?: Number;
	createdAt?: Date;
	minAge: Number;
	maxAge: Number;
	name: String;
	games?: Game[];
}
