import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

export function useBasePath(): string {
  // understand where app is mounted
  // and if it is on root / then it just returns an empty string to avoid breaking paths
  const match = useRouteMatch();
  const { path } = match;
  return path === '/' ? '' : path;
}

export function useToken(prevToken: string | null = null): string | null {
  const [token, setToken] = useState(prevToken);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setToken(data.access_token))
      .catch(() => setToken(null));
  }, []);

  return token;
}
