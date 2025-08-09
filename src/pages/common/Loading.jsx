export default function Loading() {
  return (
    <main className="min-h-[90svh] grid place-items-center bg-background">
      <div role="status" aria-live="polite" aria-busy="true" className="flex flex-col items-center gap-4">
        <img
          src="/rawdatee.png"
          alt="App logo"
          width={120}
          height={120}
          className="fade"
          priority
        />
        <p className="text-sm text-muted-foreground font-semibold tracking-wide">Loading...</p>
      </div>
    </main>
  );
}
