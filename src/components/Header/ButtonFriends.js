//next modified
import RouterLink from "components/Next/Link";

//react query
import { useQuery } from "@tanstack/react-query";

//services
import { total_friend_request } from "services/friends";

//Materil UI
import { IconButton, Badge } from "@mui/material";

import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

export function ButtonFriends({ user }) {
  const { data, isLoading, isError } = useQuery(
    ["total_friend_request", user?.username],
    () => total_friend_request(user?.username),
    {
      staleTime: 3000,
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
      keepPreviousData: true,
    }
  );

  return (
    <IconButton component={RouterLink} href="/friends/requests">
      <Badge badgeContent={data} color="error">
        <GroupAddOutlinedIcon />
      </Badge>
    </IconButton>
  );
}
