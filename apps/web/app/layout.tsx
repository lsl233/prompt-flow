export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900 selection:bg-emerald-200 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
