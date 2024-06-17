import React, { useEffect, useState, useRef } from "react"


//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormName } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { resetCard,setCardNo, setJoinDate, setNametitle, setName, setUserid, setAllowAnimated, setRandom1, setRandom2, setRandom3, setRandom4 } from 'redux/reducers/CreditCardReducer'
//-------------------------------------------------------


export default function Username() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch();
  //  const { name } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { cardNo, joinDate, name, userid, allowAnimated, nametitle, random1, random2, random3, random4 } = useSelector((state) => state.CreditCardReducer)
    const [stop, setStop] = useState(false)
   
    function generateRandomNumber() {
        return Math.floor(Math.random() * 9000) + 1000;
      }
      
      useEffect(() => {
       
        let ramdom1

      
        do {
            let ramdom1 = generateRandomNumber()
            let ramdom2 = generateRandomNumber()
            let ramdom3 = generateRandomNumber()
            let ramdom4 = generateRandomNumber()
            dispatch(setRandom1(ramdom1))
            dispatch(setRandom2(ramdom2))
            dispatch(setRandom3(ramdom3))
            dispatch(setRandom4(ramdom4))
    
           let variable =  ramdom1.toString().substring(0, 1)
    
        //   console.log(variable)
       
           if(variable == 1) { // stop if first number at random1 == 1
            setStop(true)
            break
           }
       
        } while (!stop); 


        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

     


    // handle on input value change
    const handleChange = async (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        if (value.length <= 20) {
          //  const re = /^[0-9a-zA-Z]*$/   // prevent underscore
          //  if (re.test(value)) {
                if (value.length <= 20) {

                    const userUppercase = (value)
                    dispatch(setFormName(userUppercase))
                    dispatch(setName(userUppercase))
                  
                }
          //  }
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'name') {
            //    inputRef.current.focus()
            // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])


    const handleRadioButton = (data) =>{
      
        dispatch(setAllowAnimated(true))

        setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called
           dispatch(setNametitle(data))
          }, 500)
    
    }

    return (
        <>

<div className="w-full  px-4 mt-5">
              
            
{/* <div className="flex flex-row justify-around mb-3">
<button className="flex items-center pl-4 border border-gray-200 rounded-full dark:border-gray-700 pr-2">
    <input  onClick={()=>handleRadioButton('Mr.')}  id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-200 dark:text-gray-300 pl-2"> Mr.</label>
</button>
<button   className="flex items-center pl-4 border border-gray-200 rounded-full dark:border-gray-700 hover:cursor pr-2">
    <input onClick={()=>handleRadioButton('Mrs.')} checked id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-200 dark:text-gray-300 pl-2"> Mrs.</label>
</button>
</div> */}
  
              
              
                <div className="relative w-full mb-3">
                    <p className="mb-1 text-sm">Your Full Name   </p>

                    <input type="text" autoComplete="off" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="name"
                        value={name || ''}
                        onChange={handleChange}
                    />
                    {formError && formError.path === 'name' ?
                        <p className="text-yellow-300 ml-2 mt-2 text-sm">
                            <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                            {formError.message}
                        </p> : null
                    }
                </div>
            </div>


        </>

    )
}



