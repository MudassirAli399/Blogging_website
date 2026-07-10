import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    DataOfBlogs : [],
    DataOfSearchingPost : [],
    Search : {
        IsUserSearch : false,
        IsContentfind: false,
        ClickOnLoadMore: 0,
        ClickOnSearch : -1
        
    },
    BlogPost : {
        date:"",
        image:"",
        title : "",
        Summary : "",
        Content : "",
        
    },
    Authentication : {
        id : "",
        status : false,
        username : "",
        email : "",
        loader : false,
        StartFetch : true
    },
       
    }
    

const Slice = createSlice({
    name : "user",
    initialState,
    reducers : {
       login: (state, action) => {
                state.Authentication.id = action.payload.id ?? state.Authentication.id;
                state.Authentication.status = action.payload.status ?? state.Authentication.status;
                state.Authentication.username = action.payload.username ?? state.Authentication.username;
                state.Authentication.email = action.payload.email ?? state.Authentication.email;
                state.Authentication.StartFetch = action.payload.StartFetch ?? state.Authentication.StartFetch;
                state.Authentication.loader = action.payload.loader ?? state.Authentication.loader;
            },
        logout : (state,action) => {
            state.Authentication.status = false
            state.Authentication.username = ""
            state.Authentication.email = ""
            state.Authentication.id = ""
        },
        updateblogpost : (state,action) => {
            state.BlogPost.title = action.payload.title
            state.BlogPost.Summary = action.payload.Summary
            state.BlogPost.Content = action.payload.Content
            state.BlogPost.image = action.payload.Image
            state.BlogPost.date=action.payload.Date

        },
        UpdateSearchData: (state, action) => {
    state.Search.IsUserSearch =
        action.payload.IsUserSearch ?? state.Search.IsUserSearch;

    state.Search.IsContentfind =
        action.payload.IsContentfind ?? state.Search.IsContentfind;

    state.Search.ClickOnLoadMore =
        action.payload.increment ?? state.Search.ClickOnLoadMore;

    state.Search.ClickOnSearch =
        action.payload.incrementsearch != null
            ? state.Search.ClickOnSearch + 1
            : state.Search.ClickOnSearch;
},
        DataOfSearchingPost: (state, action) => {
                    if(action.payload.firsttime){
                        state.DataOfSearchingPost = action.payload.data
                    }
                    else {
                    state.DataOfSearchingPost = [
                        ...state.DataOfSearchingPost,
                        ...action.payload.data
                    ];}
                },
        UpdateDataOfBlogs : (state,action) => {
            state.DataOfBlogs = [
                ...state.DataOfBlogs,
                ...action.payload
            ]
        }
    }
})

export const {login,logout,updateblogpost,UpdateSearchData,DataOfSearchingPost,UpdateDataOfBlogs} = Slice.actions
export default Slice.reducer