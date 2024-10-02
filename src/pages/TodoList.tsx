import {
 Checkbox,
 Divider,
 Button,
 Badge,
 Typography,
 Segmented,
 Modal,
 Form,
 Input,
 TimePicker,
} from "antd";
import { Add, Done, Play } from "../assets/icons/SVG";
import { useState } from "react";

type FieldType = {
 value: string;
 timer?: string;
};

export const TodoList: React.FC = () => {
 const options = ["Checklist", "Timer"];
 const [filter, setFilter] = useState<string>(options[0]);
 const [filterForm, setFilterForm] = useState<string>(options[0]);
 const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 const [form] = Form.useForm();
 return (
  <>
   <div className="w-full h-full relative flex flex-col overflow-y-auto">
    <div className="p-4 lg:py-3 flex justify-between items-center">
     <h1 className="text-lg md:text-xl font-medium">Todo List</h1>
     <Button
      type="primary"
      icon={<Add />}
      onClick={() => setIsAddModalOpen(true)}
     ></Button>
    </div>

    <Divider className="m-0 border-black/15" />

    <div>
     <Segmented<string>
      className="mx-4 my-2"
      options={options}
      value={filter}
      onChange={setFilter}
     />
    </div>

    <div className="flex-1 overflow-y-auto">
     <div className="flex flex-col p-4 lg:px-6 !pt-2">
      {filter === options[1] && (
       <>
        <div className="flex justify-between items-center gap-2 select-none mb-3">
         <Typography.Text className="line-clamp-2">
          <ul>
           <li>
            At 6:30 PM, I have to complete Math homework. Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
           </li>
          </ul>
         </Typography.Text>
         <Badge text="10 min" color="#faad14" className="ml-3 flex-none" />
         <Button
          size="small"
          className="m-1 !p-3"
          icon={<Play className="size-4 text-blue-500" />}
          shape="circle"
         ></Button>
        </div>
        <div className="flex justify-between items-center gap-2 select-none mb-3">
         <Typography.Text className="line-clamp-2">
          <ul>
           <li className="">
            At 6:30 PM, I have to complete Math homework. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Nesciunt non dignissimos at
            corrupti aliquam, optio omnis sed nam explicabo dolore aliquid aut
            numquam laborum earum, velit unde doloremque ducimus eius!
           </li>
          </ul>
         </Typography.Text>
         <Badge text="1 hr" color="#faad14" className="ml-3 flex-none" />
         <Button
          size="small"
          className="m-1 !p-3"
          icon={<Play className="size-4 text-blue-500" />}
          shape="circle"
         ></Button>
        </div>
       </>
      )}
      {filter === options[0] && (
       <>
        <div className="flex justify-between select-none mb-3">
         <Checkbox>
          <p className="line-clamp-2">
           Today at 3:00 PM, I have to read English. Lorem ipsum dolor sit amet
           consectetur adipisicing elit. Quod blanditiis, voluptates pariatur
           veniam rem asperiores dolorem laborum non, modi, placeat possimus eum
           explicabo voluptas delectus quaerat quis recusandae temporibus.
           Asperiores delectus consequuntur nam, mollitia autem labore. Magnam
           labore iste libero quaerat. Quidem rem sint fugit eius enim dolorem
           veniam hic necessitatibus iure distinctio, commodi vel voluptatibus
           corrupti exercitationem, cum molestias similique, unde tempora!
           Accusamus consequatur iusto earum, necessitatibus eius sunt dolorem
           rerum ullam illo placeat et, voluptatibus quis. Maxime, perspiciatis
           nesciunt? Animi optio dolor enim praesentium similique. Cumque qui
           iste necessitatibus ad beatae. Cum aliquam qui numquam odio
           blanditiis perferendis.
          </p>
         </Checkbox>
         <Button
          size="small"
          className="m-1 !p-3"
          icon={<Done />}
          shape="circle"
         ></Button>
        </div>
       </>
      )}
     </div>
    </div>

    <div className="flex-1 flex lg:flex-none gap-2 px-4 _footer py-2">
     <Button type="primary" size="small" danger disabled>
      Delete
     </Button>
     <Button type="primary" size="small" disabled>
      Edit
     </Button>
    </div>
   </div>

   <Modal
    title="Add Todo"
    open={isAddModalOpen}
    okText="Submit"
    onOk={() => {
     form.submit();
     form.resetFields();
    }}
    onCancel={() => {
     form.resetFields();
     setIsAddModalOpen(false);
    }}
   >
    <Form
     form={form}
     labelCol={{ span: 3 }}
     wrapperCol={{ span: 14 }}
     autoComplete="off"
     className="!pt-4 max-w-[600px]"
     onFinish={() => {
      setIsAddModalOpen(false);
     }}
    >
     <Form.Item name="type">
      <Segmented<string>
       options={options}
       value={filterForm}
       onChange={setFilterForm}
      />
     </Form.Item>

     <Form.Item<FieldType>
      name="value"
      rules={[{ required: true, message: "Please write something!" }]}
     >
      <Input.TextArea />
     </Form.Item>

     {filterForm === options[1] && (
      <Form.Item<FieldType>
       name="timer"
       rules={[{ required: true, message: "Please select time!" }]}
      >
       <TimePicker />
      </Form.Item>
     )}
    </Form>
   </Modal>
  </>
 );
};
