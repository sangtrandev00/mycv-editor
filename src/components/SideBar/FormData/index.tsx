import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;
const { TextArea } = Input;


const FormData: React.FC = () => {

  return (
      <Form
      className="bg-white"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
       
      </Form>
  );
};

export default () => <FormData />;