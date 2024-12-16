import React from 'react'
import {useEffect, useState} from 'react'




export default function Result() {

    let sc = 0;
    const response = JSON.parse(localStorage.getItem('response'))
    const result = JSON.parse(localStorage.getItem('result'))
    const score = localStorage.getItem('score')


    const type_1 = JSON.parse(localStorage.getItem('type_1'))
    const type_2 = JSON.parse(localStorage.getItem('type_2'))
    const type_3 = JSON.parse(localStorage.getItem('type_3'))
    const type_4 = JSON.parse(localStorage.getItem('type_4'))
    const type_5 = JSON.parse(localStorage.getItem('type_5'))
    const type_6 = JSON.parse(localStorage.getItem('type_6'))





    const listeItems = response.map((item, index)=>{


        let s = 0;
        let scoreReponse = 0;
        let state = null;

        let _question = null;

        let _choice_1 = null;
        let _choice_2 = null;
        let _choice_3 = null;

        let _response_1 = null;
        let _response_2 = null;
        let _response_3 = null;

        let _result_1 = null;
        let _result_2 = null;
        let _result_3 = null;

        let repi_1 = null;
        let repi_2 = null;
        let repi_3 = null;

        let resi_1 = null;
        let resi_2 = null;
        let resi_3 = null;

        for(s = 0; s < item.state.length; s++)
            {

                //the question
                _question = item.question;

                // the choices
                _choice_1 = item.response[0]
                _choice_2 = item.response[1]
                _choice_3 = item.response[2]

                // user response
                _response_1 = item.state[0]
                _response_2 = item.state[1]
                _response_3 = item.state[2]

                // test reponse
                _result_1 = result[index].state[0];
                _result_2 = result[index].state[1];
                _result_3 = result[index].state[2];

                if(item.state[s] == result[index].state[s]){

                    scoreReponse += 1
                }

                if(scoreReponse == 3){

                    state = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='30'height='30' className="fill-green-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                }else{

                    state= <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='30'height='30' className="fill-red-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                }

                // responses of user
                if(_response_1 == true){
                    repi_1 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-green-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                }else if (_response_1 == false){
                    repi_1 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-red-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                }

                if(_response_2 == true){
                    repi_2 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-green-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                }else if (_response_2 == false){
                    repi_2 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-red-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                }

                if(_response_3 == true){
                    repi_3 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-green-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                }else if (_response_3 == false){
                    repi_3 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-red-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                }

                // responses of test
                if(_result_1 == true){
                    resi_1 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-green-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                }else if (_result_1 == false){
                    resi_1 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-red-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                }

                if(_result_2 == true){
                    resi_2 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-green-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                }else if (_result_2 == false){
                    resi_2 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-red-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                }

                if(_result_3 == true){
                    resi_3 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-green-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                }else if (_result_3 == false){
                    resi_3 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='10'height='10' className="fill-red-600"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                }
            }

       return(
        <div>
            <img className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={'../uploads/question/' + item.img} alt=""/>

            <div className="mt-8">

                <span className="text-blue-500 uppercase">{state}</span>

                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                    {item.type}
                </h1>
                <h3 className="mt-4 text-sm font-normal text-gray-800 dark:text-white first-letter:uppercase">
                    {_question}
                </h3>

                <table  className="text-xs font-normal text-gray-800 first-letter:uppercase lg:text-xs dark:text-white w-full">
                    <thead>
                        <tr  className="w-full bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700">
                            <th className="w-4/6 flex justify-start">Choix</th>
                            <th className="w-1/6">Réponses</th>
                            <th className="w-1/6">Correction</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                            <td className="w-4/6 flex justify-start first-letter:uppercase">{_choice_1}</td>
                            <td className="w-1/6 items-center">{repi_1}</td>
                            <td className="w-1/6 items-center">{resi_1}</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                            <td className="w-4/6 flex justify-start first-letter:uppercase">{_choice_2}</td>
                            <td className="w-1/6 items-center">{repi_2}</td>
                            <td className="w-1/6 items-center">{resi_2}</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                            <td className="w-4/6 flex justify-start first-letter:uppercase">{_choice_3}</td>
                            <td className="w-1/6 items-center">{repi_3}</td>
                            <td className="w-1/6 items-center">{resi_3}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     )

    })






  return (
    <section className="bg-white dark:bg-gray-900 pt-40">
    <div className="container px-6 py-10 mx-auto">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-normal text-gray-800 capitalize lg:text-3xl dark:text-white">Score {score}/40</h1>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />
        <div className="mb-4 block">
            <div>{type_1[0]} : {type_1[1]} /{type_1[2]}</div>
            <div>{type_2[0]} : {type_2[1]} /{type_2[2]}</div>
            <div>{type_3[0]} : {type_3[1]} /{type_3[2]}</div>
            <div>{type_4[0]} : {type_4[1]} /{type_4[2]}</div>
            <div>{type_5[0]} : {type_5[1]} /{type_5[2]}</div>
            <div>{type_6[0]} : {type_6[1]} /{type_6[2]}</div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">

            {listeItems}

        </div>
        
    </div>
</section>
  )
}
