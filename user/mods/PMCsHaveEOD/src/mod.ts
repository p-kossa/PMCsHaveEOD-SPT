import { DependencyContainer } from "tsyringe";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import config from "../config.json";

let logger: ILogger;
let configServer: ConfigServer;
let pmcConfig: IBotConfig;

class Mod {
  postDBLoad(container: DependencyContainer): void {
    logger = container.resolve<ILogger>("WinstonLogger");
    configServer = container.resolve<ConfigServer>("ConfigServer");
    pmcConfig = configServer.getConfig<IBotConfig>(ConfigTypes.PMC);

    const { gameVersionWeight } = config;
    pmcConfig.gameVersionWeight = gameVersionWeight;
  }
}

module.exports = { mod: new Mod() };
