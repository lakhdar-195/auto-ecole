import React from 'react'
import {useState, useEffect, useContext} from 'react'


export default function Checkbox({_data, sendDataToParent }) {



    const [isChecked, setIsChecked] = useState(true)

    useEffect(()=>{

      sendDataToParent(_data);
      setIsChecked(!_data)

    }, [])

    const handleCheckboxChange = (event) => {


      setIsChecked(!isChecked)
      sendDataToParent(isChecked);
    }


    return (
        <>
          <label className='themeSwitcherThree relative inline-flex cursor-pointer select-none items-center'>
            <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} className='sr-only'  />
            <div className='shadow-card flex h-[46px] w-[82px] items-center justify-center rounded-md bg-white border border-gray-300'>
              <span className={`flex h-9 w-9 items-center justify-center rounded ${ !isChecked ? 'bg-primary text-white' : 'text-red-700' }`} >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width='16'height='16' className="">
                <path fillRule='evenodd' clipRule='evenodd' fill='currentColor' d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
              </span>
              <span  className={`flex h-9 w-9 items-center justify-center rounded ${ isChecked ? 'bg-primary text-white' : 'text-green-600'  }`}  >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width='16'height='16' className="fill-green-600">
                    <path  fillRule='evenodd' clipRule='evenodd' fill='currentColor'  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
              </svg>
              </span>
            </div>
          </label>
        </>
      )
  
}
