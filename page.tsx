"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Disc3, Download, ExternalLink, Link2, ListMusic, LoaderCircle, Music2, ShieldCheck, Sparkles } from "lucide-react";
type Result = { kind: "track"|"album"|"playlist"; id: string; canonicalUrl: string; status: string; message: string };
export default function Home() {
  const [url,setUrl] = useState(""); const [result,setResult] = useState<Result|null>(null); const [error,setError] = useState(""); const [loading,setLoading] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setResult(null); setLoading(true);
    try { const response = await fetch("/api/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url})});
      const data = await response.json(); if(!response.ok) throw new Error(data.error ?? "Something went wrong."); setResult(data);
    } catch(e) { setError(e instanceof Error ? e.message : "Unable to process link."); } finally { setLoading(false); }
  }
  return <main className="mesh min-h-screen">
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-7">
      <a href="/" className="flex items-center gap-3 text-2xl font-black tracking-tight"><span className="rounded-xl bg-[#1ed760] p-2 text-[#07140a]"><Music2 size={23}/></span>tunely<span className="text-[#1ed760]">.</span></a>
      <nav className="flex items-center gap-5 text-sm text-[#b5c3b8]"><a href="#how" className="hover:text-white">How it works</a><a href="#about" className="hover:text-white">About</a></nav>
    </header>
    <section className="mx-auto max-w-4xl px-5 pb-16 pt-20 text-center sm:pt-28">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#285e3b] bg-[#15321f] px-4 py-2 text-xs font-bold tracking-widest text-[#71e99b]"><Sparkles size={14}/> MUSIC, SIMPLIFIED</span>
      <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">Your music.<br/><span className="text-[#1ed760]">Your way.</span></h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#a7b8ac] sm:text-lg">Paste a Spotify track, album or playlist link to explore authorised music download options.</p>
      <form onSubmit={submit} className="glass mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl p-3 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-3"><Link2 className="shrink-0 text-[#7f9c87]" size={20}/><input aria-label="Spotify URL" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://open.spotify.com/track/..." className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#788b7d]" required/></div>
        <button disabled={loading} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1ed760] px-6 py-4 font-bold text-[#08170d] transition hover:bg-[#49e67f] disabled:opacity-60">{loading?<LoaderCircle className="animate-spin" size={18}/>:<ArrowRight size={18}/>} {loading?"Checking...":"Find music"}</button>
      </form>
      {error && <p role="alert" className="mx-auto mt-4 max-w-2xl rounded-xl border border-red-800 bg-red-950/40 p-4 text-left text-sm text-red-200">{error}</p>}
      {result && <section aria-live="polite" className="glass mx-auto mt-5 max-w-2xl rounded-2xl p-6 text-left"><div className="flex items-center gap-3"><CheckCircle2 className="text-[#1ed760]"/><div><p className="font-bold capitalize">Valid {result.kind} link</p><p className="mt-1 break-all text-xs text-[#a7b8ac]">Spotify ID: {result.id}</p></div></div><p className="mt-4 text-sm leading-6 text-[#a7b8ac]">{result.message}</p><a href={result.canonicalUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1ed760] hover:underline">View original on Spotify <ExternalLink size={15}/></a><div className="mt-4 rounded-lg bg-[#18241b] p-3 text-xs text-[#b5c3b8]">Downloads are disabled until an authorised audio provider is integrated. No Spotify audio is extracted.</div></section>}
      <div className="mt-9 flex flex-wrap justify-center gap-3">{[[Music2,"Songs"],[Disc3,"Albums"],[ListMusic,"Playlists"]].map(([Icon,label])=><span key={label as string} className="flex items-center gap-2 rounded-full border border-[#2c3d31] px-4 py-2 text-sm text-[#b4c7b8]"><Icon size={16}/>{label as string}</span>)}</div>
    </section>
    <section id="how" className="mx-auto max-w-6xl px-5 py-14"><h2 className="text-center text-3xl font-bold">Simple from start to finish</h2><p className="mt-3 text-center text-[#9fb2a3]">A transparent path from link to licensed music.</p><div className="mt-9 grid gap-4 md:grid-cols-3">{[{Icon:Link2,title:"1. Paste a link",desc:"Share a Spotify song, album or playlist URL."},{Icon:ShieldCheck,title:"2. Check sources",desc:"We check available authorised catalogues and permissions."},{Icon:Download,title:"3. Download when allowed",desc:"Get the permitted audio file, or see legal listening alternatives."}].map(({Icon,title,desc})=><div key={title} className="glass rounded-2xl p-7"><Icon size={28} className="text-[#1ed760]"/><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#a6b8aa]">{desc}</p></div>)}</div></section>
    <section id="about" className="mx-auto max-w-4xl px-5 py-14 text-center"><h2 className="text-2xl font-bold">Built for music lovers</h2><p className="mt-4 text-sm leading-7 text-[#a7b8ac]">Tunely is an independent project and is not affiliated with Spotify. Spotify links identify tracks; they do not provide downloadable audio or a licence. Availability depends on the recording and source permissions.</p></section>
    <footer className="border-t border-[#24352a] px-5 py-7 text-center text-xs text-[#7d9182]">© {new Date().getFullYear()} Tunely · Independent music discovery project · Stage 1</footer>
  </main>;
}
