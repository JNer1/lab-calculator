export default function Head({ params }: { params: { slug: string } }) {
  return (
    <>
      <title>Antibiotic Calculator</title>
      <meta
        name="description"
        content="Web app to calculate your antibiotic solutions."
      />
    </>
  );
}
