import { APIResult } from "./types";

const useApi = () => {
    function makeRequest(): APIResult {
        console.log('request is made');
        return {
            code: 200,
            message: 'All is good!'
        }
    };

    return {
        makeRequest
    };
};


export { useApi };