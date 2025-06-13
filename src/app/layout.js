import "./globals.css";

export const metadata = {
  title: "Plume Wallet Stats",
  description: "Xem thống kê ví Plume",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="https://portal.plume.org/assets/plume-logo-icon.svg" />
        <script
          id="adsbygoogle"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1926430378604866"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        style={{
          minHeight: "100vh",
          position: "relative",
          margin: 0,
          fontFamily: "'Montserrat', Arial, sans-serif",
          overflowX: "hidden",
        }}
      >
        {/* Các blob pastel hiệu ứng nền */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "#d2bfff",
            filter: "blur(60px)",
            opacity: 0.6,
            left: -100,
            top: -120,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "#bfffe0",
            filter: "blur(60px)",
            opacity: 0.6,
            right: -150,
            top: 180,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "#ffd6ed",
            filter: "blur(60px)",
            opacity: 0.6,
            left: "50%",
            bottom: -170,
            transform: "translateX(-50%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        {/* Nội dung app */}
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}