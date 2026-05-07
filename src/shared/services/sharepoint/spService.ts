import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI } from '@pnp/sp';
import { SPFx } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { deploymentConfig, LIST_NAMES } from '../../constants/appConstant';
let _ctx: WebPartContext;
let sp: SPFI;
export const initPnP = (context: WebPartContext): void => {
    _ctx = context;
    sp = spfi().using(SPFx(context));
};
export const getSP = (): SPFI => {
    if (!sp) {
        throw new Error(
            "[pnpService] PnP has not been initialised. Call initPnP(context) in onInit().",
        );
    }
    return sp;
};
export const getAllItems = async <T>(
    listName: string,
    select?: string[],
    expand?: string,
    orderBy?: string,
    ascending = true,
    filter?: string,
): Promise<T[]> => {
    try {
        const sp = getSP();
        let query: any = sp.web.lists.getByTitle(listName).items;

        if (select && select.length > 0) {
            query = query.select("*", ...select);
        }

        if (expand) {
            query = query.expand(expand);
        }

        if (filter) {
            query = query.filter(filter);
        }

        if (orderBy) {
            query = query.orderBy(orderBy, ascending);
        }

        return await query.getAll();
    } catch (err) {

        return [];
    }
};
export const getItemById = async <T>(
    listName: string,
    id: number,
    select?: string[],
): Promise<T> => {
    const sp = getSP();
    const item = sp.web.lists.getByTitle(listName).items.getById(id);

    if (select?.length) {
        return item.select(...select)<T>();
    }
    return item<T>();
};
export const addItem = async (
    listName: string,
    data: Record<string, unknown>,
): Promise<{ data: { Id: number } }> => {
    const sp = getSP();
    return sp.web.lists.getByTitle(listName).items.add(data);
};
export const updateItem = async (
    listName: string,
    id: number,
    data: Record<string, unknown>,
): Promise<void> => {
    const sp = getSP();
    await sp.web.lists.getByTitle(listName).items.getById(id).update(data);
};
export const deleteItem = async (
    listName: string,
    id: number,
): Promise<void> => {
    const sp = getSP();
    await sp.web.lists.getByTitle(listName).items.getById(id).recycle();
};
export interface ICurrentUser {
    Id: number;
    Title: string;
    Email: string;
    LoginName: string;
}


export const getCurrentUser = async (): Promise<ICurrentUser> => {
    const sp = getSP();
    return sp.web.currentUser.select(
        "Id",
        "Title",
        "Email",
        "LoginName",
    )<ICurrentUser>();
};

export const getCurrentUserGroups = async (): Promise<any[]> => {
    const sp = getSP();
    return sp.web.currentUser.groups();
};



export const getSiteOwnersGroup = async (): Promise<any> => {
    const sp = getSP();
    return sp.web.associatedOwnerGroup();
};

export const getGroupByName = async (groupName: string): Promise<any> => {
    const sp = getSP();
    return sp.web.siteGroups.getByName(groupName)();
};


export const getGroupUsersByName = async (
    groupName: string,
): Promise<any[]> => {
    const sp = getSP();
    try {
        return await sp.web.siteGroups.getByName(groupName).users();
    } catch (err) {
        // await handleError(err, `Fetching users for group ${groupName}`);
        return [];
    }
};

export const getSiteMembersGroup = async (): Promise<any> => {
    const sp = getSP();
    return sp.web.associatedMemberGroup();
};


export const uploadFileToLibrary = async (
    libraryName: string,
    fileName: string,
    fileContent: File,
): Promise<void> => {
    const sp = getSP();
    try {
        // Add the file, using { Overwrite: true } so duplicate files are overwritten
        await sp.web
            .getFolderByServerRelativePath(libraryName)
            .files.addUsingPath(fileName, fileContent, { Overwrite: true });
    } catch (err) {
        // await handleError(err, `Uploading file to ${libraryName}`);
        throw err;
    }
};
export const getLatestFileUrl = async (
    libraryName: string,
    currentYear: string,
): Promise<string | null> => {
    const sp = getSP();
    try {
        const files = await sp.web.lists
            .getByTitle(libraryName)
            .items.orderBy("ID", false)
            .top(1)
            .select("ID", "FileLeafRef", "FileRef")
            .filter(`IsDelete ne 1 and FinanceYear eq '${currentYear}'`)();

        if (files.length > 0) {
            return files[0].FileRef;
        }
        return null;
    } catch (err) {
        // await handleError(err, `Fetching latest file from ${libraryName}`);
        throw err;
    }
};
export const uploadFileWithMetadata = async (
    libraryName: string,
    fileName: string,
    fileContent: File,
    metadata: Record<string, any>,
): Promise<void> => {
    const sp = getSP();
    try {
        await sp.web
            .getFolderByServerRelativePath(libraryName)
            .files.addUsingPath(fileName, fileContent, { Overwrite: true });

        const file = sp.web
            .getFolderByServerRelativePath(libraryName)
            .files.getByUrl(fileName);

        const item = await file.getItem();
        await item.update(metadata);
    } catch (err) {
        // await handleError(err, `Uploading file with metadata to ${libraryName}`);
        throw err;
    }

};
export const getLibraryFilesWithMetadata = async (
    libraryName: string,
    selectFields: string[] = [
        "ID",
        "FileLeafRef",
        "FileRef",
        "FinanceYear",
        "Created",
    ],
): Promise<any[]> => {
    const sp = getSP();
    try {
        return await sp.web.lists
            .getByTitle(libraryName)
            .items.select(...selectFields)
            .filter("IsDelete ne 1")
            .orderBy("ID", false)
            .top(5000)();
    } catch (err) {
        // await handleError(err, `Fetching files with metadata from ${libraryName}`);
        return [];
    }
};
export const getEmployeeMasterUsers = async (
    currentSiteUrl: string,
): Promise<any[]> => {
    try {
        if (!_ctx) {
            throw new Error("PnP context not initialised. Call initPnP() first.");
        }
        const masterSiteUrl = deploymentConfig(currentSiteUrl);
        const remoteSp = masterSiteUrl
            ? spfi(masterSiteUrl).using(SPFx(_ctx))
            : getSP();
        const items: any[] = await remoteSp.web.lists
            .getByTitle(LIST_NAMES.APPROVER_MASTERS)
            .items
            .select("*", "Role/Title", "Users/Title", "Users/EMail", "Users/Id", "System/Title")
            .expand("Role", "Users", "System")
            .top(5000)();

        return items;
    } catch (err) {
        console.log(err)

        return [];
    }
};