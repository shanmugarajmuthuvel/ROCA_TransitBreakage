import { BaseService } from "../base/BaseService";

export class ListService extends BaseService {
  public async getItems<T>(listName: string, select?: string[]): Promise<T[]> {
    let query = this.sp.web.lists.getByTitle(listName).items;
    if (select) query = query.select(...select) as typeof query;
    return query<T[]>();
  }

  public async createItem<T>(listName: string, data: Partial<T>): Promise<{ Id: number }> {
    return this.sp.web.lists.getByTitle(listName).items.add(data);
  }

  public async updateItem<T>(listName: string, id: number, data: Partial<T>): Promise<void> {
    return this.sp.web.lists.getByTitle(listName).items.getById(id).update(data);
  }

  public async deleteItem(listName: string, id: number): Promise<void> {
    return this.sp.web.lists.getByTitle(listName).items.getById(id).delete();
  }
}
