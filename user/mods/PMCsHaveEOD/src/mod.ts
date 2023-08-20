import { DependencyContainer } from "tsyringe";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";

let logger: ILogger;
let configServer: ConfigServer;
let botConfig: IBotConfig;


class Mod {
  postDBLoad(container: DependencyContainer): void {
    logger = container.resolve<ILogger>("WinstonLogger");
    configServer = container.resolve<ConfigServer>("ConfigServer");
    botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);

    const bots: IBotConfig = configServer.getConfig(
      ConfigTypes.BOT
    );

    bots.pmc.gameVersionWeight = {
      "edge_of_darkness": 100
    }

    bots.pmc.accountTypeWeight = {
      "2": 100
    }
  }
}


module.exports = { mod: new Mod() }
