import { Avatar } from "antd";
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

export const Navbar: React.FC = () => {
    return (
        <nav className="sticky top-0 left-0 w-full p-4 flex items-center justify-between gap-5 bg-primary md:rounded-xl shadow z-50">
            <div className="flex gap-4">
                <ArrowLeftOutlined className="text-xl hover:opacity-50 cursor-pointer active:opacity-100 active:scale-90" />
                <h2 className="text-xl font-medium hidden md:block">Progression</h2>
            </div>
            <div>
                <Avatar icon={<UserOutlined />} className="hover:opacity-50 cursor-pointer active:opacity-100 active:scale-90" />
            </div>
        </nav>
    )
}
