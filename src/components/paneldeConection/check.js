
// import React, { Component } from 'react'

// import ReactDOM from "react-dom";
// import {
//     Form,
//     Input,
//     Button,
//     Radio,
//     Select,
//     Cascader,
//     DatePicker,
//     InputNumber,
//     TreeSelect,
//     Switch,
//   } from 'antd';

// import "bootstrap/dist/css/bootstrap.css";

// class Check extends Component {
  
//     constructor(props) {
//       super(props);
//       this.state = {
//         componentSize: " ",
//          setComponentSize:" "
    
//       }      
//     }

//      FormSizeDemo = () => {
       
//        const onFormLayoutChange = ({ size }) => {
//           setComponentSize(size);
//         };


    
  
    
  
//     render() {
//       return (
//         <Form
//         labelCol={{
//           span: 4,
//         }}
//         wrapperCol={{
//           span: 14,
//         }}
//         layout="horizontal"
//         initialValues={{
//           size: componentSize,
//         }}
//         onValuesChange={this.onFormLayoutChange}
//         size={componentSize}
//       >
//         <Form.Item label="Form Size" name="size">
//           <Radio.Group>
//             <Radio.Button value="small">Small</Radio.Button>
//             <Radio.Button value="default">Default</Radio.Button>
//             <Radio.Button value="large">Large</Radio.Button>
//           </Radio.Group>
//         </Form.Item>
//         <Form.Item label="Input">
//           <Input />
//         </Form.Item>
//         <Form.Item label="Select">
//           <Select>
//             <Select.Option value="demo">Demo</Select.Option>
//           </Select>
//         </Form.Item>
//         <Form.Item label="TreeSelect">
//           <TreeSelect
//             treeData={[
//               {
//                 title: 'Light',
//                 value: 'light',
//                 children: [
//                   {
//                     title: 'Bamboo',
//                     value: 'bamboo',
//                   },
//                 ],
//               },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item label="Cascader">
//           <Cascader
//             options={[
//               {
//                 value: 'zhejiang',
//                 label: 'Zhejiang',
//                 children: [
//                   {
//                     value: 'hangzhou',
//                     label: 'Hangzhou',
//                   },
//                 ],
//               },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item label="DatePicker">
//           <DatePicker />
//         </Form.Item>
//         <Form.Item label="InputNumber">
//           <InputNumber />
//         </Form.Item>
//         <Form.Item label="Switch">
//           <Switch />
//         </Form.Item>
//         <Form.Item label="Button">
//           <Button>Button</Button>
//         </Form.Item>
//       </Form>
      
//       );
//     }
//   }
//   export default Check