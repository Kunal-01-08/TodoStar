import { useEffect, useState,useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import { FaEdit, FaTrash,FaMoon } from "react-icons/fa";  



function App() {

  const [newtask, setnewtask] = useState('')
  const [completed, setcompleted] = useState([])
  const [taskstbs, settaskstbs] = useState(0)
  const [pendingtasks, setpendingtasks] = useState([])
  const [datachange, setdatachange] = useState(0)
  const [theme, settheme] = useState("light")
  const inputRef = useRef(null)
  const addRef = useRef(null)


  const handleChange1=(e)=>{
    settaskstbs(e.target.value)
    
  }

   
  const handleChange2=(e)=>{

    setnewtask(e.target.value)
   
  }


  const handleChange3=(e)=>{
   if(e.target.checked){
     localStorage.setItem(e.target.id,"completed") 
   }
   else{
     localStorage.setItem(e.target.id,"pending") 
   }
       setdatachange(datachange=>(datachange+1)%2)
  //  console.log(e.target.checked)
 }
   
  const handleClick1=()=>{  
    localStorage.setItem(newtask,"pending") 
   
    setnewtask("")
    setdatachange(datachange=>(datachange+1)%2)
  }
   const handleClick2=(data)=>{  
    localStorage.removeItem(data)
    setdatachange(datachange=>(datachange+1)%2)
    
  }
  const handleClick3=(data)=>{  
    if(newtask!=""){
       localStorage.setItem(newtask,"pending") 
    }
    setnewtask(data)
    inputRef.current.focus()
    localStorage.removeItem(data)
    setdatachange(datachange=>(datachange+1)%2)
    
  }

  const handleMoon=()=>{
    theme=='light'?settheme('Dark'):settheme('light');
  }



  
  useEffect(() => {
    setcompleted([])
    setpendingtasks([])

    let cmp=[],pnd=[]
   for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    if(value=='pending'){
      pnd=pnd.concat(key)
    }
    else{
      cmp=cmp.concat(key)
      
    }
  }
  setpendingtasks(pnd)
  setcompleted(cmp)

  
},[datachange])
// console.log({completed})
  
  
  

  const Task=({description,isChecked})=>{
    return(
      <>
        <div className="flex  gap-1 items-center justify-between pl-15  ">
          <div className="flex gap-1 items-center">

          <input type="checkbox" id={description} checked={isChecked}  onChange={handleChange3}/>
          <label htmlFor={description} className={isChecked?"text-red-500 line-through  break-all    ":" break-all    "} >{description}</label>
          </div>
          <div className="icons flex gap-1 items-center ml-1">

          <FaEdit onClick={()=>handleClick3(description)}/>
          <FaTrash onClick={()=>handleClick2(description)}/>
          </div>
        </div>
        <hr  className="w-5/6 text-[#91B6FE]"/>
      </>
    )
  }

  const showtasks=(selectedtasks,flag)=>{
    return(<>
      {selectedtasks.map((metadata)=>{
       
        return <Task key={metadata} description={metadata} isChecked={flag}/>
        
        // {console.log(metadata)}
      })}
      </>
    )
  }




  return (
    <>
    <div className=" h-screen flex flex-col ">
      
      <Navbar />
    

      <div className="content flex justify-center items-center h-full bg-[#91B6FE]">
        <div className={theme=='light'?"todolist flex flex-col w-9/10  sm:w-1/2 lg:w-2/7 items-center bg-white p-2 gap-4":"todolist w-9/10  sm:w-1/2 lg:w-2/7 flex flex-col items-center bg-gray-800 text-white p-2 gap-4"}>
          <h1 className="text-2xl font-bold w-full text-center ">
            TodoStar-Forget forgetting , use TodoStar
          </h1>

          <div className="addtask flex items-center justify-between w-full">
            <input ref={inputRef}  className=" border-1 border-blue-300 outline-0 w-1/2 " value={newtask} type="text" onChange={handleChange2} />
            <button className="bg-[#6C63FF] py-1 px-3 rounded-2xl text-white disabled:opacity-50 " ref={addRef} disabled={newtask.length==0} onClick={handleClick1} >Add</button>
            <select className="outline-0 bg-[#6C63FF] text-white py-1 w-12" onChange={handleChange1}>
              <option value="0" >All</option>
              <option value="2" >Pending</option>
              <option value="1" >Finished</option>
            </select>
            <FaMoon className="border-2 rounded-2xl w-6 h-6 p-1 " onClick={handleMoon}/>
          </div>
         

          <div className="tasks flex flex-col h-[50vh] overflow-y-scroll w-full scrollbar-hide " >

            {(taskstbs==0 || taskstbs==1)&& showtasks(completed,1) }
            {(taskstbs==0 || taskstbs==2)&& showtasks(pendingtasks,0) }
              
          </div>

        </div>
      </div>
      </div>
    </>
  );
}

export default App;
