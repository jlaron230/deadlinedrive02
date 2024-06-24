import React from "react";

// Close component that renders a button with an SVG icon
function Close() {
  return (
    // Button element with various styling classes
    <button className="ml-auto h-6 w-6 flex items-center justify-center hover:bg-gray-100">
      <svg
        className="h-4 w-4" // SVG element for the close icon
        xmlns="http://www.w3.org/2000/svg"
        fill="none" // No fill color
        viewBox="0 0 24 24" // Viewbox for the SVG
        stroke="currentColor" // Stroke color set to current text color
      >
        <path
          strokeLinecap="round" // Rounded line caps
          strokeLinejoin="round" // Rounded line joins
          strokeWidth="2" // Stroke width set to 2
          d="M6 18L18 6M6 6l12 12" // Path definition for the "X" shape
        />
      </svg>
    </button>
  );
}

export default Close; // Export the Close component as default