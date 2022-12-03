import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { tunez as tunez_cromos } from "utils/cromos/tunez_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import tunez_wallpaper_right from "assets/album/polonia_right.png";
import tunez_wallpaper_left from "assets/album/polonia_left.png";
import qatar_flag from "assets/album/countries/TUN.png";

export const TunezLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Túnez"}
        flag={qatar_flag.src}
        wallpaper={tunez_wallpaper_right.src}
        team_name={"Federación Tunecina de Fútbol"}
        default_cromos={tunez_cromos}
      />
    </div>
  );
});

export const TunezRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "D";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Túnez"}
        wallpaper={tunez_wallpaper_left.src}
        default_cromos={tunez_cromos}
      />
    </div>
  );
});

TunezLeft.displayName = "TunezLeft";
TunezRight.displayName = "TunezRight";
