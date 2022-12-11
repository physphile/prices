import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./GoToButton.module.css";

type Props = {
    children: React.ReactNode;
    onClick: () => void;
};
export default function GoToButton({ children, onClick }: Props) {
    return (
        <button className={classes.button} onClick={onClick}>
            {children}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </button>
    );
}
