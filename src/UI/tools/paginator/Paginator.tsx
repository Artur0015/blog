import {NavLink} from "react-router-dom";
import s from './paginator.module.scss'

type PropsType = {
    currentPage: number
    totalPages: number
}

function Paginator({currentPage, totalPages}: PropsType) {
    const pages = [] as Array<number>

    if (totalPages <= 4) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    } else if ([1, 2, 3].includes(currentPage)) {
        pages.push(1, 2, 3, totalPages)
    } else if (![totalPages, totalPages - 1].includes(currentPage)) {
        pages.push(1, currentPage - 1, currentPage, currentPage + 1, totalPages)
    } else {
        pages.push(1, totalPages - 2, totalPages - 1, totalPages)
    }

    return <div className={s.paginator}>
        {pages.map(p => <NavLink to={`?page=${p}`} key={p} isActive={() => currentPage === p}
                                 activeClassName={s.active}>{p}</NavLink>)}
    </div>
}

export default Paginator