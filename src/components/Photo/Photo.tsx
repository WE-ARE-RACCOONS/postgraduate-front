function Photo({
  handler,
}: {
  handler: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handler(e.currentTarget.files ? e.currentTarget.files[0] : null);
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
}

export default Photo;