import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { getAllissue } from '../utils/links';
import { GiTwoCoins } from "react-icons/gi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Link } from 'react-router-dom'

const Problems = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchAllIssues = async () => {
      try {
        const res = await axios.get(getAllissue, { withCredentials: true });
        setIssues(res.data.data);
        setFilteredData(res.data.data);
      } catch (error) {
        setError("Server under maintenance, we'll be back soon");
      }
    };
    fetchAllIssues();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value === "") {
      setFilteredData(issues);
    } else {
      const filtered = issues.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="p-4">
      {issues.length > 0 ? (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search..."
              className="border rounded-md w-[80%] sm:w-2/3 mx-auto p-2 bg-gray-100"
            />
          </div>

          {/* Table */}
          <div className="flex items-center justify-between rounded-lg p-4">
            <h2 className="w-1/4">Problem Title</h2>
            <span className="w-1/6 text-center">Category</span>
            <span className="w-1/6 text-center">Coins</span>
            <span className="w-1/6 text-center">XP</span>
            <span className="w-1/6 text-center">Status</span>
          </div>
          <hr className="opacity-30" />

          {/* Results */}
          {filteredData.length === 0 ? (
            <p className="text-center text-gray-500">No results found</p>
          ) : (
            filteredData.map((issue, idx) => (
              <Link
                to={`/issue/${issue._id}`}
                key={idx}
                className="mt-2 flex items-center justify-between bg-white shadow-md rounded-lg p-4 border-gray-200 hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-semibold text-gray-800 w-1/4">
                  {issue.title}
                </h2>
                <span className="text-sm text-gray-600 w-1/6 text-center">
                  {issue.category}
                </span>
                <span className="flex items-center text-sm text-yellow-600 w-1/6 justify-center">
                  <GiTwoCoins className="mr-1 text-lg" /> {issue.rewards.coins}
                </span>
                <span className="flex items-center text-sm text-blue-600 w-1/6 justify-center">
                  <BsFillLightningChargeFill className="mr-1 text-lg" />{" "}
                  {issue.rewards.xp}
                </span>
                <span className="text-sm font-medium text-green-700 w-1/6 text-center">
                  {issue.status}
                </span>
              </Link>
            ))
          )}
        </div>
      ) : (
        <p className="text-center text-red-500 font-medium text-lg">{error}</p>
      )}
    </div>
  );
};

export default Problems