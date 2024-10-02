import { useEffect, useMemo, useState } from "react";
import {
 Menu,
 TodoList,
 ReportSuccess,
 ReportFail,
 ReportHour,
 WeeklyReport,
 MonthlyReport,
} from "../../assets/icons/SVG";
import { Window } from "../Window";
import { TodoList as TodoListComponent } from "../../pages/TodoList";
import { Complete as CompleteComponent } from "../../pages/Complete";
import { Incomplete as IncompleteComponent } from "../../pages/Incomplete";
import { DailyReport as DailyReportComponent } from "../../pages/DailyReport";
import { WeeklyReport as WeeklyReportComponent } from "../../pages/WeeklyReport";
import { NavLink } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";

type MenuItem = {
 icon: React.ReactNode;
 text: string;
 component?: React.ReactNode;
 link?: string;
};

type SidebarProps = {
 window: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ window }) => {
 const [collapsed, setCollapsed] = useState<boolean>(false);
 const [menuRecent, setRecentMenu] = useState<string>("");
 const [activeWindow, setActiveWindow] = useState<boolean>(false);
 const [windowComponent, setWindowComponent] = useState<React.ReactNode>();

 const menuList = useMemo<MenuItem[]>(
  () => [
   { icon: <HomeFilled className="text-xl" />, text: "Home", link: "/" },
   {
    icon: <TodoList className="text-xl" />,
    text: "Todo List",
    component: <TodoListComponent />,
   },
   {
    icon: <ReportSuccess className="text-xl" />,
    text: "Complete",
    component: <CompleteComponent />,
   },
   {
    icon: <ReportFail className="text-xl" />,
    text: "Incomplete",
    component: <IncompleteComponent />,
   },
   {
    icon: <ReportHour className="text-xl" />,
    text: "Daily Report",
    component: <DailyReportComponent />,
   },
   {
    icon: <WeeklyReport className="text-xl" />,
    text: "Weekly Report",
    component: <WeeklyReportComponent />,
   },
   {
    icon: <MonthlyReport className="text-xl" />,
    text: "Monthly Report",
    link: "/monthly-report",
   },
  ],
  []
 );

 useEffect(() => {
  const savedMenu = localStorage.getItem("menuRecent");
  if (savedMenu) {
   setRecentMenu(savedMenu);
   const component = menuList.find(
    (item) => item.text === savedMenu
   )?.component;
   if (component) {
    setWindowComponent(component);
    setActiveWindow(true);
   }
  }
 }, [menuList]);

 useEffect(() => {
  if (menuRecent) {
   localStorage.setItem("menuRecent", menuRecent);
   const component = menuList.find(
    (item) => item.text === menuRecent
   )?.component;
   if (component) {
    setWindowComponent(component);
    setActiveWindow(true);
   }
  } else {
   setActiveWindow(false);
  }
 }, [menuRecent, menuList]);

 useEffect(() => {
  if (window) {
   setActiveWindow(false);
   setRecentMenu("");
  }
 }, [window]);

 return (
  <>
   <aside className="relative">
    <div className="z-10 w-fit flex fixed bottom-0 left-0 md:sticky md:left-0 md:top-[5rem] flex-row md:flex-col gap-10 md:gap-6 bg-primary rounded-t-[1rem] md:rounded-xl py-5 px-4 whitespace-nowrap overflow-x-auto w-full border-t-2 md:border-0 md:shadow select-none">
     {menuList.map((item, index) =>
      item.link ? (
       <NavLink to={item.link} key={index}>
        {({ isActive }) => (
         <div
          className={`flex gap-2 text-gray-500 items-center cursor-pointer hover:opacity-50 active:scale-95 ${
           isActive ? "text-green-600" : ""
          }`}
         >
          {item.icon}
          <p hidden={collapsed}>{item.text}</p>
         </div>
        )}
       </NavLink>
      ) : (
       <div
        key={index}
        className={`flex gap-2 text-gray-500 items-center cursor-pointer hover:opacity-50 active:scale-95 ${
         menuRecent === item.text ? "text-slate-950" : ""
        }`}
        onClick={() => {
         setRecentMenu(menuRecent === item.text ? "" : item.text);
        }}
       >
        {item.icon}
        <p hidden={collapsed}>{item.text}</p>
       </div>
      )
     )}
    </div>
    <div className="w-fit md:gap-6 bg-primary md:rounded-xl p-4 pb-3 hidden md:block shadow mt-4 ml-auto">
     <button onClick={() => setCollapsed(!collapsed)}>
      <Menu className="text-xl fill-gray-700" />
     </button>
    </div>
    <Window
     hidden={!activeWindow}
     setHidden={(val) => {
      setActiveWindow(val);
      setRecentMenu("");
     }}
     component={windowComponent}
    />
   </aside>
  </>
 );
};
