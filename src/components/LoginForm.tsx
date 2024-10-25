import { Button, Grid, TextField, Typography } from "@mui/material";
import { LoginContext } from "../context/LoginContext";
import { useContext, useState } from "react";
import { LoginRequest } from "../models/Requests";

export default function LoginForm() {
  const { login, error } = useContext(LoginContext);
  const [loginRequest, updateLoginRequest] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        height={"80vh"}
      >
        <Grid item>
          <Typography
            variant="h5"
            noWrap
            sx={{
              justifyContent: "center",
              flexGrow: 1,
              fontWeight: 500,
              letterSpacing: { xs: ".1rem", md: ".15rem" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGIN
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: { xs: "15rem", md: "20rem" } }}
            id="filled-email-input"
            label="Email"
            type="email"
            autoComplete="current-email"
            onChange={(element) =>
              updateLoginRequest({
                ...loginRequest,
                email: element.target.value,
              })
            }
            variant="filled"
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: { xs: "15rem", md: "20rem" } }}
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(element) =>
              updateLoginRequest({
                ...loginRequest,
                password: element.target.value,
              })
            }
            variant="filled"
          />
        </Grid>
        <Grid item>
          {error && error.length > 0 && (
            <Typography
              noWrap
              sx={{
                justifyContent: "center",
                flexGrow: 1,
                color: "red",
                textDecoration: "none",
              }}
            >
              {error}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Button
            sx={{ width: { xs: "15rem", md: "20rem" } }}
            onClick={() => {
              login(loginRequest);
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
