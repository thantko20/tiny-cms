import wretch from 'wretch';

export const api = wretch('http://localhost:3000/api').resolve((r) => r.json());
