import { Card } from "antd";
import Image from 'next/image'
import { formatDate } from "./utils";
import Link from 'next/link'
import { CMeta } from "./CMeta";

export interface EventCardProps {
    imageUrl: string;
    title: string;
    desc: string;
    date: Date;
    href: string
}


export const EventCard: React.FC<EventCardProps> = ({title, desc, imageUrl, date, href}) => {
    const metaTitle = <>
    <h5>{formatDate(date)}</h5>
    <h4 style={{textWrap: 'balance'}}>{title}</h4>
        </>
    return <Link href={href} ><Card
      hoverable
      style={{ width: 240, minHeight: '100%' }}
      cover={<Image alt="АФИША" src={imageUrl} width={280} height={300}/>}
    >
        <CMeta title={metaTitle} description={desc} />
    </Card>
    </Link>
};