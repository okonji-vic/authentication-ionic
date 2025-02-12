import { useState } from "react";

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
    // Parse JSON if it exists, otherwise use default value
    const storedValue = localStorage.getItem(key);
    const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;

    const [value, setValue] = useState<T>(initialValue);

    const setAndStoreValue = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setAndStoreValue] as const;
};
