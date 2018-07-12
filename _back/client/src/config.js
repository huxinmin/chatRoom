const crossDomain = false;

const serverHost = "http://127.0.0.1:9000";

export const server = crossDomain ?serverHost:window.location.origin;

export const ajaxCrossDomainSettings = crossDomain? { xhrFields: {withCredentials: true,},crossDomain: true,}:{};
