import { useState, useEffect } from "react";

const useQueryParams = name => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);

      try {
        const parsedValue = JSON.parse(params.get(name));
        setValue(parsedValue);
      }
      catch {
        setValue(params.get(name))
      }
    }
  }, [])

  return value;
};

export default useQueryParams;
