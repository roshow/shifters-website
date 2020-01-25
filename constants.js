export const ENV = process.env.NODE_ENV;

export const ROOT_URL = ENV !== 'production' ? 'http://localhost:8888' : 'https://shifters-demo.netlify.com';