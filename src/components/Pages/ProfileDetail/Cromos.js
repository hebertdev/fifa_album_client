//react query
import { useQuery } from "@tanstack/react-query";

//services
import { getCromos } from "services/cromos";

//components
import StickerCard from "components/StickerCard";

//material UI
import { Grid, Typography, TextField } from "@mui/material";

export function Cromos({ profileDetail }) {
  const { data, isLoading, isError } = useQuery(
    ["user_cromos_feed", profileDetail.user.username],
    () => getCromos(profileDetail.user.username),
    {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      refetchInterval: 180000,
      keepPreviousData: true,
    }
  );

  return (
    <>
      <br />
      <TextField
        id="outlined-basic"
        label="Buscar cromo"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ marginBottom: "10px" }}
      />
      {isError && <Typography variant="h6">Error</Typography>}
      {isLoading ? (
        <Typography variant="h6">Cargando...</Typography>
      ) : (
        <Grid container spacing={2}>
          {data && (
            <>
              {data?.results?.map((cromo) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={cromo.slug}>
                  <StickerCard sticker={cromo} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      )}
    </>
  );
}
