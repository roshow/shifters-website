import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  
  const indexFileId = process.env.INDEX_JSON_FILE_ID || '1pQUOmyHJDQWhVEzPt9Etg6MOJpfX1lul';
  
  const chapters = await fetch(`https://drive.google.com/uc?id=${indexFileId}`).then(r => r.json());

  res.status(200).json(chapters);

}