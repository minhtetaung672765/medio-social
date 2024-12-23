import { useApp } from "../ThemedApp";

import { AppBar, Toolbar, Box, Typography, IconButton, Icon } from "@mui/material";

import {
    Menu as MenuIcon,
    Add as AddIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon
} from "@mui/icons-material";


export default function Header() {
    const { showForm, setShowForm, mode, setMode } = useApp();

    // custom added to drawer - CATD
    const { showDrawer, setShowDrawer } = useApp();

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
