import { Card } from "antd";
import { formatDate } from "../utils";
import styles from './showtimeCard.module.scss'
import { BuyTicketButton } from "@/app/atoms/BuyTicketButtonProps";
export interface ShowtimeCardProps {
    dateTime: Date;
    place: string;
    link: string;
    price?: string;
}

export const ShowtimeCard = ({ dateTime, place, link, price }: ShowtimeCardProps) => {

    return (
        <div className={styles.showtimeCard}>
        <Card
            title={<h3>{formatDate(dateTime)}</h3>}
            style={{ width: '100%' }}
        >
            <div className={styles.content}>
                <h3 style={{fontWeight: 100}}>{place}</h3>
                <BuyTicketButton price={price} url={link} />
            </div>
        </Card>
        </div>
    );
};
