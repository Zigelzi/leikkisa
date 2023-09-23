interface Events {
	[object: string]: EventObject;
}

interface EventObject {
	name: string;
	actions: EventActions;
}

interface EventActions {
	[action: string]: string;
}

const events: Events = {
	game: {
		name: 'game',
		actions: {
			viewed: 'viewed',
			created: 'created',
			browsed: 'browsed',
			returnedFrom: 'returned from'
		}
	},
	gameList: {
		name: 'game list',
		actions: {
			navigated: 'navigated'
		}
	},
	gameType: {
		name: 'game type',
		actions: {
			selected: 'selected'
		}
	},
	ageCategory: {
		name: 'age category',
		actions: {
			selected: 'selected'
		}
	},
	instruction: {
		name: 'instruction',
		actions: {
			addingStarted: 'adding started',
			added: 'added',
			viewed: 'viewed',
			returnedFrom: 'returned from'
		}
	}
};

export default events;
