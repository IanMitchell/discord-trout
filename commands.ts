import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ApplicationIntegrationType,
	InteractionContextType,
} from "discord-api-types/v10";

export const SLAP_COMMAND = {
	name: "slap",
	type: ApplicationCommandType.ChatInput,
	description: "Sometimes you gotta slap a person with a large trout",
	options: [
		{
			name: "user",
			description: "The user to slap",
			type: ApplicationCommandOptionType.User,
			required: true,
		},
	],
	contexts: [
		InteractionContextType.Guild,
		InteractionContextType.BotDM,
		InteractionContextType.PrivateChannel,
	],
	integration_types: [
		ApplicationIntegrationType.GuildInstall,
		ApplicationIntegrationType.UserInstall,
	],
};

export const SLAP_COMMAND_CONTEXT_MENU = {
	name: "Slap",
	type: ApplicationCommandType.User,
	contexts: [
		InteractionContextType.Guild,
		InteractionContextType.BotDM,
		InteractionContextType.PrivateChannel,
	],
	integration_types: [
		ApplicationIntegrationType.GuildInstall,
		ApplicationIntegrationType.UserInstall,
	],
};

export const INVITE_COMMAND = {
	name: "invite",
	type: ApplicationCommandType.ChatInput,
	description: "Get an invite link to add the bot",
	contexts: [
		InteractionContextType.Guild,
		InteractionContextType.BotDM,
		InteractionContextType.PrivateChannel,
	],
	integration_types: [
		ApplicationIntegrationType.GuildInstall,
		ApplicationIntegrationType.UserInstall,
	],
};

export const SUPPORT_COMMAND = {
	name: "support",
	type: ApplicationCommandType.ChatInput,
	description: "Like this bot? Support me!",
	contexts: [
		InteractionContextType.Guild,
		InteractionContextType.BotDM,
		InteractionContextType.PrivateChannel,
	],
	integration_types: [
		ApplicationIntegrationType.GuildInstall,
		ApplicationIntegrationType.UserInstall,
	],
};
