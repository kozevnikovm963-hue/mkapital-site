export type IconName = "wallet" | "home" | "compass" | "sparkle" | "globe" | "shield" | "layers" | "message" | "search" | "document" | "check" | "heart" | "gift" | "pin" | "list" | "handshake";

export function LineIcon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  let drawing;

  switch (name) {
    case "wallet": drawing = <><path d="M4.5 7.5V6A2.5 2.5 0 0 1 7 3.5h10.5v15H6A2.5 2.5 0 0 1 3.5 16V7.5h14"/><path d="M14 10h4.5v4H14a2 2 0 0 1 0-4Z"/><circle cx="14.5" cy="12" r=".5" fill="currentColor" stroke="none"/></> ; break;
    case "home": drawing = <><path d="m3.5 10 8.5-7 8.5 7"/><path d="M5.5 8.5v11h13v-11M9.5 19.5v-6h5v6"/></>; break;
    case "compass": drawing = <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z"/></>; break;
    case "sparkle": drawing = <><path d="M12 2.5c.6 4.5 3 6.9 7.5 7.5-4.5.6-6.9 3-7.5 7.5-.6-4.5-3-6.9-7.5-7.5 4.5-.6 6.9-3 7.5-7.5Z"/><path d="M19 16.5c.2 1.4 1.1 2.3 2.5 2.5-1.4.2-2.3 1.1-2.5 2.5-.2-1.4-1.1-2.3-2.5-2.5 1.4-.2 2.3-1.1 2.5-2.5Z"/></>; break;
    case "globe": drawing = <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>; break;
    case "shield": drawing = <><path d="M12 2.5 20 6v5.5c0 5-3.3 8.4-8 10-4.7-1.6-8-5-8-10V6l8-3.5Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>; break;
    case "layers": drawing = <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>; break;
    case "message": drawing = <><path d="M4 4.5h16v11H9l-5 4v-15Z"/><path d="M8 9h8M8 12h5"/></>; break;
    case "search": drawing = <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></>; break;
    case "document": drawing = <><path d="M6 2.5h8l4 4v15H6v-19Z"/><path d="M14 2.5v5h4M9 12h6M9 16h6"/></>; break;
    case "check": drawing = <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.6 2.7 5.8-6"/></>; break;
    case "heart": drawing = <path d="M12 20S3.5 15.2 3.5 8.8A4.5 4.5 0 0 1 12 6.7a4.5 4.5 0 0 1 8.5 2.1C20.5 15.2 12 20 12 20Z"/>; break;
    case "gift": drawing = <><path d="M3.5 10h17v11h-17V10ZM2.5 6.5h19V10h-19V6.5ZM12 6.5V21"/><path d="M12 6.5c-2.5 0-5.5-.5-5.5-2.4 0-1.2 1-2.1 2.2-2.1C10.8 2 12 6.5 12 6.5ZM12 6.5s1.2-4.5 3.3-4.5c1.2 0 2.2.9 2.2 2.1 0 1.9-3 2.4-5.5 2.4Z"/></>; break;
    case "pin": drawing = <><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></>; break;
    case "list": drawing = <><path d="m4 6 1.5 1.5L8 5M11 6h9M4 12l1.5 1.5L8 11M11 12h9M4 18l1.5 1.5L8 17M11 18h9"/></>; break;
    default: drawing = <><path d="M9.5 12.5 7 15a3 3 0 0 1-4.2-4.2l4-4A3 3 0 0 1 11 6.7"/><path d="m14.5 11.5 2.5-2.5a3 3 0 1 1 4.2 4.2l-4 4a3 3 0 0 1-4.2.1M8.5 15.5l7-7"/></>;
  }

  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...common}>{drawing}</svg>;
}
