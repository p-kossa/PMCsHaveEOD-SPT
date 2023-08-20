import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

let logger: ILogger;

class Mod {
	postDBLoad(container) {
    const bots: IBotConfig = configServer.getConfig(
      ConfigTypes.BOT
    );

    bots.pmc.gameVersionWeight["standard"] = 0
    bots.pmc.gameVersionWeight["left_behind"] = 0
    bots.pmc.gameVersionWeight["prepare_for_escape"] = 0
    bots.pmc.gameVersionWeight["edge_of_darkness"] = 100

		bots.pmc.accountTypeWeight["0"] = 0
		bots.pmc.accountTypeWeight["1"] = 0
		bots.pmc.accountTypeWeight["2"] = 100
		bots.pmc.accountTypeWeight["256"] = 0
		bots.pmc.accountTypeWeight["512"] = 0

    logger.info("PMCsHaveEOD: Values updated, all PMCs should have EOD now")
	}
}


module.exports = { mod: new Mod() }
