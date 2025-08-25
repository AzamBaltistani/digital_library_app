import type { ReactNode } from "react";
import { AuthProvider as Provider } from "./AuthContext";

interface Props {
    children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    return <Provider>{children}</Provider>;
};

export default AuthProvider;
