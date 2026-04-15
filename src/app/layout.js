import "./globals.css";

export const metadata = {
  title: "Shivnandi Pure Veg Restaurant",
  description: "Experience the divine taste of authentic vegetarian cuisine.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
