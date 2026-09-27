import { useState, type MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useApp } from "../../context/AppContext";
import { useEffect } from "react";

export default function SettingsButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { theme, toggleTheme, language, setLanguage } = useApp();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(theme, language);
  }, [theme, language]);

  return (
    <>
      {/* Settings Icon Button */}
      <IconButton
        onClick={handleClick}
        aria-label="settings"
        sx={{
          border: "1px solid",
          borderRadius: "10px",
          p: 1,
          width: "55px",
          marginX: "20px",
        }}>
        <SettingsIcon className="scale-150" />
      </IconButton>

      {/* Settings Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 260,
              p: 2,
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
          },
        }}>
        {/* Mode Section */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
          Mode
        </Typography>

        <ButtonGroup
          fullWidth
          variant="outlined"
          sx={{
            mb: 2,
            "& .MuiButton-root": {
              textTransform: "none",
              py: 1,
            },
          }}>
          <Button
            onClick={toggleTheme}
            startIcon={<LightModeOutlinedIcon />}
            sx={{
              borderColor: theme === "light" ? "primary.main" : "divider",
              color: theme === "light" ? "primary.main" : "text.secondary",
              bgcolor:
                theme === "light" ? "rgba(25,118,210,0.04)" : "transparent",
            }}>
            Light
          </Button>
          <Button
            onClick={toggleTheme}
            startIcon={<DarkModeOutlinedIcon />}
            sx={{
              borderColor: theme === "dark" ? "primary.main" : "divider",
              color: theme === "dark" ? "primary.main" : "text.secondary",
              bgcolor:
                theme === "dark" ? "rgba(25,118,210,0.04)" : "transparent",
            }}>
            Dark
          </Button>
        </ButtonGroup>

        <Divider sx={{ mb: 2 }} />

        {/* Language Section */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
          Language
        </Typography>

        <ButtonGroup
          fullWidth
          variant="outlined"
          sx={{
            mb: 2,
            "& .MuiButton-root": {
              textTransform: "none",
              py: 1,
            },
          }}>
          <Button
            onClick={() => setLanguage("en")}
            sx={{
              borderColor: language === "en" ? "primary.main" : "divider",
              color: language === "en" ? "primary.main" : "text.secondary",
              bgcolor:
                language === "en" ? "rgba(25,118,210,0.04)" : "transparent",
            }}>
            En
          </Button>
          <Button
            onClick={() => setLanguage("fa")}
            sx={{
              borderColor: language === "fa" ? "primary.main" : "divider",
              color: language === "fa" ? "primary.main" : "text.secondary",
              bgcolor:
                language === "fa" ? "rgba(25,118,210,0.04)" : "transparent",
            }}>
            Fa
          </Button>
        </ButtonGroup>

        <Divider sx={{ mb: 1 }} />

        {/* Exit */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1,
            py: 1,
            cursor: "pointer",
            borderRadius: "6px",
            color: "text.primary",
            "&:hover": { bgcolor: "action.hover" },
          }}
          onClick={handleClose}>
          <LogoutOutlinedIcon fontSize="small" />
          <Typography variant="body2">Exit</Typography>
        </Box>
      </Menu>
    </>
  );
}
