
import AppConfig from './config'

function buildFormError(json) {
	const errorMessage = json.error ? json.error : "unknown error";
	return {
		error: errorMessage
	}
}

function buildResponseProcessingError(message) {
	return {
		_error: message,
	}
}


const BOARD_API_URL = AppConfig.TTR_URL;

class BoardAPI {
	static sleep (time) {
	  return new Promise((resolve) => setTimeout(resolve, time));
	}

	static headers() {
		return {
			'Content-Type': 'application/json',
		}
	}

    static get(route) {
		return this.xhr(route, null, 'GET');
	}

	static put(route, params) {
		return this.xhr(route, params, 'PUT')
	}

	static post(route, params) {
		return this.xhr(route, params, 'POST')
	}

	static delete(route, params) {
		return this.xhr(route, params, 'DELETE')
	}

	static xhr(route, params, verb) {
		const host = BOARD_API_URL;
		const url = `${host}${route}`
		let options = Object.assign({
			method: verb,
			// credentials: 'include'
		}, params ? {
			body: JSON.stringify(params)
		} : null);
        options.headers = BoardAPI.headers()
			return fetch(url, options).then(
	            (resp) => {
					if (resp.ok) {
						return resp.json();
					} else {
						return resp.json().then(
							(json)=>{
								throw buildFormError(json)
							},
							(err) => {
								throw buildResponseProcessingError("Error processing signup response")
							}
						)
					}
				},
				(err) => {
					console.log("error is", err);
					throw err;
				}
			)
	}
}



export default BoardAPI;
