import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
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
        email : ""}
    }

const Slice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state,action) => {
            state.Authentication.id = action.payload.id
            state.Authentication.status = action.payload.status
            state.Authentication.username = action.payload.username
            state.Authentication.email = action.payload.email
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
        UpdateSearchData : (state,action) => {
            action.payload.IsUserSearch ? (state.Search.IsUserSearch = action.payload.IsUserSearch) : (state.Search.IsUserSearch = state.Search.IsUserSearch)
            // state.Search.IsUserSearch = action.payload.IsUserSearch
            action.payload.IsContentfind ? (state.Search.IsContentfind = action.payload.IsContentfind) : (state.Search.IsContentfind = state.Search.IsContentfind)
            // state.Search.IsContentfind = action.payload.IsContentfind
            action.payload.increment ? (state.Search.ClickOnLoadMore = action.payload.increment) : (state.Search.ClickOnLoadMore = state.Search.ClickOnLoadMore)
            action.payload.incrementsearch ? (state.Search.ClickOnSearch = state.Search.ClickOnSearch + 1) : (state.Search.ClickOnSearch = state.Search.ClickOnSearch)

            // if(action.payload.increment){
            //     state.Search.ClickOnLoadMore = state.Search.ClickOnLoadMore + 1
            // }
            // if(action.payload.incrementsearch){
            //     state.Search.ClickOnSearch = state.Search.ClickOnSearch + 1
            // }
        },
        DataOfSearchingPost : (state,action) => {
            state.DataOfSearchingPost = action.payload
        }
    }
})

export const {login,logout,updateblogpost,UpdateSearchData,DataOfSearchingPost} = Slice.actions
export default Slice.reducer