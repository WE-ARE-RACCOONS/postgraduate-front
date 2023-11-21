function Photo({
  handler,
}: {
  handler: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handler(e.currentTarget.files ? e.currentTarget.files[0].name : '');
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
