const amqp = require("amqplib");

// RabbitMQ connection URL
const url = "amqp://guest:guest@localhost";

// Queue name
const queue = "nodequeue001";

async function receiveMessage() {
	try {
		// Connect to RabbitMQ server
		const connection = await amqp.connect(url);
		const channel = await connection.createChannel();

		// Declare the queue to use
		await channel.assertQueue(queue);

		// Receive message from the queue
		channel.consume(queue, (msg) => {
			console.log(`Received message: ${msg.content.toString()}`);

			// Acknowledge receipt of the message
			channel.ack(msg);
			console.log(`Waiting for messages on ${queue}...`);
		});
	} catch (error) {
		console.log(error);
	}
}

receiveMessage();
