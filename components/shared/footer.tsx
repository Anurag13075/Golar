"use client";


export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-bold text-xl text-slate-900">
            🌾 Fasal Rakshak
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Protecting farmers&apos; claims, one report at a time.
          </p>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-sm font-semibold text-slate-700 mb-1">
            AWS India Builder Tour Hackathon 2026
          </p>
          <p className="text-xs text-slate-400 font-medium max-w-xs">
            Not affiliated with the Government of India. This is an assistive AI tool.
          </p>
        </div>
      </div>
    </footer>
  );
}
