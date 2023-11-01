import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const LocationForm = () => {
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState(["Home", "Office", "Others"]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [newTag, setNewTag] = useState("");
  const [isCreatingNewTag, setIsCreatingNewTag] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/show")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleLocationSelection = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(
        selectedLocations.filter((item) => item !== location)
      );
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const assignTagsToSelectedLocations = () => {
    if (selectedTag) {
      const updatedLocations = locations.map((loc) => {
        if (selectedLocations.includes(loc._id)) {
          return { ...loc, tag: selectedTag };
        } else {
          return loc;
        }
      });

      setLocations(updatedLocations);
      setSelectedLocations([]);
    }
  };

  const createNewTag = () => {
    if (newTag) {
      setTags([...tags, newTag]);
      setSelectedTag(newTag);
      setNewTag("");
      setIsCreatingNewTag(false);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 shadow-sm">
        <thead>
          <tr className="border-t border-b border-gray-300">
            <th className="py-3 px-6 text-left">Select</th>
            <th className="py-3 px-6 text-left">Location Name</th>
            <th className="py-3 px-6 text-left">Location Description</th>
            <th className="py-3 px-6 text-left">Country</th>
            <th className="py-3 px-6 text-left">State</th>
            <th className="py-3 px-6 text-left">City</th>
            <th className="py-3 px-6 text-left">Tags</th>
            <th colSpan={2} className="py-3 px-6 text-left">
              View
            </th>
            <th className="py-3 px-6 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr key={index} className="border-t border-b border-gray-300">
              <td className="py-3 px-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value={location._id}
                    checked={selectedLocations.includes(location._id)}
                    onChange={() => toggleLocationSelection(location._id)}
                    className="text-blue-100 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="py-3 px-6">{location.locationName}</td>
              <td className="py-3 px-6">{location.locationDescription}</td>
              <td className="py-3 px-6">{location.country}</td>
              <td className="py-3 px-6">{location.state}</td>
              <td className="py-3 px-6">{location.city}</td>
              <td className="py-3 px-6">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(console.log(e.target.value))}
                  className="bg-blue-100 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-14 mb-10 border border-gray-400 rounded shadow"
                >
                  <option
                    className="bg-indigo-100 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-14 border border-gray-400 rounded shadow"
                    value=""
                  >
                    Select or create a new tag
                  </option>
                  {tags.map((tag, tagIndex) => (
                    <option
                      key={tagIndex}
                      value={tag}
                      className="bg-indigo-100 hover:bg-green-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >
                      {tag}
                    </option>
                  ))}
                </select>
                {isCreatingNewTag ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="mr-2 p-1 border border-gray-300 rounded focus:ring focus:ring-blue-500"
                    />
                    <button onClick={createNewTag} className="text-green-500">
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      onClick={() => setIsCreatingNewTag(false)}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsCreatingNewTag(true)}>
                    <FontAwesomeIcon
                      icon={faTags}
                      className="text-indigo-500 px-8"
                    />
                  </button>
                )}
                <button
                  onClick={assignTagsToSelectedLocations}
                  className="bg-indigo-300 text-white py-1 px-2 rounded hover:bg-indigo-700"
                >
                  Assign Tag
                </button>
              </td>
              <td>
                <button class="bg-green-100 hover:bg-green-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Edit
                </button>
              </td>
              <td>
                <button class="bg-blue-100 hover:bg-blue-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationForm;
