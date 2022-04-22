import {useState, createContext, useEffect} from "react";

    const AuthContext = createContext({});
    export const AuthProvider = ({children}) => {
        const [user, setUser] = useState({role: '', token:''});
        useEffect(() => {
            if (localStorage.getItem("token")) {
                fetch("http://localhost:8000/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("token"),
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (!data.err) {
                            let user = {
                                role: data.role,
                                token: localStorage.getItem("token"),
                            };
                            setUser(user);
                        } else {
                            localStorage.removeItem("token")
                        }
                    })
            }
        }, []);
        return (
            <AuthContext.Provider value={{user, setUser}}>
                {children}
            </AuthContext.Provider>
        )
    }
    export default AuthContext;