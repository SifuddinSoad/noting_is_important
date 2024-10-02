import { useEffect, useMemo, useState } from "react"
import { Menu } from "../../assets/icons/SVG"
import { Window } from '../Window';
import { NavLink } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";

type MenuItem = {
    icon: React.ReactNode;
    text: string;
    component?: React.ReactNode;
    link?: string;
    action?: () => void;
};

type SidebarProps = {
    window: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ window }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    /* Menu */
    const menuClass = "flex gap-2 text-gray-500 items-center cursor-pointer hover:opacity-50 active:scale-95"
    const [menuRecent, setRecentMenu] = useState<string>("")
    const [activeWindow, setActiveWindow] = useState<boolean>(false)
    const [windowComponent, setWindowComponent] = useState<React.ReactNode>()
    const menuList = useMemo<MenuItem[]>(() => [
        {
            icon: <HomeFilled className="text-xl" />,
            text: "Home",
            link: "/practice"
        },
    ], [])

    useEffect(() => {
        if (menuRecent && menuList.find(item => item.text == menuRecent)?.component) {
            setActiveWindow(true)
            const component = menuList.find(item => item.text == menuRecent)?.component
            setWindowComponent(component)
        } else {
            setActiveWindow(false)
        }
    }, [menuList, menuRecent])

    useEffect(() => {
        setActiveWindow(false)
        setRecentMenu("")
    }, [window])

    return (
        <>
            <aside className="relative">
                <div className="z-10 w-fit flex fixed bottom-0 left-0 md:sticky md:left-0 md:top-[5rem] flex-row md:flex-col gap-10 md:gap-6 bg-primary rounded-t-[1rem] md:rounded-xl py-5 px-4 whitespace-nowrap overflow-x-auto w-full border-t-2 md:border-0 md:shadow select-none">
                    {
                        menuList.map((item, index) => (
                            <>
                                {item.link && (
                                    <NavLink to={item.link} key={index}>
                                        {({ isActive }) => (
                                            <div
                                                className={
                                                    menuClass + (isActive ? " text-green-600" : "")
                                                }
                                                onClick={() => setRecentMenu(item.text)}
                                            >
                                                {item.icon}
                                                <p hidden={collapsed} className="min-w-[110px]">{item.text}</p>
                                            </div>
                                        )}
                                    </NavLink>
                                )}
                            </>

                        ))
                    }
                </div>
                <div className="w-fit md:gap-6 bg-primary md:rounded-xl p-4 pb-3 hidden md:block shadow mt-4 ml-auto">
                    <button onClick={() => setCollapsed(!collapsed)}><Menu className="text-xl fill-gray-700" /></button>
                </div>
                <Window hidden={!activeWindow} setHidden={(val) => {
                    setActiveWindow(val)
                    setRecentMenu("")
                }} component={windowComponent} />
            </aside>
        </>
    )
}
