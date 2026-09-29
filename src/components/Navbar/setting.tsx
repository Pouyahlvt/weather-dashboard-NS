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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SettingsButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng: "fa" | "en") => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Settings Icon Button */}
      <IconButton
        className="text-text dark:text-text-dark w-12 h-12 max-sm:w-8 max-sm:h-8 "
        onClick={handleClick}
        aria-label="settings"
        sx={{
          border: "2px solid",
          color: "currentcolor",
          borderRadius: "10px",
          p: 1,
        }}>
        <SettingsIcon className="scale-150 text-text dark:text-text-dark max-sm:scale-100" />
      </IconButton>

      {/* Settings Dropdown */}
      <Menu
        dir="ltr"
        className=" text-text dark:text-text-dark"
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
              backgroundColor: theme === "light" ? "#f3fafe" : "#151d32",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
          },
        }}>
        {/* Mode Section */}
        <Typography
          className="text-text dark:text-text-dark"
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 1 }}>
          Mode
        </Typography>

        <ButtonGroup
          className="bg-dashbord-bg dark:bg-dashbord-bg-dark text-text dark:text-text-dark"
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
            className="bg-dashbord-bg dark:bg-dashbord-bg-dark text-text dark:text-text-dark"
            onClick={toggleTheme}
            startIcon={<LightModeOutlinedIcon />}>
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
          className="text-text dark:text-text-dark"
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 1 }}>
          Language
        </Typography>

        <ButtonGroup
          className="bg-dashbord-bg dark:bg-dashbord-bg-dark text-text dark:text-text-dark"
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
            className="bg-dashbord-bg dark:bg-dashbord-bg-dark text-text dark:text-text-dark"
            onClick={() => changeLanguage("en")}
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              bgcolor: language === "en" ? "#fafafa10" : "transparent",
            }}>
            En
          </Button>
          <Button
            className="bg-dashbord-bg dark:bg-dashbord-bg-dark text-text dark:text-text-dark"
            onClick={() => changeLanguage("fa")}
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              bgcolor: language === "fa" ? "#fafafa10" : "transparent",
            }}>
            {t("common.persian")}
          </Button>
        </ButtonGroup>

        <Divider sx={{ mb: 1 }} />

        <div className="bg-dashbord-bg dark:bg-dashbord-bg-dark text-text dark:text-text-dark">
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
            onClick={() => navigate("/")}>
            <LogoutOutlinedIcon
              fontSize="small"
              className=" text-text dark:text-text-dark"
            />
            <Typography
              variant="body2"
              className="bg text-text dark:text-text-dark">
              Exit
            </Typography>
          </Box>
        </div>
      </Menu>
    </>
  );
}
