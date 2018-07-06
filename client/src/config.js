const crossDomain = false;

export const server = 'http://127.0.0.1:9000'

export const ajaxCrossDomainSettings = crossDomain? { xhrFields: {withCredentials: true},crossDomain: true}:{}
