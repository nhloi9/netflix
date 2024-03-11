import EventEmitter from 'events';
export const eventEmitter = new EventEmitter();

eventEmitter.on('test', () => {
	for (let i = 0; i < 100; i++) {
		console.log(i);
	}
});

eventEmitter.on('test', () => {
	for (let i = 0; i < 100; i++) {
		console.log(i);
	}
});
