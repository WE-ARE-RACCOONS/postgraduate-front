function Photo({
  handler,
}: {
  handler: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handler(imageUrl);
    }
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
