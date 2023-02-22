import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";


const useFetchCollection=(collectionName)=>{
    const [data, setData]= useState([])    
    const[isloading, setIsLoading] =useState(false)


    const getCollection = () => {
        setIsLoading(true);
        try{
          const docRef = collection(db, collectionName);
          const q = query(docRef, orderBy("createdAt", "desc"));

         
        onSnapshot(q, (snapshot) => {
          
          const allData = snapshot.docs.map((doc)=> ({
              id: doc.id,
              ...doc.data()
          }))
        //  console.log(allData)
          setData(allData)
          setIsLoading(false)       
      });

        }catch(error){
          setIsLoading(false)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getCollection()
    },[])

    return {data, isloading} 
}

export default useFetchCollection;