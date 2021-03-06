export function graphQlGet (query): Promise<any> {

    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        //xhr.responseType = 'json';
        xhr.open("GET", "http://" + location.hostname + ":4000/graphql?query="+encodeURIComponent(query.replace(/\n/g,"")), true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onload = function (e) {
            if (xhr.status != 200) {
                reject('Error ' + xhr.status + ': ' + xhr.statusText);
            } else {
                resolve(JSON.parse(e["tar" + "get"].responseText));
            }
        };

        xhr.send();

    });

}

export function graphQlPost (query): Promise<any> {

  return new Promise((resolve, reject) => {

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "http://" + location.hostname + ":4000/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function (e) {
      if (xhr.status != 200) {
        reject('Error ' + xhr.status + ': ' + xhr.statusText);
      } else {
        resolve(xhr.response.data.saveContent);
      }
    };

    xhr.send(JSON.stringify({query: query}));

  });

}

export function shortenAddress (address) {
  return !address ? "" : (address + "").slice(0, 12) + "..";
}
