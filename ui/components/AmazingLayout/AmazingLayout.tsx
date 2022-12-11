import AmazingHeader from "../AmazingHeader/AmazingHeader";

type Props = {
    children: React.ReactNode;
};

export default function AmazingLayout({ children }: Props) {
    return (
        <>
            <AmazingHeader />
            <main className="container">{children}</main>
            <footer className="container">footer</footer>
        </>
    );
}
