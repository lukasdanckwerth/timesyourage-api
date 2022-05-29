// Holds the api key.
let token;

function checkApiKey(req, res, next) {
  const apiKey = req.get("x-api-key");

  if (!apiKey) {
    res.json({ error: "Missing api key." });
    res.end();
  } else if (apiKey === token) {
    next();
  } else {
    res.json({ error: "Invalid api key." });
    res.end();
  }
}

module.exports = function (_token) {
  token = _token;
  return checkApiKey;
};
