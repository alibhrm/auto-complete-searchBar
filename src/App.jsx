import { useState } from "react";
import "./App.css";


function App() {

  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const [isExpanded, setIsExpanded]=useState(false)

const expandContainer =()=>{
  setIsExpanded(true)
}

  const onChange = async (e) => {
    setValue(e.target.value);
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setData(data);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="relative">
            <input
              type="text"
              onFocus={expandContainer}
              onChange={onChange}
              value={value}
              className="w-full py-2 pl-4 pr-12 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="absolute top-1 right-2 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className={`${isExpanded ? 'block' : 'hidden'} mt-4 space-y-2`}>
            {value &&
              data
                .filter((item) => item.title.startsWith(value) && item.title!== value)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={(e) => setValue(item.title)}
                    className="bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {item.title} 
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;