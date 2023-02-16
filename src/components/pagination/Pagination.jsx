import { Next, Previous } from '../../svg-components';
import FilledButton from '../buttons/filledbutton/FilledButton';
import styles from './pagination.module.scss'
import color from '../../constants/color'
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen'
import { useEffect, useRef, useState } from 'react';
const Pagination = ({ data, itemsPerPage, handlePaginate, active, handlePrevious, handleNext, length, limit }) => {
    const [startData, setStartdata] = useState(0);
    const [endData, setEndData] = useState(0);
    const pages = [];
    // const [pagesToMap, setPagesToMap] = useState(pages);
    for (let i = 1; i <= Math.ceil(data && data.length / itemsPerPage); i++) {
        pages.push(i);
    }
    // const [start, setStart] = useState(0);
    // const [end, setEnd] = useState(4);
    // useEffect(() => {
    //     setPagesToMap(pages.slice(start, end));
    // }, [start, end]);
    // console.log('pages to map', pagesToMap.length);
    // useEffect(() => {
    //     if (active === pagesToMap[pagesToMap.length - 1]) {
    //         setStart(active - 1);
    //         setEnd((active - 1) * 2);
    //     }
    //     else if (active === pagesToMap[0] - 1) {

    //         if (pagesToMap[0] - 4 > 0) {
    //             setStart(pagesToMap[0] - 4);
    //             setEnd((pagesToMap[0] - 4) * 2);
    //         }
    //         else {
    //             setStart(0);
    //             setEnd(4)
    //         }
    //     }
    // }, [active, pagesToMap]);
    useEffect(() => {
        let end = active * limit;
        end >= length ? setEndData(length) : setEndData(end);
        let start = endData % limit === 0 ? endData - (limit - 1) : endData - (endData % limit - 1);
        // start <= 0 ? setStartdata(end - 9) : setStartdata(start)
        setStartdata(start);
    }, [active, endData, length, data.length, limit])
    const ref = useRef();
    const isMobile = useCheckMobileScreen()

    return (
        <div className={styles.paginationContainer}>
            {/* <div className={styles.pageRangeContainer}> */}
            {
                !isMobile && <span className={styles.pageRange}>{startData}-{endData} of {length}</span>
            }
            {/* </div> */}
            <div className={styles.paginationPagesContainer}>
                <FilledButton icon={<Previous fillColor={color.grey3} />} handleClick={() => handlePrevious(-40, ref)} title="Previous" custonClass={styles.previousBtn} custonClassTitle={styles.titlePrevious} />
                <div className={styles.paginationScroll} ref={ref}>
                    {
                        pages.map((item, index) => {
                            return (
                                <span key={index} className={item === active ? styles.activePage : styles.pageNumber} onClick={() => handlePaginate(item)} >{item}</span>
                            )
                        })
                    }
                </div>
                <FilledButton icon={<Next fillColor={color.grey3} />} handleClick={() => handleNext(+40, ref)} title="Next" custonClass={styles.nextBtn} custonClassTitle={styles.titleNext} />
            </div>
        </div>
    )
}
export default Pagination;