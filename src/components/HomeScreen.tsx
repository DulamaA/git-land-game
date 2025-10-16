type Props = {
  onStart: () => void;
};

export default function HomeScreen({ onStart }: Props) {
  return (
    <header>
      <h1 className="text-3xl font-bold tracking-tight">Git-Land</h1>
      <p className="mt-2 max-w-prose text-sm text-slate-600">
        Ett litet äventyr in i git-världen. Läs instruktioner, tryck Start och lös uppgifterna steg
        för steg. Vi börjar superenkelt och bygger på efterhand. Aktivera timern om du vill tävla
        mot klockan, annars ta det lugn och lär dig i din egen takt.
      </p>
      <button onClick={onStart}>Starta</button>
    </header>
  );
}
