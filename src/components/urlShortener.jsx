import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UrlShortener = () => {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  const apiBaseUrl = 'https://urlshortener-backend-cq2h.onrender.com'; // Update this with your backend URL

  useEffect(() => {
    const fetchShortUrls = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/shortUrls`);
        setShortUrls(response.data);
      } catch (error) {
        console.error("Failed to fetch short URLs:", error);
      }
    };
    fetchShortUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/shortUrls`, {
        fullUrl,
      });
      setShortUrls([...shortUrls, response.data]);
      setFullUrl("");
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  return (
    <div className="container">
      <h1>URL Shrinker</h1>
      <form onSubmit={handleSubmit} className="my-4 form-inline">
        <input
          required
          placeholder="Url"
          type="url"
          name="fullUrl"
          id="fullUrl"
          className="form-control col mr-2"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          Shrink
        </button>
      </form>

      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {shortUrls.map((shortUrl) => (
            <tr key={shortUrl._id}>
              <td>
                <a
                  href={shortUrl.full}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortUrl.full}
                </a>
              </td>
              <td>
                <a
                  href={`http://localhost:3000/api/${shortUrl.short}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortUrl.short}
                </a>
              </td>
              <td>{shortUrl.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlShortener;
