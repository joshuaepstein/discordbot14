const firstMessage = require('../helpers/FirstMessage');

module.exports = (client) => {
    const channelID = '1020452219625148426';

    const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName);
    const emojis = {
        tick: 'Verified',
        twitch: 'Twitch-Updates',
        Twitter: 'Twitter-Updates',
        YouTube: 'YouTube-Updates',
        bot: 'bot-updates'
    }
    const reactions = [];

    let emojiText = ":one: Follow Discord's Terms of Service \n:two:  Be respectful to others in the server especially the moderators\n:three:  Post content in the appropriate channels\n:four:  Anything inappropriate, racist or offensive is prohibited\n:five:  Ask for permission before messaging others in the server\n:six:  If you have any suggestions, you can either post general suggestions here: <#1020452229628579961> OR projects suggestions in the respective projects forum channel with the suggestion tag.\n:seven:  Help that is needed with development projects can be sent in the projects category in the respective forum category.\n\nAfter you have read through the rules, agree to them by clicking the <:tick:739905045843279872> emoji below\nIf you want to know when Josh Goes live, click the <:twitch:750800961638891610> reaction\nIf you want to know when Josh Tweets, click the <:Twitter:750803226420314282> reaction\nIf you want to know when Josh uploads a new YouTube video click the <:YouTube:750800961613856845> reaction below\nAnd Finally, if you want to get updates about the custom coded bot, click the <:bot:764958723990224907> reaction below!\n**If you would like to contact a moderator please create a ticket here: <#1020452229628579961>";
    for (const key in emojis) {
        const emoji = getEmoji(key);
        reactions.push(emoji);

        // const role = emojis[key];
        // emojiText += `${emoji} = ${role}\n`;
    }

    firstMessage(client, channelID, emojiText, reactions);

    const handleReaction = (reaction, user, add) => {
        if (user.id === '772442765468106752') {
            return;
        }

        const emoji = reaction._emoji.name;

        const { guild } = reaction.message;

        const roleName = emojis[emoji];
        if (!roleName) {
            return;
        }

        const role = guild.roles.cache.find((role) => role.name === roleName);
        const member = guild.members.cache.find((member) => member.id === user.id);

        if (add) {
            member.roles.add(role);
        } else {
            member.roles.remove(role);
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handleReaction(reaction, user, true);
        }
    });

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handleReaction(reaction, user, false);
        }
    });
}