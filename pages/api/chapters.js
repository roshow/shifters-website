import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  
  const chapters = await fetch(`https://drive.google.com/uc?id=${process.env.INDEX_JSON_FILE_ID}`).then(r => r.json());

  res.status(200).json(chapters);

}