import { INavGroup } from "../models/IAppRole";
export const LIST_NAMES = {
    APPROVER_MASTERS: "ApproversMaster",
} as const;
export const NAV_CONFIG: INavGroup[] = [
    {
        key: "Admin",
        label: "Administration",
        icon: "fileEdit",
        allowedRoles: ["Admin"],
        items: [
            {
                key: "UserRole",
                label: "User Role",
                icon: "submittedDeclarations",
            },
            { key: "UserManagement", label: "User Management", icon: "itCalculator" },
            { key: "RequestType", label: "Request Type", icon: "itCalculator" },
            { key: "InsuranceCompanyDetails", label: "Insurance Company Details", icon: "itCalculator" },
        ],
    },
    {
        key: "BreakageReports",
        label: "BreakageReports",
        icon: "administration",
        allowedRoles: ["Admin"],
        items: [
            {
                key: "employeeDeclaration",
                label: "Employee Declarations",
                icon: "employeeDeclaration",
            }
        ],
    },
];
export const deploymentConfig = (_siteUrl: string): string => {

    let _rocaSiteUrl: string = "";

    if (window.location.origin == "https://chandrudemo.sharepoint.com") {
        _rocaSiteUrl = "https://chandrudemo.sharepoint.com/sites/Roca";
    } else if (window.location.origin == "https://rocasanitario.sharepoint.com") {
        if ((_siteUrl || "").toLowerCase().includes("rinrfwd")) {
            _rocaSiteUrl = "https://rocasanitario.sharepoint.com/sites/RBPPLWOW";
        } else {
            _rocaSiteUrl = "https://rocasanitario.sharepoint.com/sites/RINMASTERDEV";
        }
    }
    return _rocaSiteUrl;
};