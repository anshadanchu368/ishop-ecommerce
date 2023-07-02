import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getProductLists= createAsyncThunk(
    'products/getProductLists',
     async({keyword,currentPage=1,price=[0,25000],category},{rejectWithValue})=>{
        try{
            let link = `/api/v1/products`;

            if (keyword) {
              link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
            }

            if(category){
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&categoriy=${category}`;
            }
      
            const { data } = await axios.get(link);
            return data;
        }catch (err){
            return rejectWithValue(err.response.data.message)
        }
     }
)

export const getProductDetails=createAsyncThunk(
    'products/getProductDetails',
    async(id,{rejectWithValue})=>{
        try{
             const {data} =await axios.get(`/api/v1/products/${id}`)
             return data;
        }catch(err){
            return rejectWithValue(err.response.data.message)
        }
    }
)

const productSlice =createSlice({
    name:'products',
    initialState:{
        list:[],
        loading:false,
        error:null,
        details:{}
    },
    reducers:{  
           clearErrors:(state)=>{
            state.error=null;
           },
        },
        extraReducers : (builder)=>{
            builder
            .addCase(getProductLists.pending,(state)=>{
                state.loading =true;
            })
            .addCase(getProductLists.fulfilled,(state,action)=>{
                state.loading=false;
                 state.list = action.payload.product;
                 state.productsCount= action.payload.productsCount;
                 state.resultPerPage = action.payload.resultPerPage;
            })
            .addCase(getProductLists.rejected,(state,action)=>{
                state.loading=false;
                 state.error = action.payload
            })
            .addCase(getProductDetails.pending,(state,action)=>{
                state.loading=true;
            })
            .addCase(getProductDetails.fulfilled,(state,action)=>{
                state.loading=false;
                state.details = action.payload
            })
            .addCase(getProductDetails.rejected,(state,action)=>{
                state.loading=false;
                state.error = action.payload
            })
        }
    });

export const  { clearErrors } = productSlice.actions;
export default productSlice.reducer