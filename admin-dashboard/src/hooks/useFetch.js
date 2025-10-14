import {useState, useEffect} from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const accessToken = localStorage.getItem('accessToken');
    
    fetch(url, {
      method: 'GET', 
      headers: {'Authorization': `${accessToken}`}, 
      signal: abortController.signal
    })
    .then(res => {
      if(!res.ok)
        throw new Error('Could not fetch the desired data');
      return res.json();
    })
    .then(data => {
      setIsPending(false);
      setData(data);
      setError(null);
    })
    .catch(err => {
      if (err.name == 'AbortError')
        console.log('fetch aborted');
      else {
        setIsPending(false);
        setError(err.message);
      }
    });

    return () => abortController.abort();
  }, [url]);

  return {data, isPending, error};
};

export default useFetch;