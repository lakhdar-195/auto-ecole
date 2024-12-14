import React from 'react'
import {useRef, useState, useEffect} from 'react'
import Checkbox from '../components/Checkbox'

export default function UpdateQ(props) {

    let $question = props.question[0]

    const [dataFirst, setDataFirst] = useState('');
    const [dataSecond, setDataSecond] = useState('');
    const [dataThird, setDataThird] = useState('');
    
    const [first, setFirst] = useState($question.state[0]);
    const [second, setSecond] = useState($question.state[1]);
    const [third, setThird] = useState($question.state[2]);

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

    const output = useRef();
    const type = useRef();
    const image = useRef();
    const question = useRef();

    const response_1 = useRef();
    const response_2 = useRef();
    const response_3 = useRef();

    useEffect(()=>{

        type.current.value = $question.type
        question.current.value = $question.question
        response_1.current.value = $question.response[0]
        response_2.current.value = $question.response[1]
        response_3.current.value = $question.response[2]
        
    },[])

    const handleChange = (event)=>{

        output.current.src = URL.createObjectURL(event.target.files[0]);
        output.current.onload = function() {
            URL.revokeObjectURL(output.current.src) // free memory
        }
    }

    const handleAjaxPut = ()=> {
        
        //init value
        let _id = $question.id
        let _image = image.current.files[0];  
        let _type = type.current.value
        let _question = question.current.value
        let formData = new FormData();
        let _response_1 = response_1.current.value;
        let _response_2 = response_2.current.value;
        let _response_3 = response_3.current.value;
        let idRes_1 = $question.idResp[0]
        let idRes_2 = $question.idResp[1]
        let idRes_3 = $question.idResp[2]

        // append data
        formData.append("id", _id);
        formData.append("img", _image);  
        formData.append("type", _type); 
        formData.append("question", _question);  
        
        formData.append("idResp_1", idRes_1);  
        formData.append("response_1", _response_1);  
        formData.append("dataFirst", dataFirst);

        formData.append("idResp_2", idRes_2);  
        formData.append("response_2", _response_2);  
        formData.append("dataSecond", dataSecond); 

        formData.append("idResp_3", idRes_3);  
        formData.append("response_3", _response_3);  
        formData.append("dataThird", dataThird); 

        //send data                            
        $.ajax({
            type: "POST",
            url: '/update/question',
            processData: false,
            contentType: false,
            data: formData,
            error : function (result) {
                console.log('error', result);
            },
            success : function (result) {
               console.log('success', result)

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

            <div className="w-full text-center mb-10">
                <h2 className=" text-xl font-bold leading-relaxed tracking-tight text-gray-700 md:text-2xl dark:text-white mb-10">Editer une question</h2>
            </div>
            
            <form  className="mt-4 space-y-4 lg:mt-5 md:space-y-5" method="post">


            <div className="mb-4">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="question_img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  w-full">
                            <img ref={output} className="w-full border border-gray-700 rounded" id="output" src={"../../../uploads/question/"+ $question.img}/>
                        </label>
                        <input ref={image} id="question_img" type="file" className="hidden"  onChange={handleChange.bind(event)}  encType="multipart/form-data" multiple />
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
                       <input id="question" type="text" ref={question}  className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"/>
                     </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            <input id="Response_1" type="text" ref={response_1} className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"/>
                            <Checkbox className="w-1/4" sendDataToParent={handleFirst} _data={first} />
                        </div>
                     
                     </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            <input id="Response_1" type="text" ref={response_2} className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"/>
                            <Checkbox className="w-1/4" sendDataToParent={handleSecond} _data={second}  />
                        </div>
                     
                     </div>
                </div>
                <div className="block w-full mb-5">
                    <div className="w-full lg:mr-3 sm:mb-4 lg:mb-1">
                        <label htmlFor="Response_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réponse 1</label>
                        <div className="flex space-x-4">
                            <input id="Response_1" type="text" ref={response_3} className="bg-gray-700/5 border border-gray-300 text-gray-700 text-sm rounded outline-none focus:ring-gray-900 focus:border-gray-700 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"/>
                            <Checkbox className="w-1/4" sendDataToParent={handleThird}  _data={third} />
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
