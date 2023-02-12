export default function Head({ params }: { params: { slug: string } }) {
  return (
    <>
      <title>Lab Calculator</title>
      <meta
        name="description"
        content="Calculator web app to for getting your needed concentrations."
      />
    </>
  );
}
