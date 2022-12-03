import { useState, useRef, Fragment, useContext, useEffect } from "react";

//next
import { useRouter } from "next/router";

//services
import { search_friends } from "services/friends";

//context
import UserContext from "contexts/UserContext";

//components
import UserCard from "components/UserCard";

//material UI
import {
  Typography,
  Paper,
  InputBase,
  IconButton,
  Dialog,
  DialogContent,
  CircularProgress,
  Box,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export function SearchFriend({ alertSms }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");
  const [accounts, setAccounts] = useState(null);
  const [notes, setNotes] = useState(null);

  let inputSearchRef1 = useRef(null);
  let inputSearchRef = useRef(null);

  useEffect(() => {
    router.events.on("routeChangeStart", async () => {
      handleCloseModalSearch();
    });
  }, [router]);

  const handleChangeInput = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenModalSearch = () => {
    setOpenModalSearch(true);
  };

  const handleCloseModalSearch = async () => {
    try {
      await setOpenModalSearch(false);
      inputSearchRef1.current.blur();
      setSearch("");
      setPrevSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (search === prevSearch) return;
    if (search.length === 0) return;
    try {
      setLoading(true);
      handleOpenModalSearch();
      const accs = await search_friends(search);
      setAccounts(accs.results);

      setLoading(false);
      setPrevSearch(search);
      if (accs.results.length === 0) {
        console.log("no results");
        inputSearchRef.current.focus();
      } else {
        inputSearchRef.current.blur();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: "1px",
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
        }}
        component="form"
        onSubmit={handleSubmitSearch}
        variant="outlined"
      >
        <InputBase
          sx={{ ml: 1, flex: 1, padding: "3px" }}
          placeholder={`Buscar amigos`}
          onChange={handleChangeInput}
          value={search}
          inputRef={inputSearchRef1}
        />

        {loading ? (
          <IconButton type="button">
            <CircularProgress size="20px" />
          </IconButton>
        ) : (
          <IconButton type="submit">
            <SearchOutlinedIcon />
          </IconButton>
        )}
      </Paper>
      <br />
      <Dialog open={openModalSearch} onClose={handleCloseModalSearch}>
        <Paper
          sx={{
            p: "3px",
            display: "flex",
            alignItems: "center",
          }}
          component="form"
          onSubmit={handleSubmitSearch}
          variant="outlined"
        >
          <InputBase
            sx={{ ml: 1, flex: 1, p: 1 }}
            placeholder={`Realiza una busqueda de tus cuentas, notas , etc...`}
            onChange={handleChangeInput}
            value={search}
            inputRef={inputSearchRef}
          />

          {loading ? (
            <IconButton type="button">
              <CircularProgress size="20px" />
            </IconButton>
          ) : (
            <IconButton type="submit">
              <SearchOutlinedIcon />
            </IconButton>
          )}
        </Paper>
        <>
          {!loading && (
            <DialogContent sx={{ padding: "10px" }}>
              {accounts?.length > 0 ? (
                <Box sx={{ marginBottom: "20px" }}>
                  {accounts?.map((account) => (
                    <Fragment key={account.username}>
                      {user?.username !== account.username && (
                        <UserCard alertSms={alertSms} profile={account} />
                      )}
                    </Fragment>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  No se encontraron resultados
                </Typography>
              )}
            </DialogContent>
          )}
        </>
      </Dialog>
    </>
  );
}
