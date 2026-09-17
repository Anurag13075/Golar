"use client";

export default function AWSStack() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
          Powered by AWS Cloud
        </p>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="font-bold text-xl text-slate-800">Amazon Bedrock</div>
          <div className="font-bold text-xl text-slate-800">Amazon Transcribe</div>
          <div className="font-bold text-xl text-slate-800">Amazon Polly</div>
          <div className="font-bold text-xl text-slate-800">DynamoDB</div>
        </div>
      </div>
    </section>
  );
}
