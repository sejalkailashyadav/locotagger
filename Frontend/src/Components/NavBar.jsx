// import React from "react";
// import { Link } from "react-router-dom";
// const navLinks = [
//   { to: "/", text: "Create Form" },
//   { to: "/show", text: "Show" },
// ];

// const NavBar = (props) => {
//   return (
//     <>
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-black-100">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-4">
//                 {navLinks.map((link, index) => (
//                   <Link to={link.to} key={index}>
//                     {link.text}
//                   </Link>
//                 ))}

//                 {/* <button
//                   onClick={props.toggleDarkMode}
//                   className={`self-left justify-self-end ${
//                     props.darkMode ? "dark" : ""
//                   }`}
//                 >
//                   {props.darkMode ? "Light Mode" : "Dark Mode"}
//                 </button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-4"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NavBar;
import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/", text: "Create Form" },
  { to: "/show", text: "Show" },
];

const NavBar = (props) => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">LocoTagger</h1>
          </div>
          <div className="hidden sm:block">
            <div className="ml-10 flex space-x-4">
              {navLinks.map((link, index) => (
                <Link
                  to={link.to}
                  key={index}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
