import { useRef } from "react"

type WindowProps = {
    hidden: boolean;
    component: React.ReactNode;
    setHidden: (hidden: boolean) => void;
};

export const Window: React.FC<WindowProps> = ({ hidden, component, setHidden }) => {
    const main = useRef<HTMLDivElement>(null);
    const mainWindow = useRef<HTMLDivElement>(null);
    const layerWindow = useRef<HTMLDivElement>(null);

    return (
        <div hidden={hidden} ref={main}>
            <section className="fixed top-[30%] w-full md:w-[95%] lg:w-screen h-screen lg:max-h-[400px] bg-primary shadow-lg rounded-t-lg lg:rounded-lg z-40 lg:border lg:top-auto lg:bottom-[15px] lg:right-[15px] overflow-y-auto lg:max-w-md" ref={mainWindow}>
                {component}
            </section>
            <section className="z-10 fixed top-0 left-0 w-full h-screen bg-black opacity-50 lg:hidden" ref={layerWindow} onClick={() => setHidden(true)}></section>
        </div>
    )
}
