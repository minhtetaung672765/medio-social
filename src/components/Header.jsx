import { useApp } from "../ThemedApp";

import { AppBar, Toolbar, Box, Typography, Badge, IconButton, Icon } from "@mui/material";

import {
    Menu as MenuIcon,
    Add as AddIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    Search as SearchIcon,
    Notifications as NotiIcon
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchNotis } from "../libs/fetcher";

export default function Header() {
    const navigate = useNavigate();
    const { showForm, setShowForm, auth, mode, setMode } = useApp();

    // custom added to drawer - CATD
    const { showDrawer, setShowDrawer } = useApp();

    const { isLoading, isError, data } = useQuery(
        ["notis", auth], fetchNotis
    );

    function notiCount() {
        if (!auth) return 0;
        if (isLoading || isError) return 0;
        return data.filter(noti => !noti.read).length;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start">
                    <MenuIcon
                        onClick={() => setShowDrawer(true)}  // CATD
                    />
                </IconButton>

                <Typography sx={{ flexGrow: 1, ml: 2 }}>Yaycha</Typography>

                <Box>
                    <IconButton
                        color="inherit"
                        onClick={() => setShowForm(!showForm)}>
                        <AddIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={() => navigate("/search")}>
                        <SearchIcon />
                    </IconButton>

                    {
                        auth && (
                            <IconButton
                                color="inherit"
                                onClick={() => navigate("/notis")}>
                                <Badge
                                    color="error"
                                    badgeContent={
                                        notiCount()}>
                                    <NotiIcon />
                                </Badge>
                            </IconButton>
                        )
                    }

                    {/* Use button UI according to mode */}
                    {mode === "dark" ? (
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("light")}>
                            <LightModeIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("dark")}>
                            <DarkModeIcon />
                        </IconButton>
                    )}

                </Box>
            </Toolbar>
        </AppBar>
    )

}
