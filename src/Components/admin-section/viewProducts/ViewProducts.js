import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db, storage } from '../../../firebase/config'
import styles from './ViewProducts.module.scss'
import{FaEdit,FaTrashAlt} from 'react-icons/fa'
import Loader from '../../loader/Loader'
import { async } from '@firebase/util'
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, STORE_PRODUCTS } from '../../../redux/slice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'


const ViewProducts = () => {
    const {data,isloading} = useFetchCollection("products")
    
    const products = useSelector(selectProducts)

    const dispatch = useDispatch()

      useEffect(()=>{
        dispatch(
          STORE_PRODUCTS({
            products: data,
          })
        )
      },[dispatch, data])

    // useEffect(()=>{
    //   getProducts()
    // },[])

    // const getProducts = () => {
    //     setIsLoading(true);
    //     try{
    //       const productsRef = collection(db, "products");
    //       const q = query(productsRef, orderBy("createdAt", "desc"));

         
    //     onSnapshot(q, (snapshot) => {
    //       // console.log(snapshot.docs);
    //       const allProducts = snapshot.docs.map((doc)=> ({
    //           id: doc.id,
    //           ...doc.data()
    //       }))
    //       // console.log(allProducts)
    //       setProducts(allProducts)
    //       setIsLoading(false)

    //       dispatch(
    //         STORE_PRODUCTS({
    //           products: allProducts,
    //         }))
    //   });

    //     }catch(error){
    //       setIsLoading(false)
    //         toast.error(error.message)
    //     }
    // }

    const deleteProduct = async(id,imageURL)=>{
        try{
         await deleteDoc(doc(db, "products", id));


         const storageRef = ref(storage, imageURL);
         await deleteObject(storageRef)
         toast.success("Product removed Successfully")

        }catch(error){
            toast.error(error.message)
        }
    }

    const confirmDelete =(id,imageURL)=> {
      Notiflix.Confirm.show(
        'Delete Product!!!',
        'You are about to delete this product',
        'Delete',
        'Cancel',
        function okCb() {
          deleteProduct(id, imageURL)
        },
        function cancelCb() {
          console.log("Delete Canceled")
        },
        {
          width: '320px',
          borderRadius: '8px',
          titleColor: "orangered",
          okButtonBackground:"orangered",
          cssAnimationStyle: "zoom",
        },
      );
    }

  return (
    <>
    {isloading && <Loader/>}
    <div className={styles.table}>
      <h2>All products</h2>
      {products.length === 0 ? (
        <p>No product Found</p>
      ) :(
         <table>
          <thead>
          <tr>
            <th>s/n</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>            
          </tr>
          </thead>
          <tbody>
          {products.map((product,index)=>{
            const {id,name,price,imageURL,category} = product;
            return(
              
              <tr key={id}>
                 <td>{index+1}</td> 
              
              <td>
                <img src={imageURL} alt={name} style={{width:"100px"}} />
              </td>
              <td>
                {name}
              </td>
              <td>
                {category}
              </td>
                <td>
                  {`₹${price}`}
                </td>
                <td className={styles.icons}>
                  <Link to={`/admin/add-product/${id}`}>
                    <FaEdit size={20} color="green"/>
                  </Link>
                  &nbsp;
                  <FaTrashAlt size={18} color="red" 
                  onClick={()=>confirmDelete(id,imageURL)} />

                </td>
              </tr>
              
            )
          })}
          </tbody>
         </table> 
      ) }
    </div>
    </>
  )
}

export default ViewProducts
