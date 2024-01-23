import { useAuth } from "contexts/AuthProvider";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }: { children: ReactNode }): JSX.Element {
  const authContext = useAuth();

  if (authContext?.user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
}

export default RequireAuth;
