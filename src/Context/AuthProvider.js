import {useState, useContext, createContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({});
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({username: '', role: ''});
    const navigate = useNavigate();
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
                    let user = {
                        username: data.username,
                        role: data.role,
                        token: localStorage.getItem("token"),
                    };
                    setUser(user);
                });
        } else {
            // navigate("/login");
        }
    }, []);
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;