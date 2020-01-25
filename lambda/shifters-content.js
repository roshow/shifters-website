const fetch = require('isomorphic-unfetch')

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  const res = await fetch(`https://drive.google.com/uc?id=${process.env.INDEX_JSON_FILE_ID}`);
  const chapters = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(chapters),
  };
}