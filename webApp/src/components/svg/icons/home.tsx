import * as React from 'react';
import style from '../../../sass/icons.module.scss';
type HomeProps = {
  className?: string;
  changeNav: (nav: string) => void;
};

export function Home(props: HomeProps) {
  return (
    <div {...props} onClick={() => props.changeNav('home')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 323.53 288.57"
        className={style.icon}
      >
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <g id="home">
              <path
                className="cls-1"
                d="M321.52,148h0L177.3,8.1c-9.82-9.21-16-12.28-28.85,0S2.38,147.41,2.38,147.41h0c-6.91,6.37,2.74,16.43,9.82,10.44h0L162.57,14.23,310.48,157.85c4,5.7,13,2.66,12.89-4.3.61-2.45-.62-3.68-1.85-5.52Z"
              />
              <path
                className="cls-1"
                d="M276.11,132.07a7.46,7.46,0,0,0-7.37-7.36,7.08,7.08,0,0,0-7.36,7.36h0V257.89c0,8.59,0,16.57-14.12,16.57H200.62V197.13c0-17.8-8.59-22.71-23.94-22.71H147.22c-14.73,0-24.55,5.52-24.55,22.71v77.33h-43c-13.5,0-16.57-3.68-16.57-16.57V131.46h0a7.37,7.37,0,1,0-14.73,0h0V261c0,20.25,5.53,27.61,29.46,27.61h58.31V200.2c0-9.21,3.06-11.67,11-11.67h28.24c6.13,0,9.82,1.85,9.82,11.05v89H249.1c20.87,0,25.78-9.82,25.78-28.23,1.23-14.11,1.23-128.27,1.23-128.27Z"
              />
            </g>
          </g>
        </g>
      </svg>
      <p className={style.text}>Home</p>
    </div>
  );
}
