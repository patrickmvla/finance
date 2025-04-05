import  Header  from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
}
