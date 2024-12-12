import React from 'react'
import {useRef, useState} from 'react'
import Switcher from '../components/Switcher';

export default function Response(props) {

    const [dataFirst, setDataFirst] = useState('');
    const [dataSecond, setDataSecond] = useState('');
    const [dataThird, setDataThird] = useState('');

    const handleFirst = (data) => {
        if(data == null){

            setDataFirst(false);
        }else{

            setDataFirst(data);
        }
        
      };
    const handleSecond = (data) => {
        if(data == null){

            setDataSecond(false);
        }else{

            setDataSecond(data);
        }
    };
    const handleThird = (data) => {
        if(data == null){

            setDataThird(false);
        }else{

            setDataThird(data);
        }
        };

    
    const output = useRef();
    const type = useRef();
    const image = useRef();

    const question = useRef();
    const response_1 = useRef();
    const response_2 = useRef();
    const response_3 = useRef();

    const handleChange = (event)=>{

        output.current.src = URL.createObjectURL(event.target.files[0]);
        output.current.onload = function() {
            URL.revokeObjectURL(output.current.src) // free memory
        }
    }

    const handleAjaxPut = ()=> {
        

        //init value
        let _image = image.current.files[0];  
        let _type = type.current.value
        let _question = question.current.value
        let formData = new FormData();
        let _response_1 = response_1.current.value;
        let _response_2 = response_2.current.value;
        let _response_3 = response_3.current.value;

        // append data
        formData.append("img", _image);  
        formData.append("type", _type); 
        formData.append("question", _question);  
        formData.append("response_1", _response_1);  
        formData.append("dataFirst", dataFirst);

        formData.append("response_2", _response_2);  
        formData.append("dataSecond", dataSecond); 

        formData.append("response_3", _response_3);  
        formData.append("dataThird", dataThird); 

        //send data                            
        $.ajax({
            type: "POST",
            url: '/put/question',
            processData: false,
            contentType: false,
            data: formData,
            error : function (result) {
                console.log('error', result);
            },
            success : function (result) {
               console.log('success', result.message)

               if(result.response == true){

                    location.reload();
               }
            }
         });
    }



  return (
    <section className="bg-gray-white dark:bg-gray-700 pt-40 pb-60">
    <div className=" flex flex-col items-center justify-start px-6 py-1 mx-auto md:h-screen lg:py-0">
        <div className="lg:w-2/5 p-6 bg-white sm:w-full md:w-full  rounded shadow border  dark:bg-gray-700 border-gray-700 sm:p-8">

            <div className="w-full text-center mb-5">
                <h2 className=" text-xl font-bold leading-relaxed tracking-tight text-gray-700 md:text-2xl dark:text-white mb-4">Ajouter une question</h2>
                <p className="w-3/4 mx-auto leading-relaxed text-base text-gray-600">Personnalisez et mettez à jour les informations de votre profil afin de refléter les changements et de faciliter une expérience adaptée à vos besoins.</p>
            </div>
            
            <form  className="mt-4 space-y-4 lg:mt-5 md:space-y-5" method="post">


            <div className="mb-4">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="question_img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  w-full">
                            <img ref={output} className="w-full border border-gray-700 rounded" id="output" src="https://placehold.co/600x400"/>
                        </label>
                        <input ref={image} id="question_img" type="file" className="hidden" onChange={handleChange.bind(event)} encType="multipart/form-data" multiple />
                    </div> 
                 </div>
                <div className="block w-full">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1"> 
                        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type question</label>
                        
                       <select name="type" id="type" ref={type} className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option value="Les règles de circulation">Les règles de circulation</option>
                            <option value="La sécurité routière">La sécurité routière</option>
                            <option value="La mécanique et l’entretien">La mécanique et l’entretien</option>
                            <option value="Les situations pratiques">Les situations pratiques</option>
                            <option value="Les règles spécifiques">Les règles spécifiques</option>
                            <option value="Le comportement du conducteur">Le comportement du conducteur</option>
                       </select>
                     </div>
                </div>
                <div className="block w-full">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question</label>
                       <input id="question" type="text" ref={question} className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"/>
                     </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            <input id="Response_1" type="text" ref={response_1} className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"/>
                            <Switcher className="w-1/4" sendDataToParent={handleFirst} />
                        </div>
                     
                     </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            <input id="Response_1" type="text" ref={response_2} className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"/>
                            <Switcher className="w-1/4" sendDataToParent={handleSecond} />
                        </div>
                     
                     </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            <input id="Response_1" type="text" ref={response_3} className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"/>
                            <Switcher className="w-1/4" sendDataToParent={handleThird} />
                        </div>
                     
                     </div>
                </div>
                <div className="flex w-full justify-center">
                    <button onClick={handleAjaxPut} type="submit" className=" text-base  text-white hover:bg-gray-900 bg-gray-700  dark:text-white dark:hover:bg-gray-700 font-medium rounded px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                        Envoyer
                    </button>
                </div>
            
            </form>
        </div>
    </div>
</section>
  )
}
