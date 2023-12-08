// import React, {  useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import axios from "axios";
// import { Country, State, City } from "country-state-city";

// const LocationForm = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelecteCity] = useState(null);

//   const onSubmit = async (data) => {
//     data.country = selectedCountry.label || "";
//     data.state = selectedState.label || "";
//     data.city = selectedCity.label || "";
//     reset();
//     setSelectedCountry("");
//     setSelectedState("");
//     setSelecteCity("");
//     alert("Data Successfully Added");
//     try {
//       const response = await axios.post("http://localhost:3001/form", data);
//       console.log(response);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6">
//       <div className="mb-4">
//         <label
//           htmlFor="locationName"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Location Name
//         </label>
//         <Controller
//           name="locationName"
//           control={control}
//           defaultValue=""
//           render={({ field }) => (
//             <input
//               {...field}
//               type="text"
//               placeholder="Enter location name"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           )}
//         />
//         {errors.locationName && (
//           <p className="text-red-500 text-xs italic">
//             Location name is required.
//           </p>
//         )}
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="locationDescription"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Location Description
//         </label>
//         <Controller
//           name="locationDescription"
//           control={control}
//           defaultValue=""
//           render={({ field }) => (
//             <input
//               {...field}
//               type="text"
//               id="locationDescription"
//               placeholder="Enter location description"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           )}
//         />
//         {errors.locationDescription && (
//           <p className="text-red-500 text-xs italic">
//             Location description is required.
//           </p>
//         )}
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="country"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Country
//         </label>
//         <Select
//           options={Country.getAllCountries().map((country) => ({
//             value: country.isoCode,
//             label: country.name,
//           }))}
//           value={selectedCountry}
//           onChange={(selectedOption) => setSelectedCountry(selectedOption)}
//         />
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="state"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           State
//         </label>
//         <Select
//           options={
//             selectedCountry
//               ? State.getStatesOfCountry(selectedCountry.value).map(
//                   (state) => ({
//                     value: state.isoCode,
//                     label: state.name,
//                   })
//                 )
//               : []
//           }
//           value={selectedState}
//           onChange={(selectedOption) => setSelectedState(selectedOption)}
//         />
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="city"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           City
//         </label>
//         <Select
//           options={
//             selectedState && selectedCountry
//               ? City.getCitiesOfState(
//                   selectedCountry.value,
//                   selectedState.value
//                 ).map((city) => ({
//                   value: city.isoCode,
//                   label: city.name,
//                 }))
//               : []
//           }
//           value={selectedCity}
//           onChange={(selectedOption) => setSelecteCity(selectedOption)}
//         />
//       </div>

//       <div className="mb-4">
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Create Location
//         </button>
//       </div>
//     </form>
//   );
// };

// export default LocationForm;

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { Country, State, City } from "country-state-city";

const LocationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [editLocation, setEditLocation] = useState(null);

  const onSubmit = async (data) => {
    data.country = selectedCountry.label || "";
    data.state = selectedState.label || "";
    data.city = selectedCity.label || "";

    try {
      const response = await axios.post("http://localhost:3001/form", data);
      console.log(response);
      reset();
      setSelectedCountry(null);
      setSelectedState(null);
      setSelectedCity(null);
      alert("Location Successfully Added");
    } catch (error) {
      console.error("Error creating location:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6">
      {editLocation ? (
        <>
          <div className="mb-4">
            <label
              htmlFor="locationName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Location Name
            </label>
            <Controller
              name="locationName"
              control={control}
              defaultValue={editLocation.locationName}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter location name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
            {errors.locationName && (
              <p className="text-red-500 text-xs italic">
                Location name is required.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="locationDescription"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Location Description
            </label>
            <Controller
              name="locationDescription"
              control={control}
              defaultValue={editLocation.locationDescription}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="locationDescription"
                  placeholder="Enter location description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
            {errors.locationDescription && (
              <p className="text-red-500 text-xs italic">
                Location description is required.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Country
            </label>
            <Select
              options={Country.getAllCountries().map((country) => ({
                value: country.isoCode,
                label: country.name,
              }))}
              value={selectedCountry}
              onChange={(selectedOption) => setSelectedCountry(selectedOption)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              State
            </label>
            <Select
              options={
                selectedCountry
                  ? State.getStatesOfCountry(selectedCountry.value).map(
                      (state) => ({
                        value: state.isoCode,
                        label: state.name,
                      })
                    )
                  : []
              }
              value={selectedState}
              onChange={(selectedOption) => setSelectedState(selectedOption)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              City
            </label>
            <Select
              options={
                selectedState && selectedCountry
                  ? City.getCitiesOfState(
                      selectedCountry.value,
                      selectedState.value
                    ).map((city) => ({
                      value: city.isoCode,
                      label: city.name,
                    }))
                  : []
              }
              value={selectedCity}
              onChange={(selectedOption) => selectedCity(selectedOption)}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor="locationName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Location Name
            </label>
            <Controller
              name="locationName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter location name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
            {errors.locationName && (
              <p className="text-red-500 text-xs italic">
                Location name is required.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="locationDescription"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Location Description
            </label>
            <Controller
              name="locationDescription"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="locationDescription"
                  placeholder="Enter location description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
            {errors.locationDescription && (
              <p className="text-red-500 text-xs italic">
                Location description is required.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Country
            </label>
            <Select
              options={Country.getAllCountries().map((country) => ({
                value: country.isoCode,
                label: country.name,
              }))}
              value={selectedCountry}
              onChange={(selectedOption) => setSelectedCountry(selectedOption)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              State
            </label>
            <Select
              options={
                selectedCountry
                  ? State.getStatesOfCountry(selectedCountry.value).map(
                      (state) => ({
                        value: state.isoCode,
                        label: state.name,
                      })
                    )
                  : []
              }
              value={selectedState}
              onChange={(selectedOption) => setSelectedState(selectedOption)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              City
            </label>
            <Select
              options={
                selectedState && selectedCountry
                  ? City.getCitiesOfState(
                      selectedCountry.value,
                      selectedState.value
                    ).map((city) => ({
                      value: city.isoCode,
                      label: city.name,
                    }))
                  : []
              }
              value={selectedCity}
              onChange={(selectedOption) => setSelectedCity(selectedOption)}
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Location
        </button>
      </div>
    </form>
  );
};

export default LocationForm;
