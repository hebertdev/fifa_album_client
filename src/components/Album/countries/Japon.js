import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { japon as japon_cromos } from "utils/cromos/japon_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import japon_wallpaper_right from "assets/album/argentina-right.webp";
import japon_wallpaper_left from "assets/album/argentina-left.webp";
import qatar_flag from "assets/album/countries/JPN.png";

export const JaponLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Japón"}
        color="#74accc"
        flag={qatar_flag.src}
        wallpaper={japon_wallpaper_right.src}
        team_name={"Asociación de Fútbol de Japón"}
        default_cromos={japon_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const JaponRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "E";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Japón"}
        color="#74accc"
        wallpaper={japon_wallpaper_left.src}
        default_cromos={japon_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

JaponLeft.displayName = "JaponLeft";
JaponRight.displayName = "JaponRight";
