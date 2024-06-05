import Header from "@/Layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {

    
    return (
      <>
        <Header/>
        {children}
      </>
    );
}