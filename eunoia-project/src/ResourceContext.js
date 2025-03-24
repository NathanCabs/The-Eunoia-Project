import React, { createContext, useState } from "react";
import resourceData from "./ResourceList"; // Import initial resources

export const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
    const [resourceList, setResourceList] = useState(resourceData);

    const addResource = (newResource) => {
        setResourceList([...resourceList, newResource]);
    };

    const editResource = (index, updatedResource) => {
        const updatedResources = [...resourceList];
        updatedResources[index] = updatedResource;
        setResourceList(updatedResources);
    };

    const deleteResource = (index) => {
        setResourceList(resourceList.filter((_, i) => i !== index));
    };

    return (
        <ResourceContext.Provider value={{ resourceList, addResource, editResource, deleteResource }}>
            {children}
        </ResourceContext.Provider>
    );
};
