import { useState, useEffect } from "react";

//hooks
import useIsMobile from "hooks/useIsMobile";

//components
import { CardCromo } from "./CardCromo";

//Material UI
import { Box, Typography, Grid, CardActionArea } from "@mui/material";

//assets
import none_team from "assets/none_team.jpg";
import logo_fifa_qatar from "assets/logo_2.png";
import GroupOfCountries from "./GroupOfCountries";

export function SheetLeft({
  flag,
  wallpaper,
  country_name,
  team_name,
  default_cromos,
  user_cromos,
  color,
}) {
  return (
    <>
      <div
        style={{
          background: "blue",
          width: "100%",
          height: "100%",
          backgroundColor: color,
          background: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          position: "relative",
          fontFamily: "QatarHeavy",
          boxShadow: " -19px 2px 20px -16px rgba(0,0,0,0.6) inset",
          WebkitBoxShadow: " -19px 2px 20px -16px rgba(0,0,0,0.6) inset",
          MozBoxShadow: " -19px 2px 20px -16px rgba(0,0,0,0.6) inset",
          textShadow:
            "-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)",
          color: "white",
        }}
      >
        <br />
        <picture>
          <img
            src={flag}
            alt="qatar flag"
            style={{
              margin: "auto",
              display: "block",
              border: "2px solid white",
              width: "50px",
              height: "30px",
              background: "white",
              borderRadius: "5px",
            }}
          />
        </picture>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "QatarHeavy",
            marginTop: "10px",
            fontSize: ".9rem",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
        >
          {country_name.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "QatarHeavy",
            fontSize: ".8rem",
            marginBottom: "5px",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
        >
          {team_name}
        </Typography>

        <Figuritas
          cromos_text={default_cromos?.sheetLeft.cromos}
          user_cromos={user_cromos}
          country_code={default_cromos?.code}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            padding: "3px",
            background: "linear-gradient(to right,  #330010 , #8d0930)",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Typography
            sx={{ fontFamily: "inherit", width: "150px", fontSize: ".7rem" }}
          >
            Camino a la <br /> Copa Mundial de la FIFA <br /> Qatar 2022
          </Typography>
        </Box>
      </div>
    </>
  );
}

export function SheetRight({
  wallpaper,
  country_name,
  group,
  default_cromos,
  user_cromos,
  color,
}) {
  return (
    <>
      <div
        style={{
          background: "blue",
          width: "100%",
          height: "100%",
          backgroundColor: color,
          background: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          position: "relative",
          fontFamily: "QatarHeavy",
          textShadow:
            " -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)",
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0",
            padding: "5px",
            background: "linear-gradient(to right,  #330010 , #8d0930)",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            right: "20px",
          }}
        >
          <picture>
            <img
              src={logo_fifa_qatar.src}
              alt="logo fifa qatar"
              style={{ width: `${useIsMobile() ? "50px" : "70px"}` }}
            />
          </picture>
        </Box>
        <br />
        <CardActionArea
          sx={{
            width: "70px",
            height: "70px",
            margin: "auto",
            marginBottom: "15px",
            position: "relative",
          }}
        >
          <picture>
            <img
              src={none_team.src}
              alt=""
              style={{
                width: "100%",
                display: "block",
                margin: "auto",
                marginBottom: "25px",
                boxShadow: "5px 5px 4px 2px rgba(0,0,0,0.2)",
                WebkitBoxShadow: "5px 5px 4px 2px rgba(0,0,0,0.2)",
                MozBoxShadow: "5px 5px 4px 2px rgba(0,0,0,0.2)",
              }}
            />
          </picture>
          <Box
            sx={{
              position: "absolute",
              bottom: "5px",
              color: "black",
              textAlign: "center",
              fontSize: "13px",
              padding: "5px",
              left: "0",
              right: "0",
              fontSize: "0.8rem",
              margin: "auto",
              "@media (max-width: 600px)": {
                fontSize: ".6rem",
              },
            }}
          >
            {default_cromos?.logo.name}
            <br />
            <small style={{ fontSize: ".6rem" }}>
              {default_cromos?.logo.type}
            </small>
          </Box>
        </CardActionArea>

        <Figuritas
          country_code={default_cromos?.code}
          cromos_text={default_cromos?.sheetRight.cromos}
          user_cromos={user_cromos}
        />

        <GroupOfCountries group={group} />
      </div>
    </>
  );
}

function Figuritas({ cromos_text, user_cromos }) {
  return (
    <>
      <Box sx={{ width: "85%", margin: "auto" }}>
        <Grid container spacing={4}>
          {cromos_text?.map((cromo, index) => (
            <Grid item xs={4} md={4} key={index}>
              <CardCromo cromo={cromo} user_cromos={user_cromos} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
