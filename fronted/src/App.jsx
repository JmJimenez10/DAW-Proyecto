import { Routes, Route, Navigate } from "react-router-dom";
import { MainApp } from "./modules/core/components/MainApp";
import { LoginScreen } from "./modules/login/LoginScreen";
import { ChangePasswordScreen } from "./modules/change-password/ChangePasswordScreen";
import { VerifyMailScreen } from "./modules/verify-mail/VerifyMailScreen";
import { Landing } from "./modules/landing/Landing";
import { ResetPassword } from "./modules/reset-password.jsx/ResetPassword";
import { useEffect } from "react";

function App() {
  const clearLocalStorage = () => {
    localStorage.removeItem("emailUser");
    localStorage.removeItem("dniUser");
    localStorage.removeItem("passwordUser");
    localStorage.removeItem("uuid");
    localStorage.removeItem("timestamp");
  };

  const checkLocalStorageExpiration = () => {
    const timestamp = localStorage.getItem("timestamp");
    if (timestamp) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - parseInt(timestamp, 10);
      const tenMinutes = 10 * 60 * 1000;

      if (timeElapsed > tenMinutes) {
        clearLocalStorage();
      }
    }
  };

  useEffect(() => {
    checkLocalStorageExpiration();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app/*" element={<MainApp />} />
        <Route path="/login" element={<LoginScreen />} />

        <Route path="/change" element={<ChangePasswordScreen />} />
        <Route path="/verify-mail" element={<VerifyMailScreen />} />
        <Route path={`/reset-password/${localStorage.getItem("uuid")}`} element={<ResetPassword />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
