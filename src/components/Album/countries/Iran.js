import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//utils
import { iran as iran_cromos } from "utils/cromos/iran_cromos";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import iran_wallpaper_right from "assets/album/iran_right.png";
import iran_wallpaper_left from "assets/album/iran_left.png";
import qatar_flag from "assets/album/countries/IRN.png";

export const IranLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Irán"}
        flag={qatar_flag.src}
        wallpaper={iran_wallpaper_right.src}
        team_name={"Federación de Fútbol de Irán"}
        default_cromos={iran_cromos}
      />
    </div>
  );
});

export const IranRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "B";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Irán"}
        wallpaper={iran_wallpaper_left.src}
        default_cromos={iran_cromos}
      />
    </div>
  );
});

IranLeft.displayName = "IranLeft";
IranRight.displayName = "IranRight";
