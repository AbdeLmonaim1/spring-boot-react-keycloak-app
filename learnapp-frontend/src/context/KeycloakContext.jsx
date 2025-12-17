import { createContext, useState, useEffect, useContext } from "react";
import keycloak from "../keycloak";

const KeycloakContext = createContext();

export const useKeycloak = () => useContext(KeycloakContext);

export const KeycloakProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize Keycloak
        keycloak
            .init({
                onLoad: "login-required",
                checkLoginIframe: false,
            })
            .then((auth) => {
                setAuthenticated(auth);
                if (auth) {
                    setCurrentUser(keycloak.tokenParsed);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Keycloak init failed", err);
                setLoading(false);
            });
    }, []);

    const login = () => keycloak.login();
    const logout = () => keycloak.logout();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <KeycloakContext.Provider
            value={{
                keycloak,
                authenticated,
                currentUser,
                login,
                logout,
                token: keycloak.token
            }}
        >
            {children}
        </KeycloakContext.Provider>
    );
};
