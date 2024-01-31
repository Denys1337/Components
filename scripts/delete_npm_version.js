/* eslint-disable no-console */
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const { getValueFromArgv } = require('./getValueFromArgv');

const package_name = getValueFromArgv('package');
const version = getValueFromArgv('version');
const username = getValueFromArgv('user');
const password = getValueFromArgv('pw');

if (!package_name) {
  throw 'missing arg package_name';
}
if (!version) {
  throw 'missing arg version';
}
if (!username) {
  throw 'missing arg username';
}
if (!password) {
  throw 'missing arg password';
}

function searchItem(version) {
  var searchItemURL = `https://nexus.agritask.xyz/service/rest/v1/search/assets?name=${package_name}&version=${version}`;
  const request = new XMLHttpRequest();
  request.open('GET', searchItemURL, true, username, password);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      const jsonRes = JSON.parse(request.responseText);
      if (jsonRes.items.length === 1) {
        deleteItem(jsonRes.items[0].id, version);
      }
    }
  };
  request.send();
}

function deleteItem(itemId, version) {
  console.log('deleting', itemId, `(${version})`);
  const request = new XMLHttpRequest();
  const url = `https://nexus.agritask.xyz/service/rest/v1/assets/${itemId}`;
  request.open('DELETE', url, true, username, password);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status >= 200 && this.status < 300) {
      console.log(`version ${version} as been deleted`);
    }
  };

  request.send();
}

searchItem(version);
