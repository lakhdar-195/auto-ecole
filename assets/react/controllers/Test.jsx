import React from 'react'
import {useRef, useState, useEffect} from 'react'
import Switcher from '../components/Switcher'

export default function Test(props) {

    const response_1 = useRef();
    const response_2 = useRef();
    const response_3 = useRef();

    const [count, setCount] = useState(0);
    const [counter, setCounter] = useState(0);
    const [taber, setTaber] = useState(0);

    const res = props.res;
    let result = res[count];


    const [dataFirst, setDataFirst] = useState('');
    const [dataSecond, setDataSecond] = useState('');
    const [dataThird, setDataThird] = useState('');

    const handleFirst = (data) => {


        if(data == null){

            setDataFirst(first);
        }else{

            setDataFirst(data);
        }
        
            };
    const handleSecond = (data) => {
        if(data == null){

            setDataSecond(second);
        }else{

            setDataSecond(data);
            
        }
            };
    const handleThird = (data) => {
        if(data == null){

            setDataThird(third);
        }else{

            setDataThird(data);
        }
            };

    const handleValid = ()=>{


        setCount(count+1);
        result = res[count];
                
            };




  return (
    
<section className="bg-gray-white dark:bg-gray-700 pt-40 pb-60">
    <div className=" flex flex-col items-center justify-start px-6 py-1 mx-auto md:h-screen lg:py-0">
        <div className="lg:w-2/5 p-6 bg-white sm:w-full md:w-full  rounded shadow border  dark:bg-gray-700 border-gray-700 sm:p-8">

            <div className="w-full text-center mb-10">
                <h2 className=" text-xl font-bold leading-relaxed tracking-tight text-gray-700 md:text-2xl dark:text-white mb-10">Editer une question</h2>
            </div>
            
            <form  className="mt-4 space-y-4 lg:mt-5 md:space-y-5" method="post">


            <div className="mb-4">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="question_img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  w-full">
                            <img  className="w-full border border-gray-700 rounded" id="output" src={"../../../uploads/question/" + result.img}/>
                        </label>
                    </div> 
                 </div>
                <div className="block w-full">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1"> 
                        {result.type}
                     </div>
                </div>
                <div className="block w-full">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                       {result.question}
                    </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            <div className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                                {result.response[0]}
                            </div>
                            <Switcher className="w-1/4" sendDataToParent={handleFirst}  />
                        </div>
                     
                     </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            
                            <div className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                                {result.response[1]}
                            </div>
                            <Switcher className="w-1/4" sendDataToParent={handleSecond}  />
                        </div>
                     
                     </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            <div className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                                {result.response[2]}
                            </div>
                            <Switcher className="w-1/4" sendDataToParent={handleThird} />
                        </div>
                     
                     </div>
                </div>
                <div className="flex w-full justify-center">
                    <button type="submit" onClick={handleValid}className=" text-base  text-white hover:bg-gray-900 bg-gray-700  dark:text-white dark:hover:bg-gray-700 font-medium rounded px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                        Envoyer
                    </button>
                </div>
            
            </form>
        </div>
    </div>
</section>
  )
}
