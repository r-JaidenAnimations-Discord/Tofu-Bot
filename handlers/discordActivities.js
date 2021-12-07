const Tantrum = require('#tantrum');
const fetch = require('node-fetch');

class DiscordActivities {
	constructor(client) {
		this.client = client;
	}

	/**
	 * App ID's
	 */
	get apps() {
		return {
			betrayal: '773336526917861400',
			youtube: '880218394199220334',
			youtubedev: '880218832743055411',
			poker: '755827207812677713',
			pokerdev: '763133495793942528',
			fishing: '814288819477020702',
			chess: '832012774040141894',
			chessdev: '832012586023256104',
			doodlecrew: '878067389634314250',
			lettertile: '879863686565621790',
			wordsnacks: '879863976006127627',
			awkword: '879863881349087252',
			spellcast: '852509694341283871',
			checkers: '832013003968348200',
			sketchyartist: '879864070101172255'
		};
	}

	/**
	 * Creates an app invite
	 * @param {String} vcID Channel to mount the activity to
	 * @param {String} option App to mount
	 * @returns {Promise<{ code: string; }>}
	 */
	async createAppInvite(vcID, option) {
		const returnData = {
			code: 'none',
		};
		if (option && this.apps[option.toLowerCase()]) {
			try {
				await fetch(
					`https://discord.com/api/v8/channels/${vcID}/invites`,
					{
						method: 'POST',
						body: JSON.stringify({
							max_age: 7200,
							max_uses: 0,
							target_application_id: this.apps[option],
							target_type: 2,
							temporary: false,
							validate: null,
						}),
						headers: {
							Authorization: `Bot ${this.client.token}`,
							'Content-Type': 'application/json',
						},
					}
				).then((res) => res.json())
					.then((invite) => {
						if (invite.error || !invite.code) throw new Error('An error occured while retrieving data!');
						if (Number(invite.code) === 50013) throw new Error('Permission error');
						returnData.code = `https://discord.com/invite/${invite.code}`;
					});
			} catch (e) {
				throw new Tantrum(client, e);
			}
			return returnData;
		} else {
			throw new SyntaxError('Invalid option');
		}
	}
}

module.exports = DiscordActivities;
