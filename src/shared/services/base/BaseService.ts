import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI, spfi } from "@pnp/sp";
import { SPFx } from "@pnp/sp/presets/all";

export abstract class BaseService {
  protected readonly sp: SPFI;
  protected readonly context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
    this.sp = spfi().using(SPFx(context));
  }
}
