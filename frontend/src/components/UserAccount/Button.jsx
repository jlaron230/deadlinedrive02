import React from "react";

function Button({ edit , text}) {
  return (
    <button
      onClick={edit}
      className="hover:bg-gray-600 bg-black bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-md inline-flex items-center justify-center py-2 px-5 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
    >
      {text}
    </button>
  );
}

export default Button;
