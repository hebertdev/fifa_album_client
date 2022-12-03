//Material UI
import { Box, Typography } from "@mui/material";

export default function GroupOfCountries(props) {
  const { group } = props;

  return (
    <Box
      sx={{
        background: group.color ? group.color : "#85144b",
        position: "absolute",
        bottom: "20px",
        right: 0,
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
        display: "flex",
        alignItems: "center",
        padding: "3px 10px",
        fontFamily: "QatarHeavy",
      }}
    >
      <Box sx={{ marginRight: "10px" }}>
        <Typography sx={{ fontFamily: "inherit", fontSize: ".9rem" }}>
          GRUPO {group.group}{" "}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        {group?.countries?.map((country, index) => (
          <Box sx={{ marginRight: "10px" }} key={index}>
            <picture>
              <img
                src={country.flag}
                alt=""
                width={25}
                style={{
                  boxShadow: "0px 0px 8px 0px rgba(255,255,255,0.2)",
                  borderRadius: "1px",
                }}
              />
            </picture>
            <Typography
              sx={{
                fontSize: "10px",
                fontFamily: "inherit",
                wordBreak: "overflow-wrap",
                whiteSpace: "pre-wrap",
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{
                __html: country.name,
              }}
            ></Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
