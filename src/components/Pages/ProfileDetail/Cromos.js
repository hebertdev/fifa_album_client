import { useContext } from "react";

//next modified
import RouterLink from "components/Next/Link";

//react query
import { useQuery } from "@tanstack/react-query";

//services
import { getCromos } from "services/cromos";

//context
import UserContext from "contexts/UserContext";

//components
import StickerCard from "components/StickerCard";

//material UI
import { Grid, Typography, TextField, Button } from "@mui/material";

export function Cromos({ profileDetail }) {
  const { user } = useContext(UserContext);
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
      {/* <TextField
        id="outlined-basic"
        label="Buscar cromo"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ marginBottom: "10px" }}
      /> */}
      {isError && <Typography variant="h6">Error</Typography>}
      {data?.results?.length === 0 && (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
          }}
        >
          {user.username === profileDetail.user.username ? (
            <>
              No tienes cromos <br />
              <Button
                variant="outlined"
                component={RouterLink}
                href="/worldcup/packs"
              >
                Obtenlos aquí
              </Button>
            </>
          ) : (
            <>{profileDetail.user.username} no tiene cromos</>
          )}
        </Typography>
      )}
      {isLoading ? (
        <Typography variant="h6">Cargando...</Typography>
      ) : (
        <>
          {data?.results?.length > 0 && (
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
      )}
    </>
  );
}
