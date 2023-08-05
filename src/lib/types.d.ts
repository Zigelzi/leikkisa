interface Game {
	id?: number;
	createdAt?: Date;
	name: string;
	description: string;
	instructions?: Instruction[];
}

interface Instruction {
	id?: number;
	createdAt?: Date;
	game?: Game;
	gameId?: number;
	order?: number;
	content: string;
}
