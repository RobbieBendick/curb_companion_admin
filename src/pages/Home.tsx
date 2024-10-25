import { FoodBank, SupervisedUserCircle } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../bind-routes";
import { useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(RoutePaths.login);
    }
  });

  return (
    <>
      {isLoggedIn() && (
        <List>
          <ListItemButton onClick={() => navigate(RoutePaths.vendors)}>
            <ListItemIcon>
              <FoodBank />
            </ListItemIcon>
            <ListItemText primary="Vendors" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate(RoutePaths.users)}>
            <ListItemIcon>
              <SupervisedUserCircle />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>
      )}
    </>
  );
}
