import { Card, Tag } from "antd";
import { formatDate } from "../utils";
import styles from './showtimeCard.module.scss'
import { BuyTicketButton } from "@/app/atoms/BuyTicketButtonProps";
export interface ShowtimeCardProps {
    dateTime: Date;
    place: string;
    isSoldOut?: boolean;
}

export const ShowtimeCard = ({ dateTime, place, isSoldOut }: ShowtimeCardProps) => {
    const Extra = isSoldOut ? (
        <Tag color="default">Все билеты проданы</Tag>
    ) : (    <BuyTicketButton url={"https://events.nethouse.ru/buy_tickets/109466/"} />
    );

    return (
        <div className={styles.showtimeCard}>
        <Card
            title={<h3>{formatDate(dateTime)}</h3>}
            style={{ width: '100%' }}
        >
            <div className={styles.content}>
                <h3 style={{fontWeight: 100}}>{place}</h3>
                {Extra}
            </div>
        </Card>
        </div>
    );
};
