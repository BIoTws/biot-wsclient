const Events = require('events');


const core = (socket) => {
	const eventsHandle = new Events();

	socket.on('message', (data) => {
		try {
			let stateData = JSON.parse(data);
			eventsHandle.emit(`coreEvent:${stateData.id}:${stateData.name}`, stateData.result);
		} catch (e) {
			console.error('parse error: ', e, ' || ', data);
		}
	});

	let id = 1;
	return {
		send: async (params) => {
			params['id'] = id += 1;

			return new Promise(resolve => {
				eventsHandle.on(`coreEvent:${id}:${params.name}`, (resource) => {
					return resolve(resource);
				});
				socket.send(JSON.stringify(params));
			});
		}
	};
};

module.exports = core;
