import {
	InteractionResponseType,
	InteractionType,
} from "discord-api-types/v10";
import { isValidRequest } from "discord-verify/node";
import {
	INVITE_COMMAND,
	SLAP_COMMAND,
	SLAP_COMMAND_CONTEXT_MENU,
	SUPPORT_COMMAND,
} from "../commands";

const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${process.env.APPLICATION_ID}`;

function handle(command: any) {
	switch (command.data.name) {
		case SLAP_COMMAND.name: {
			console.log("Slap Request");
			return Response.json({
				type: 4,
				data: {
					content: `*<@${
						command.user?.id || command.member?.user?.id
					}> slaps <@${
						command.data.options[0].value
					}> around a bit with a large trout*`,
				},
			});
		}

		case SLAP_COMMAND_CONTEXT_MENU.name: {
			console.log("Slap Request");
			return Response.json({
				type: 4,
				data: {
					content: `*<@${
						command.user?.id || command.member?.user?.id
					}> slaps <@${
						command.data.target_id
					}> around a bit with a large trout*`,
				},
			});
		}

		case INVITE_COMMAND.name: {
			console.log("Invite request");
			return Response.json({
				type: 4,
				data: {
					content: INVITE_URL,
					flags: 64,
				},
			});
		}

		case SUPPORT_COMMAND.name: {
			console.log("Support request");
			return Response.json({
				type: 4,
				data: {
					content:
						"Thanks for using my bot! Let me know what you think on twitter (@IanMitchel1). If you'd like to contribute to hosting costs, you can donate at https://github.com/sponsors/ianmitchell",
					flags: 64,
				},
			});
		}

		default: {
			console.error("Unknown Command");
			return Response.json({ error: "Unknown Command" }, { status: 400 });
		}
	}
}

// Gotta see someone 'bout a trout
export async function POST(request: Request) {
	if (!process.env.PUBLIC_KEY) {
		throw new Error("No public key found");
	}

	try {
		const isValid = await isValidRequest(request, process.env.PUBLIC_KEY);

		if (!isValid) {
			console.error("Invalid Request");
			return Response.json({ error: "Bad request signature" }, { status: 401 });
		}

		const body = await request.json();
		const command = JSON.parse(body);

		switch (command.type) {
			case InteractionType.Ping: {
				console.log("Handling Ping request");
				return Response.json({
					type: InteractionResponseType.Pong,
				});
			}

			case InteractionType.ApplicationCommand: {
				return handle(command);
			}

			default: {
				console.error("Unknown Type");
				return Response.json({ error: "Unknown Type" }, { status: 400 });
			}
		}
	} catch (error) {
		console.error("Error handling request", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
