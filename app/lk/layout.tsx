import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default function LkLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: any;
}) {
    return (
        <>
            <Sidebar active_page="profile" />
            {children}
            <Footer lk />
        </>
    );
}
