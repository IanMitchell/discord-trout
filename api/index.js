const {
	InteractionResponseType,
	InteractionType,
	verifyKey,
} = require("discord-interactions");
const getRawBody = require("raw-body");

const SLAP_COMMAND = {
	name: "slap",
	description: "Sometimes you gotta slap a person with a large trout",
	options: [
		{
			name: "user",
			description: "The user to slap",
			type: 6,
			required: true,
		},
	],
	contexts: [0, 1, 2],
	integration_types: [0, 1],
};

const INVITE_COMMAND = {
	name: "invite",
	description: "Get an invite link to add the bot",
	contexts: [0, 1, 2],
	integration_types: [0, 1],
};

const SUPPORT_COMMAND = {
	name: "support",
	description: "Like this bot? Support me!",
	contexts: [0, 1, 2],
	integration_types: [0, 1],
};

const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${process.env.APPLICATION_ID}`;

/**
 * Gotta see someone 'bout a trout
 * @param {VercelRequest} request
 * @param {VercelResponse} response
 */
module.exports = async (request, response) => {
	if (request.method === "POST") {
		try {
			const signature = request.headers["x-signature-ed25519"];
			const timestamp = request.headers["x-signature-timestamp"];
			const rawBody = await getRawBody(request);

			const isValidRequest = await verifyKey(
				rawBody,
				signature,
				timestamp,
				process.env.PUBLIC_KEY
			);

			if (!isValidRequest) {
				console.error("Invalid Request");
				return response.status(401).send({ error: "Bad request signature" });
			}

			const command = JSON.parse(rawBody);

			if (command.type === InteractionType.PING) {
				console.log("Handling Ping request");
				response.send({
					type: InteractionResponseType.PONG,
				});
			} else if (command.type === InteractionType.APPLICATION_COMMAND) {
				switch (command.data.name.toLowerCase()) {
					case SLAP_COMMAND.name.toLowerCase():
						response.status(200).send({
							type: 4,
							data: {
								content: `*<@${command.user?.id || command.member?.user?.id}> slaps <@${command.data.options[0].value}> around a bit with a large trout*`,
							},
						});
						console.log("Slap Request");
						break;
					case INVITE_COMMAND.name.toLowerCase():
						response.status(200).send({
							type: 4,
							data: {
								content: INVITE_URL,
								flags: 64,
							},
						});
						console.log("Invite request");
						break;
					case SUPPORT_COMMAND.name.toLowerCase():
						response.status(200).send({
							type: 4,
							data: {
								content:
									"Thanks for using my bot! Let me know what you think on twitter (@IanMitchel1). If you'd like to contribute to hosting costs, you can donate at https://github.com/sponsors/ianmitchell",
								flags: 64,
							},
						});
						console.log("Support request");
						break;
					default:
						console.error("Unknown Command");
						response.status(400).send({ error: "Unknown Command" });
						break;
				}
			} else {
				console.error("Unknown Type");
				response.status(400).send({ error: "Unknown Type" });
			}
		} catch (error) {
			console.error("Error handling request", error);
			response.status(500).send({ error: "Internal Server Error" });
		}
	} else {
		response.status(405).send({ error: "Method Not Allowed" });
	}
};
