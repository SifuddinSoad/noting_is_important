import { useMemo, useState } from "react";
import { Menu, Book } from "../../assets/icons/SVG";
import { NavLink } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";

type MenuItem = {
 icon: React.ReactNode;
 text: string;
 link: string;
};

export const Sidebar: React.FC = () => {
 const [collapsed, setCollapsed] = useState<boolean>(false);

 /* Menu */
 const menuClass =
  "flex gap-2 text-gray-500 items-center cursor-pointer hover:opacity-50 active:scale-95";
 const menuList = useMemo<MenuItem[]>(
  () => [
   {
    icon: <HomeFilled className="text-xl" />,
    text: "Home",
    link: "/progression",
   },
   {
    icon: <Book className="text-xl" />,
    text: "Physics",
    link: "/progression/physics",
   },
   {
    icon: <Book className="text-xl" />,
    text: "Chemistry",
    link: "/progression/chemistry",
   },
   {
    icon: <Book className="text-xl" />,
    text: "Biology",
    link: "/progression/biology",
   },
   {
    icon: <Book className="text-xl" />,
    text: "Higher Math",
    link: "/progression/highermath",
   },
  ],
  []
 );

 return (
  <>
   <aside className="relative">
    <div className="z-10 w-fit flex fixed bottom-0 left-0 md:sticky md:left-0 md:top-[5rem] flex-row md:flex-col gap-10 md:gap-6 bg-primary rounded-t-[1rem] md:rounded-xl py-5 px-4 whitespace-nowrap overflow-x-auto w-full border-t-2 md:border-0 md:shadow select-none">
     {menuList.map((item, index) => (
      <>
       <NavLink to={item.link} end key={index}>
        {({ isActive }) => (
         <div className={menuClass + (isActive ? " text-green-600" : "")}>
          {item.icon}
          <p hidden={collapsed} className="min-w-[110px]">
           {item.text}
          </p>
         </div>
        )}
       </NavLink>
      </>
     ))}
    </div>
    <div className="w-fit md:gap-6 bg-primary md:rounded-xl p-4 pb-3 hidden md:block shadow mt-4 ml-auto">
     <button onClick={() => setCollapsed(!collapsed)}>
      <Menu className="text-xl fill-gray-700" />
     </button>
    </div>
   </aside>
  </>
 );
};
