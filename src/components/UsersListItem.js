import React from "react";
import { GoTrashcan } from "react-icons/go";

import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";

function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <React.Fragment>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user</div>}
      {user.name}
    </React.Fragment>
  );

  return <ExpandablePanel header={header}>CONTENT!!</ExpandablePanel>;
}

export default UsersListItem;
