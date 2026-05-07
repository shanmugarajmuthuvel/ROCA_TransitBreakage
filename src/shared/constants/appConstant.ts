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
        key: "Application Menu",
        label: "Application Menu",
        icon: "fileEdit",
        allowedRoles: ["Initiator"],
        items: [
            {
                key: "New Breakage Claim",
                label: "New Breakage Claim",
                icon: "submittedDeclarations",
            },
            { key: "All Request", label: "All Request", icon: "itCalculator" },
            { key: "Rework Request", label: "Rework Request", icon: "itCalculator" },

        ],
    },
    {
        key: "Application Menu",
        label: "Application Menu",
        icon: "fileEdit",
        allowedRoles: ["LogisticManager"],
        items: [
            {
                key: "All Request",
                label: "All Request",
                icon: "submittedD",
            },
            { key: "Pending Approval", label: "Pending Approval", icon: "itCalculator" },
            { key: "Process Approval", label: "Process Approval", icon: "itCalculator" },

        ],
    },
    {
        key: "Application Menu",
        label: "Application Menu",
        icon: "fileEdit",
        allowedRoles: ["InsuranceChecker"],
        items: [
            {
                key: "All Request",
                label: "All Request",
                icon: "submittedD",
            },
            {
                key: "Awaiting for Approval",
                label: "Awaiting for Approval",
                icon: "submittedD",
            },
            { key: "Monthly Summary Claim Form", label: "Monthly Summary Claim Form", icon: "itCalculator" },
            { key: "All Summary Claims", label: "All Summary Claims", icon: "itCalculator" },

        ],
    },
    {
        key: "Application Menu",
        label: "Application Menu",
        icon: "fileEdit",
        allowedRoles: ["TaxationHead"],
        items: [
            {
                key: "Awaiting Approval",
                label: "Awaiting Approval",
                icon: "submittedD",
            },
            {
                key: "All Summary Claims",
                label: "All Summary Claims",
                icon: "submittedD",
            }


        ],
    },
    {
        key: "Application Menu",
        label: "Application Menu",
        icon: "fileEdit",
        allowedRoles: ["StockWriteOff"],
        items: [
            {
                key: "Awaiting Approval",
                label: "Awaiting Approval",
                icon: "submittedD",
            },
            {
                key: "All Summary Claims",
                label: "All Summary Claims",
                icon: "submittedD",
            }


        ],
    },
    {
        key: "BreakageReports",
        label: "BreakageReports",
        icon: "administration",
        allowedRoles: ["Initiator", "InsuranceChecker", "TaxationHead", "StockWriteOff"],
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