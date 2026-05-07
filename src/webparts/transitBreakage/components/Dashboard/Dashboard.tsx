import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppRole } from "../../../../shared/models/IAppRole";
import AppHeader from "../AppHeader/AppHeader";
import SideNav from "../SideNav/SideNav";


import styles from "./Dashboard.module.scss";
import UserRole from "../Screens/Admin/UserRole";



// ─── Props ────────────────────────────────────────────────────────────────────

export interface IDashboardProps {
  role: AppRole;
  userDisplayName: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Dashboard: React.FC<IDashboardProps> = ({ role }) => {
  React.useEffect(() => {

  }, []);
  const renderDashboardContent = (): React.ReactElement => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                role === "Admin"
                  ? "/UserRoles"
                  : "/submittedDeclarations"
              }
              replace
            />
          }
        />
        <Route
          path="/UserRoles"
          element={
            <UserRole />
          }
        />
      </Routes>
    );
  };

  return (
    <div className={styles.dashboard}>
      <AppHeader />
      <div className={styles.body}>
        <SideNav role={role} activeKey={"Admin"} />
        <main className={styles.content} id="mainContent">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
