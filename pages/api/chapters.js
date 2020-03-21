import axios from 'axios';

export default async (req, res) => {
  
  const indexFileId = process.env.INDEX_JSON_FILE_ID || '1pQUOmyHJDQWhVEzPt9Etg6MOJpfX1lul';
  
  const { data } = await axios(`https://drive.google.com/uc?id=${indexFileId}`);

  res.status(200).json(data);

}