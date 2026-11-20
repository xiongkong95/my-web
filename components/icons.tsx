export function CarLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 36H8v-8q0-4 4-5l18-3 12-10q3-2 8-2h28q5 0 8 3l10 9 12 2q6 1 6 7v7h-13" />
      <path d="M39 36h44" />
      <path d="M45 20l8-8h13v8ZM71 12h9q2 0 4 2l6 6H71Z" />
      <path d="M8 27h5M107 26h7" />
      <circle cx="30" cy="36" r="7" />
      <circle cx="30" cy="36" r="2.5" />
      <circle cx="92" cy="36" r="7" />
      <circle cx="92" cy="36" r="2.5" />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.1a11 11 0 0 0 0 9.8l3.7-2.8Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4Z" />
    </svg>
  );
}
