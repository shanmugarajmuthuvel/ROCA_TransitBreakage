import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ListService } from "./sharepoint/ListService";
import { GraphService } from "./graph/GraphService";

export class ServiceLocator {
  private static _listService: ListService;
  private static _graphService: GraphService;

  public static init(context: WebPartContext): void {
    this._listService = new ListService(context);
    this._graphService = new GraphService(context);
  }

  public static get listService(): ListService {
    if (!this._listService) throw new Error("ServiceLocator not initialised. Call init() first.");
    return this._listService;
  }

  public static get graphService(): GraphService {
    if (!this._graphService) throw new Error("ServiceLocator not initialised. Call init() first.");
    return this._graphService;
  }
}
