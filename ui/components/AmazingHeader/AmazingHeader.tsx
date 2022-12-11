import { mc } from '../../utils/utils'
import classes from './AmazingHeader.module.css'

export default function AmazingHeader () {
    return (
        <header className={mc(classes.header, 'container')}>
            <h1>Агрегатор цен</h1>
        </header>
    )
}