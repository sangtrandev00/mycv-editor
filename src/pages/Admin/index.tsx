import React, { useEffect } from 'react';
import { Card, List, Avatar, Space, notification } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { deleteUser, getUserList } from '../../store/user.slice';
import {Link} from "react-router-dom";

const Admin: React.FC = () => {

    const userList = useSelector((state: RootState) => state.user.userList);
    const asyncDispatch = useAppDispatch();
    useEffect(() => {
        asyncDispatch(getUserList()).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }, [asyncDispatch])

    const data = userList.map((user) => {
        return {
            id: user.id,
            title: user.info.name,
            description: user.info.jobTitle,
            avatar: user.info.avatar,

        }
    }) 

    const deleteCV = (userId: string) => {
        console.log(userId);

        asyncDispatch(deleteUser(userId)).then((result) => {
            console.log(result);

            notification.success({
                message: 'Notification',
                description: 'Delete User successfully',
                duration: 2
            })

        }).catch((error) => {
            console.log(error);
        })
    }
    // [
    //     {
    //       title: 'User 1',
    //       description: 'User 1 description',
    //     },
    //     {
    //       title: 'User 2',
    //       description: 'User 1 description',

    //     },
    //     {
    //       title: 'User 3',
    //       description: 'User 1 description',

    //     },
    //     {
    //       title: 'Users 4',
    //       description: 'User 1 description',

    //     },
    //   ];

    return (
       <div className="bg-slate-400 w-[1200px] mx-auto p-4 mt-10 h-[40rem]">
         <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card 
              title={item.title}
             
              actions={[
                <SettingOutlined key="setting" />,
                <Link to={`/${item.id}`}><EditOutlined key="edit" /></Link>,
                <DeleteOutlined onClick={() => deleteCV(item.id)} key="delete" />,
              ]}
              >
               <Space>
               <Avatar src={item.avatar} />
                {item.description}
               </Space>
              </Card>
            </List.Item>
          )}
        />
       </div>
      )
};

export default Admin;