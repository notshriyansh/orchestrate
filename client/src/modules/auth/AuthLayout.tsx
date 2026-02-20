export default function AuthLayout({ children }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 rounded-xl border bg-card shadow-card">
        {children}
      </div>
    </div>
  );
}
