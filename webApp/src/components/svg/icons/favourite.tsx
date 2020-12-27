import * as React from 'react';
type FavouriteProps = {
  className?: string;
};

export function Favourite(props: FavouriteProps) {
  return (
    <div {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 90.72 79.38"
        width="100%"
        height="100%"
      >
        <g
          id="Layer_2"
          data-name="Layer 2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4px"
        >
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              id="Favourite"
              className="cls-1"
              d="M82.88,7.84a23.34,23.34,0,0,0-33,0h0l-4.5,4.5-4.5-4.5a23.35,23.35,0,0,0-33,33l4.5,4.5,33,33,33-33,4.5-4.5a23.34,23.34,0,0,0,0-33Z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
