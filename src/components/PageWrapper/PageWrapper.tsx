import { UIProvider } from "../../providers/UIProvider";
import { Header } from "@/components/Header";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
        <UIProvider>
            <div className="min-h-screen flex flex-col dark:bg-black">
                <Header />
                {children}
            </div>
        </UIProvider>
    );
};