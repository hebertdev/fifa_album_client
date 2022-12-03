//material UI
import { Box, Typography, Card, Tooltip, CardMedia } from "@mui/material";

export default function StickerCard({ sticker }) {
  return (
    <>
      <Card>
        <CardMedia component="img" image={sticker.sticker_variant.picture} />
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

        <Tooltip title="Debut selección">
          <Typography
            variant="caption"
            sx={{ textAlign: "center", display: "block" }}
          >
            {new Date(sticker.sticker_variant.sticker.debut).getFullYear()}
          </Typography>
        </Tooltip>
      </Box>
    </>
  );
}
