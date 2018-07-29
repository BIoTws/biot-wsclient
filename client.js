const wsclient = require('./core');
const ws = require('ws');


function Start() {
	let client = new ws('ws://127.0.0.1:3303');

	client.on('open', async () => {
		let stream = wsclient(client);

		let wallets = await stream.send({
			name: 'getMyDeviceWallets', args: []
		});
		console.log('wallets:', wallets);

		let balance = await stream.send({
			name: 'getWalletBalance', args: [wallets[0]]
		});
		console.log('balance:', balance);
	});

}

Start();