import React from 'react'
import {useRef, useState, useEffect} from 'react'
import Checker from '../components/Checker'

export default function Test(props) {

    //nombre de question
    let nbq = 40;
    // nombre de seconde
    let seconde = 30;
    let time = 10 * seconde;

    const button = useRef(null);




    const [count, setCount] = useState(0);

    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    
    //result of questions
    const res = props.res;
    localStorage.setItem('result', JSON.stringify(res));
    
    let result = res[count];
    
   

    const [dataFirst, setDataFirst] = useState('');
    const [dataSecond, setDataSecond] = useState('');
    const [dataThird, setDataThird] = useState('');

    const [response, setResponse] = useState([]);

    const handleFirst = (data) => {


        if(data == null){

            setDataFirst(first);
        }else{

            setDataFirst(data);
            setFirst(data)
        }
        
            };
    const handleSecond = (data) => {
        if(data == null){

            setDataSecond(second);
        }else{

            setDataSecond(data);
            setSecond(data)
            
        }
            };
    const handleThird = (data) => {
        if(data == null){

            setDataThird(third);
        }else{

            setDataThird(data);
            setThird(data)
        }
            };



   
    useEffect(()=>{

       
       
        if(count > (nbq-1)){

                
            score();

            localStorage.setItem('type_1', JSON.stringify(typeScore('Les règles de circulation')))
            localStorage.setItem('type_2', JSON.stringify(typeScore('La sécurité routière')))
            localStorage.setItem('type_3', JSON.stringify(typeScore('La mécanique et l’entretien')))
            localStorage.setItem('type_4', JSON.stringify(typeScore('Les situations pratiques')))
            localStorage.setItem('type_5', JSON.stringify(typeScore('Les règles spécifiques')))
            localStorage.setItem('type_6', JSON.stringify(typeScore('Le comportement du conducteur')))
        }
            
    }, [count, setter])

 
    const [setter, setSetter] = useState(0);
    const [counter, setCounter] = useState(0);

    let timerId = null
    const timer = ()=>{

        timerId = setTimeout(() => {



            setSetter(setter + 1)


                setCounter(Math.floor(setter / 10))

            
            if(setter >= time){
                setSetter(0)
                setCounter(0)
            }

            
        }, 100);
    }

    useEffect(()=>{

        if(setter >= time){
            button.current.click();
        }



        timer();
        
    }, [setter])

  



    // push responses object in array
    const handleValid = ()=>{

        clearTimeout(timerId)
        console.log(timerId)
        setSetter(0);
        setCounter(0)
        result = res[count];
        const newResponse = {id: result.id, idResp: result.idResp, img: result.img, question: result.question, response: result.response, state: [dataFirst, dataSecond, dataThird], type: result.type};
        setResponse([...response, newResponse]);

        setCount(count+1);

        setFirst(false)
        setSecond(false)
        setThird(false)
     
    };



    //get score by type of question 
    const typeScore = (type )=>{

        let i = 0;
        let sc = 0;
        let numberQuestion = 0;

        for(i = 0; i < response.length; i++){

            if(response[i].type == type ){

                numberQuestion += 1;
            }
            let s = 0;

            let score = 0;
            for(s = 0; s < 3; s++)
            {

                if( response[i].state[s] == res[i].state[s] && response[i].type == type )
                {

                    score += 1;
                }

            }

            if(score == 3){

                sc += 1
            }
            
        }

        
            let tab = [type, sc, numberQuestion]
            return tab;

    }



    // get score
    const score = ()=>{

        let i = 0;
        let sc = 0;
        

        for(i = 0; i < response.length; i++){

            let s = 0;
            let score = 0;

            for(s = 0; s < 3; s++)
            {
                if(response[i].state[s] == res[i].state[s])
                {

                    score += 1;
                }

            }

            if(score == 3){

                sc += 1
            }
        }

        localStorage.setItem('score', sc);
        sendToResult()
    }

    const sendToResult =  ()=>{

        localStorage.setItem('response', JSON.stringify(response));
        location.href = '/result';

    }




  return (
    
<section className="bg-gray-white dark:bg-gray-700 pt-40 pb-60">
    <div className=" flex flex-col items-center justify-start px-6 py-1 mx-auto md:h-screen lg:py-0">
        <div className="lg:w-2/5 p-6 bg-white sm:w-full md:w-full  rounded shadow border  dark:bg-gray-700 border-gray-700 sm:p-8">

            <div className="w-full text-center mb-10">
                <h2 className=" text-xl font-bold leading-relaxed tracking-tight text-gray-700 md:text-2xl dark:text-white mb-10">Question n:° {count + 1}</h2>
            </div>
            
 


            <div className="mb-4">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="question_img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  w-full">
                            <img  className="w-full border border-gray-700 rounded" id="output" src={"../../../uploads/question/" + result.img}/>
                        </label>
                    </div> 
                 </div>
                <div className="flex w-full">
                    <div className="w-3/4 block lg:mr-3 sm:mb-4 lg:mb-1"> 
                        <div>{result.type} </div>
                        <div>{result.question}</div>
                     </div>
                     <div className="w-1/4 items-center text-center">
                        <p className="text-4xl font-bold">{counter}/{seconde}</p> 
                     </div>
                </div>
                <div className="block w-full">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                       
                    </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            <div className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                                {result.response[0]}
                            </div>
                            <Checker className="w-1/4" sendDataToParent={handleFirst} _data={first} />
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
                            <Checker className="w-1/4" sendDataToParent={handleSecond} _data={second} />
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
                            <Checker className="w-1/4" sendDataToParent={handleThird} _data={third} />
                        </div>
                     
                     </div>
                </div>
                <div className="flex w-full justify-center">
                    <button type="submit" onClick={handleValid} ref={button} className=" text-base  text-white hover:bg-gray-900 bg-gray-700  dark:text-white dark:hover:bg-gray-700 font-medium rounded px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                        Envoyer
                    </button>
                </div>

        </div>
    </div>
</section>
  )
}
