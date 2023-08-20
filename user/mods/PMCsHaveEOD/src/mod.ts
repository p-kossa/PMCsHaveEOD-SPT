import { DependencyContainer } from "tsyringe";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";

const modName = "PMCsHaveEOD";
let logger: ILogger;
let configServer: ConfigServer;
let botConfig: IBotConfig;


class Mod {
  preAkiLoad(container: DependencyContainer): void {
    const HttpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
    const staticRouterModService = container.resolve<StaticRouterModService>(
      "StaticRouterModService"
    );

    staticRouterModService.registerStaticRouter(
      `${modName}:/client/raid/configuration`,
      [
        {
          url: "/client/raid/configuration",
          action: (
            url: string,
            info: any,
            sessionID: string,
            output: string
          ): any => {

            try {
              const bots: IBotConfig = configServer.getConfig(
                ConfigTypes.BOT
              );

              logger.info(bots.pmc.accountTypeWeight)

              bots.pmc.gameVersionWeight["standard"] = 0
              bots.pmc.gameVersionWeight["left_behind"] = 0
              bots.pmc.gameVersionWeight["prepare_for_escape"] = 0
              bots.pmc.gameVersionWeight["edge_of_darkness"] = 100
          
              bots.pmc.accountTypeWeight["0"] = 0
              bots.pmc.accountTypeWeight["1"] = 0
              bots.pmc.accountTypeWeight["2"] = 100
              bots.pmc.accountTypeWeight["256"] = 0
              bots.pmc.accountTypeWeight["512"] = 0

              return HttpResponse.nullResponse();
            }
            catch (e) {
              logger.info(e)
              return HttpResponse.nullResponse();
            }
          }
        }
      ],
      "PMCsHaveEOD"
    );
  }

  postDBLoad(container: DependencyContainer): void {
    logger = container.resolve<ILogger>("WinstonLogger");
    configServer = container.resolve<ConfigServer>("ConfigServer");
    botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
  }
}



module.exports = { mod: new Mod() }
