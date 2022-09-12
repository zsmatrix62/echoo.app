import { useEffect, useState } from "react";

export function GetStorageValue<T>(key: string, defaultValue: T) {
	const saved = localStorage.getItem(key);
	if (!saved) {
		return defaultValue
	}
	try {
		const initial = JSON.parse(saved);
		//@ts-ignore
		Object.assign(defaultValue, initial)
		return initial || defaultValue;
	} catch (e) {
		return defaultValue
	}
}

export const useLocalStore = function <T>(key: string, defaultValue: T) {
	const [value, setValue] = useState<T>(GetStorageValue(key, defaultValue));

	function f(val: T) {
		localStorage.setItem(key, JSON.stringify(value))
		setValue(val)
	}

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, f]
}
