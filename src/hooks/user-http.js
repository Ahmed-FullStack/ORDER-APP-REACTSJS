import { useState, useCallback } from 'react';

export default function useHttp() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const sendRequest = useCallback(async (configRequest, transformData) => {
		setLoading(true);
		try {
			const requestResponse = await fetch(configRequest.url, {
				method: configRequest.method ? configRequest.method : 'GET',
				body: configRequest.body && JSON.stringify(configRequest.body),
				headers: configRequest.headers && configRequest.headers,
			});
			const requestData = await requestResponse.json();

			setLoading(false);
			setError(false);
			transformData?.(requestData);
		} catch {
			setError(true);
			setLoading(false);
		}
	}, []);

	return { loading, error, sendRequest };
}
