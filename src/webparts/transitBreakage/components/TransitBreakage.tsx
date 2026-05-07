import * as React from "react";
import { HashRouter } from "react-router-dom";
import type { ITransitBreakageProps } from "./ITransitBreakageProps";
// import styles from "./TransitBreakage.module.scss";
import { useEffect, useState } from "react";
import { getEmployeeMasterUsers } from "../../../shared/services/sharepoint/spService";
import { ErrorBoundary } from "../../../shared/components/ErrorBoundary";
import Dashboard from "./Dashboard/Dashboard";
import '../../../shared/Asset/Styles/style.css'
import '../../../shared/Asset/Styles/primeicon.css'
import { Loader } from "../../../shared/components/Loader";
import { useDispatch } from "react-redux";
import { setUserRole } from "../Slice/Slice";
export const SPWebPartContext = React.createContext<any>(null);
const TransitBreakage: React.FC<ITransitBreakageProps> = ({ context }) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false)
  const [userRole, setCurrentUserRole] = useState<any>("")
  const UserRole = async () => {
    setisLoading(true)
    try {
      let siteurl = context.pageContext.web.absoluteUrl;
      const users = await getEmployeeMasterUsers(siteurl);
      let CurrentUserEmail = context.pageContext.user.email;
      let CurrentUser = users.filter((user: any) => {
        if (user?.System?.Title === "Transit Breakage") {
          if (user.Users && Array.isArray(user.Users)) {
            return user.Users.some((u: any) => u.EMail?.toLowerCase() === CurrentUserEmail?.toLowerCase());
          } else if (user.Users) {
            return user.Users.EMail?.toLowerCase() === CurrentUserEmail?.toLowerCase();
          }
          return false;
        }
        return false;
      });
      debugger
      setCurrentUserRole(CurrentUser[0]?.Role?.Title)
      dispatch(setUserRole(CurrentUser[0]?.Role?.Title))
      setisLoading(false)
    }
    catch (error) {
      console.error("Error fetching Approver Masters:", error);
    }
  }
  useEffect(() => {
    UserRole()
  }, []);
  if (isLoading) {
    return <Loader label="Loading..." />;
  }
  return (
    <SPWebPartContext.Provider value={context}>
      <ErrorBoundary>
        <HashRouter>
          <Dashboard
            role={userRole}
            userDisplayName="Shanmugaraj"
          />
        </HashRouter>
      </ErrorBoundary>
    </SPWebPartContext.Provider>
  );
};

export default TransitBreakage;
