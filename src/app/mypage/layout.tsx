import HeaderMyPage from "@/Layout/HeaderMyPage";


export default function Layout({ children }: { children: React.ReactNode }) {

    
    return (
      <>
        <HeaderMyPage/>
        {children}
      </>
    );
}