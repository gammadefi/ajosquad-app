import { useQuery } from "react-query";

const useFetchWithParams = (key: any, apiFunction: any, config: any) => {
	const fetchFunction = async ({ queryKey }: { queryKey: any }) => {
		// console.log(queryKey);
		const [, params] = queryKey;
		//  // Create a timeout promise that rejects after 5 seconds
		// const timeoutPromise = new Promise((_, reject) =>
		// setTimeout(() => reject(new Error("Request timed out")), 5000)
		// );
		//  // Race the API call against the timeout
		// 	const response = await Promise.race([
		// 	apiFunction(params),
		// 	timeoutPromise,
		// 	]);

		// console.log(params);
		// console.log(...Object.values(params));
		const response = await apiFunction(params);
		return response.data;
	};

	const data = useQuery(key, fetchFunction, config);

	// const data = useQuery([key, value], apiFunction, {
	// 	keepPreviousData: false,
	// 	refetchOnWindowFocus: false,
	// 	refetchOnMount: false,
	// });

	return data;
};

export default useFetchWithParams;
