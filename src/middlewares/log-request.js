function logRequest(req, res, next) {
  const apiKey = req.get("x-api-key");

  var info = {
    apiKey: apiKey,
    ip: req.ip,
    baseUrl: req.baseUrl,
    originalUrl: req.originalUrl,
    url: req.url,
    method: req.method,
    statusCode: req.statusCode,
    statusMessage: req.statusMessage,
    params: req.params,
  };

  console.log("\n==================", info, "==================");

  next();
}

module.exports = function () {
  return logRequest;
};
