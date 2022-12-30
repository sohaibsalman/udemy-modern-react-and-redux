import { GoTrashcan } from "react-icons/go";

import { useRemoveAlbumMutation } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";

function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleClick = () => {
    removeAlbum(album);
  };

  const header = (
    <div className="flex items-center">
      <Button
        className="mr-3"
        onClick={handleClick}
        loading={results.isLoading}
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </div>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos for {album.title}
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
