import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientV3 } from "@microsoft/sp-http-msgraph";

export class GraphService {
  private _context: WebPartContext;

  constructor(context: WebPartContext) {
    this._context = context;
  }

  public async getClient(): Promise<MSGraphClientV3> {
    return this._context.msGraphClientFactory.getClient("3");
  }
}
