import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../categories/categorySlice";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface FormComponentProps {
  onFinish: (values: any) => void;
  initialValues?: any;
}

const FormComponent: React.FC<FormComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.list);

  console.log(categories);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { onFinish, initialValues } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <>
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ marginTop: 20 }}
        initialValues={initialValues}
        // validateMessages={validateMessages}
      >
        <Form.Item name={"_id"}>
          <Input style={{ display: "none" }} />
        </Form.Item>

        <Form.Item
          name={"productName"}
          label="Product Name"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "50%" }} />
        </Form.Item>

        <Form.Item
          name={"unitPrice"}
          label="Price"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "50%" }} />
        </Form.Item>

        <Form.Item
          name={"unitsInStock"}
          label="Stock"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "50%" }} />
        </Form.Item>

        <Form.Item
          name={"categoryId"}
          label="Product categories"
          rules={[{ required: true }]}
        >
          <Select
            style={{ width: "50%" }}
            placeholder="Categories"
            options={categories?.map((category) => ({
              value: category?._id,
              label: category?.categoryName,
            }))}
          />
        </Form.Item>

        <Form.Item name={"description"} label="Description">
          <Input.TextArea style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormComponent;
