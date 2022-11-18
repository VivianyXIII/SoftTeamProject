import axios from 'axios'
import{
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    REGISTER_PRODUCT_REQUEST,
    REGISTER_PRODUCT_SUCCESS,
    REGISTER_PRODUCT_FAIL,
    CLEAR_ERRORS,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL
} from '../constants/productConstants';

//REGISTRAR PRODUCTO
export const registrarProducto = (productData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_PRODUCT_REQUEST })

        const config={
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {produ} = await axios.post('/api/productoNuevo',productData, config)

        dispatch({
            type: REGISTER_PRODUCT_SUCCESS,
            payload: produ.product
        })
    }
    catch (error) { 
        dispatch({
            type: REGISTER_PRODUCT_FAIL,
            payload: error.response.produ.message
        })
    }
}

export const getProducts = ( currentPage =1, keyword='', precio) => async(dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCTS_REQUEST})

        let link=`/api/productos?keyword=${keyword}&page=${currentPage}&precio[gte]=${precio[0]}&precio[lte]=${precio[1]}`

        const {data} = await axios.get(link)

        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

//VER DETALLES DEL PRODUCTO
export const getProductDetails = (id) => async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const {data}=await axios.get(`/api/producto/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// VER LISTA DE PRODUCTOS
export const getAdminProducts = ( ) => async(dispatch)=>{
    try {
        dispatch({type: ADMIN_PRODUCTS_REQUEST})

        const {data} = await axios.get('/api/admin/productos')

        dispatch({
            type:ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
    }catch (error){
        dispatch({
            type:ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

//clear error
export const clearErrors=() => async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}