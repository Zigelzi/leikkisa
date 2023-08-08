interface Game {
	id?: number;
	createdAt?: Date;
	name: string;
	description: string;
	instructions?: Instruction[];
	locations?: Location[] | number;
}

interface Instruction {
	id?: number;
	createdAt?: Date;
	game?: Game;
	gameId?: number;
	order?: number;
	content: string;
}

interface Location {
	id?: number;
	createdAt?: Date;
	name: String;
	games?: Game[];
}
