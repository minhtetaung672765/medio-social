import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";

import {
    Alarm as TimeIcon,
    AccountCircle as UserIcon,
    Delete as DeleteIcon,
    Iso
} from "@mui/icons-material";

import { green } from "@mui/material/colors";

import { json, useNavigate } from "react-router-dom";

import { formatRelative } from "date-fns";

import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import { useApp } from "../ThemedApp";
import { useQuery, useMutation } from "react-query";

const api = import.meta.env.VITE_API;

export default function Item({ item, remove, primary, comment }) {

    const navigate = useNavigate();
    const { auth } = useApp();

    // query for fetching the post item
    const { error, data } = useQuery(
        // fetch query whenever item.postId and comment status changes
        ["current_post", item.postId, comment], // Include dependencies
        async () => {
            if (!comment) return null; // Exit early if no comment
            const id = item.postId;
            const res = await fetch(`${api}/content/posts/${id}`);
            return res.json();
        },
        {
            enabled: !!comment && !!item.postId, // Prevent query if dependencies are missing
        }
    );

    // for displaying owner previlleged components like 'delete button'
    const isOwner = () => {
        // if logged in user and item owner are the same
        if (auth && Number(auth.id) === Number(item.userId)) {
            return true;
        }
        // if the item is comment
        // if the logged in user and post owner are the same (post owner can delete every com)
        if (comment && auth && data && Number(auth.id) === Number(data.userId)) {
            return true;
        }
        return false;
    };

    return (
        <Card sx={{ mb: 2 }}>
            {primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}

            {/* make the card navigate to its comment page when it's clicked */}
            <CardContent onClick={() => {
                if (comment) return false;
                navigate(`/comments/${item.id}`);
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1
                    }}>

                        <TimeIcon sx={{ fontSize: 10, color: "success" }} />

                        <Typography
                            variant="caption"
                            sx={{ color: green[500] }}>
                            {formatRelative(item.created, new Date())}
                        </Typography>
                    </Box>
                    {isOwner() ? (<IconButton
                        size="small"
                        // 
                        // "stopPropagation" make continuous events unimpacted 
                        // this ensures only delete event occurs when the button is clicked
                        // without this, the card will also navigate to comment page due to its 
                        // - triggered event, as the delete button is a part of card content
                        onClick={e => {
                            remove(item.id);
                            e.stopPropagation(); // *
                        }}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    ) : <></>}
                </Box>

                <Typography sx={{ my: 3 }}>{item.content}</Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                    <Box
                        onClick={e => {
                            navigate(`/profile/${item.user.id}`);
                            e.stopPropagation();
                        }}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                        }}>
                        <UserIcon
                            fontSize="12"
                            color="info"
                        />
                        <Typography variant="caption">
                            {item.user.name}
                        </Typography>
                    </Box>
                    <Box>
                        <LikeButton item={item} comment={comment} />
                        <CommentButton item={item} comment={comment} />
                    </Box>
                </Box>

            </CardContent>
        </Card>
    );
}