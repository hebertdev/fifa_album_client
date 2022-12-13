//material UI
import { Box, Typography, Card, Tooltip, CardMedia } from "@mui/material";

import normal from "assets/normal-anonimous.webp";
import legendario from "assets/legendario-anonimous.webp";
import mitico from "assets/mitico-anonimous.webp";
import emblema_normal from "assets/none-emblema-normal.webp";
import emblema_legendario from "assets/none-emblema-legendario.webp";
import emblema_mitico from "assets/none-emblema-mitico.webp";

export default function StickerCard({ sticker }) {
  console.log(sticker);
  return (
    <>
      <Card>
        <CardMedia
          component="img"
          image={
            sticker.sticker_variant.sticker.sticker_type === "3"
              ? sticker.sticker_variant.picture
                ? sticker.sticker_variant.picture
                : sticker.sticker_variant.variant === "Common"
                ? emblema_normal.src
                : sticker.sticker_variant.variant === "Legendary"
                ? emblema_legendario.src
                : emblema_mitico.src
              : sticker.sticker_variant.picture
              ? sticker.sticker_variant.picture
              : sticker.sticker_variant.variant === "Common"
              ? normal.src
              : sticker.sticker_variant.variant === "Legendary"
              ? legendario.src
              : mitico.src
          }
        />
      </Card>
      <Typography
        variant="caption"
        sx={{ textAlign: "center", display: "block" }}
      >
        {sticker.sticker_variant.variant}
      </Typography>
      <Box>
        <Typography
          variant="caption"
          sx={{ textAlign: "center", display: "block" }}
        >
          {sticker.sticker_variant.sticker.name}
        </Typography>

        <Tooltip
          title={`Debut selección - ${sticker.sticker_variant.sticker.country.name}`}
        >
          <Typography
            variant="caption"
            sx={{ textAlign: "center", display: "block" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {new Date(sticker.sticker_variant.sticker.debut).getFullYear()}{" "}
              <picture>
                <img
                  src={sticker.sticker_variant.sticker.country.flag}
                  alt={sticker.sticker_variant.sticker.country.name}
                  style={{
                    width: "18px",
                    marginLeft: "5px",
                  }}
                />
              </picture>
            </Box>
          </Typography>
        </Tooltip>
      </Box>
    </>
  );
}
