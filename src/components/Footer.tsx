export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&lt; .warasugi /&gt; © {currentYear}</p>
      <p>Crafted with code, creativity, and a little bit of chaos</p>
    </footer>
  );
}
