import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Tunely — Music, made simple", description: "Discover music from Spotify links and find authorised download options." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
