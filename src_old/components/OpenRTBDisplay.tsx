import React, { useEffect, useState } from 'react';
import { sendOpenRTBRequest } from '../services/openRTBService';

const OpenRTBDisplay: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await sendOpenRTBRequest();
        setResponse(data);
        setError(null);
      } catch (err) {
        setError('Failed to send OpenRTB request');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="openrtb-display">
      <h2>OpenRTB Request/Response</h2>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && (
        <>
          <div className="response-container">
            <h3>Response from OpenRTB Server</h3>
            {response ? (
              <pre>{JSON.stringify(response, null, 2)}</pre>
            ) : (
              <p>No response received</p>
            )}
          </div>
          <p className="note">
            Check the browser console for detailed request and response logs.
          </p>
        </>
      )}
    </div>
  );
};

export default OpenRTBDisplay; 