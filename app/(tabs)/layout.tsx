import TabBar from "@/components/tab-bar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <TabBar />
      {children}
    </div>
  );
}
