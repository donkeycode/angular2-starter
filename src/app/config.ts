let dev = process.env.ENV !== 'production';

let configDev = {
  baseApi: 'urlDevApi',
  client_id: 'clientIdDev',
  client_secret: 'clientSecretDev',
  files: 'clientFilesPath',
  googleAnalyticsId: 'googleapiid'
};

let configProd = {
  baseApi: 'urlProdApi',
  client_id: 'clientIdProd',
  client_secret: 'clientSecretProd',
  files: 'clientFilesPath',
  googleAnalyticsId: 'googleapiid'
};

export var config = dev ? configDev : configProd;
