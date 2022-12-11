import Image from "next/image";
import { useRouter } from "next/router";
import GoToButton from "../GoToButton/GoToButton";
import classes from "./AmazingCard.module.css";

type Props = {
    title: string;
    images: string[];
    id: number;
};
export default function PhoneCard({ title, images, id }: Props) {
    const router = useRouter();
    const clickHandler = () =>
        router.push(`/smartphones/${encodeURIComponent(id)}`);
    return (
        <div className={classes.card}>
            <Image src={images[0]} alt="фото товара" width={100} height={100}/>
            <p className={classes.title}>{title}</p>
            <GoToButton onClick={clickHandler}>Посмотреть</GoToButton>
        </div>
    );
}
