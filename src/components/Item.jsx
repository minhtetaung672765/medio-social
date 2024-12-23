import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";

import {
    Alarm as TimeIcon,
    AccountCircle as UserIcon,
    Delete as DeleteIcon
} from "@mui/icons-material";

import { green } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

import { formatRelative } from "date-fns";

export default function Item({ item, remove, primary, comment }) {
    // 'item' property is taken as a property object
    // 'remove' property is taken as a function

    const navigate = useNavigate();

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
                    <IconButton
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
                </Box>

                <Typography sx={{ my: 3 }}>{item.content}</Typography>

                <Box
                    onClick={e => {
                        navigate(`/profile/${item.user.id}`);
                        e.
                            stopPropagation();
                    }}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                    }}>
                    <UserIcon sx={{ fontSize: 12, color: "info" }} />
                    <Typography variant="caption">{item.user.name}</Typography>
                </Box>

            </CardContent>
        </Card>
    );
}