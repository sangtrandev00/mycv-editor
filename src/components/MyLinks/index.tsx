import React from 'react'
import { ILink } from '../../types/user.type'
import { Tooltip } from 'antd'
import { GithubOutlined, FacebookFilled, FacebookOutlined, LinkedinFilled, ChromeOutlined } from '@ant-design/icons';

type MyLinksProps = {
    links: ILink
}

const MyLinks = (props: MyLinksProps) => {
  return (
    <div className="my-info__links mt-2">
    <Tooltip placement="top" title="Website">
        <a target='_blank' href={props.links.website}><ChromeOutlined className="text-lg mx-2" /></a>
    </Tooltip>
    <Tooltip placement="top" title="Github">
    <a target='_blank' href={props.links.github}><GithubOutlined className="text-lg mx-2" /></a>
    </Tooltip>
    <Tooltip placement="top" title="Facebook">
    <a target='_blank' href={props.links.facebook}><FacebookOutlined className="text-lg mx-2" /></a>
    </Tooltip>
    <Tooltip placement="top" title="Linkedin">
    <a target='_blank' href={props.links.linkedin}><LinkedinFilled className="text-lg mx-2" /></a>
      </Tooltip>
    </div>
  )
}

export default MyLinks