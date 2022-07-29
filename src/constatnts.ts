const path = require("path");
const fs = require("fs");

/**
 * 設定ファイル読み込み
 * @returns 
 */
const readConfig = () => {
  const buff  = fs.readFileSync(path.resolve(process.cwd(), "./config.json"));
  const config = JSON.parse(buff.toString());
  return config;
}

const constatnts = (() => {
  const config = readConfig();
  const subdomain = config.subdomain;  
  return {
    URL: {
      BASE_URL: `https://${subdomain}.cybozu.com`,
      LOGIN: `https://${subdomain}.cybozu.com/login`,
    },
    AUTH: {
      USERNAME: config.authentication.username,
      PASSWORD: config.authentication.password,
    }
  }
})();

export default constatnts;