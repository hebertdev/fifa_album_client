import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { portugal as portugal_cromos } from "utils/cromos/portugal_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import portugal_wallpaper_right from "assets/album/mexico-right.webp";
import portugal_wallpaper_left from "assets/album/mexico-left.webp";
import qatar_flag from "assets/album/countries/PRT.png";

export const PortugalLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Portugal"}
        color="#2a522e"
        flag={qatar_flag.src}
        wallpaper={portugal_wallpaper_right.src}
        team_name={"Federación Portuguesa de Fútbol"}
        default_cromos={portugal_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const PortugalRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "H";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Portugal"}
        color="#2a522e"
        wallpaper={portugal_wallpaper_left.src}
        default_cromos={portugal_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

PortugalLeft.displayName = "PortugalLeft";
PortugalRight.displayName = "PortugalRight";
