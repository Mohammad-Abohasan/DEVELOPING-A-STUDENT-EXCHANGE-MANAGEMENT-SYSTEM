import { createContext, useState } from "react";

export const RoleContext = createContext();

const RoleProvider = (props) => {
    const [role, setRole] = useState(null);

    const handlesSetRole = (newRole) => {
        setRole(newRole);
    }

    return (
        <RoleContext.Provider value={{ role, setRole: handlesSetRole }}>
            {props.children}
        </RoleContext.Provider>
    )
}

export default RoleProvider;