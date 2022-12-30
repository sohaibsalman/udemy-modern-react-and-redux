import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Button from "../components/Button";
import Skeleton from "../components/Skeleton";
import ExpandablePanel from "../components/ExpandablePanel";

function AlbumsList({ user }) {
  const { data, isLoading, error } = useFetchAlbumsQuery(user);
  const [addAlbum, result] = useAddAlbumMutation();

  const handleClick = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} className="w-full h-10" />;
  } else if (error) {
    content = <div>Error fetching albums!</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos for {album.title}
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button
          loading={result.isLoading}
          className="mb-2"
          onClick={handleClick}
        >
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
