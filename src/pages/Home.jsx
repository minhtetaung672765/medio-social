import { useState, useEffect } from "react";
import { Alert, Box } from "@mui/material";
import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";

import { useQuery, useMutation } from "react-query";
import { queryClient } from "../ThemedApp";

import { postPost } from "../libs/fetcher";

//  api route from .env
const api = import.meta.env.VITE_API;

export default function Home() {
    const { showForm, auth, setGlobalMsg } = useApp();

    // React query
    // Eliminates the need for useState and useEffect
    // useQuery accepts two parameters: 'query key' and 'fun that returns a promise'
    const { isLoading, isError, error, data } = useQuery("posts",
        async () => {
            const res = await fetch(`${api}/content/posts`);
            return res.json();
        });

    // useMutation is used to perform api process and its following event 
    // useMutation will return an object
    const remove = useMutation(
        async id => {
            await fetch(`${api}/content/posts/${id}`, {
                method: "DELETE",
            });
        },
        {
            // at the same time api performs delete, onMutate will updates the post query
            onMutate: id => {
                // reset current query
                queryClient.cancelQueries("posts");
                // update query with newly filtered data
                queryClient.setQueryData("posts", old =>
                    old.filter(item => item.id !== id)
                );
                setGlobalMsg("A post deleted");
            },
        }
    );

    // const add = (content, name) => {
    //     // create an id after the last
    //     const id = data[0].id + 1;
    //     setData([{ id, content, name }, ...data]);
    //     setGlobalMsg("An item added");
    // };

    const add = useMutation(async content => postPost(content), {
        onSuccess: async post => {
            await queryClient.cancelQueries("posts");
            await queryClient.setQueryData("posts", old => [post, ...old]);
            setGlobalMsg("A post added");
        }
    });

    if (isError) {
        return (
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        );
    }
    if (isLoading) {
        return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
    }

    return (
        <Box>
            {showForm && auth && <Form add={add} />}
            {data.map(item => {
                return (
                    // used mutate object from remove
                    <Item key={item.id} item={item} remove={remove.mutate} />
                );
            })}
        </Box>
    );
}
