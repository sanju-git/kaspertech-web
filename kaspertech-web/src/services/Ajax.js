import Env from "./../Env";
var serverURL = Env.serverURL;

function getHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": null,
  };
}

export default {
  get: function (url) {
    url = serverURL + url;
    return fetch(url, { method: "GET", headers: getHeaders() })
      .then(processResponse)
      .catch(processError);
  },
  post: function (url, data) {
    url = serverURL + url;
    return fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then(processResponse)
      .catch(processError);
  },
  delete: function (url) {
    url = serverURL + url;
    return fetch(url, { method: "DELETE", headers: getHeaders() })
      .then(processResponse)
      .catch(processError);
  },
  put: function (url, data) {
    url = serverURL + url;
    return fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then(processResponse)
      .catch(processError);
  },

  patch: function (url, data) {
    url = serverURL + url;
    return fetch(url, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then(processResponse)
      .catch(processError);
  },
};

function processResponse(response) {
  return response.json();
}

function processError(err) {
  console.log("server error");
}
