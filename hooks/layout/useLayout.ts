import { selectCurrentLayout, selectCurrentPageAccessState } from './../../redux/layoutSlice';
import { setLayout, setPageAccessState } from '../../redux/layoutSlice';
import { useAppDispatch, useAppSelector } from './../../redux/store';

export function useLayout() {
    const reduxDispatch = useAppDispatch()

    /**
     * @name setLayout
     * @description Sets the layout of the page
     */

    const set_layout = (layout: "dashboard" | "main") => {
        reduxDispatch(setLayout(layout))
    }

    /**
     * @name set_page_access_state
     * @description Sets the page access state
     */

    const set_page_access_state = (pageAccessState: "loading" | "authorized" | "unauthorized") => {
        reduxDispatch(setPageAccessState(pageAccessState))
    }

    /**
     * @name current_layout
     * @description  the current layout
     */
    const current_layout = useAppSelector(selectCurrentLayout)

    /**
     * @name current_page_access_state
     * @description the current page access state
     */
    const current_page_access_state = useAppSelector(selectCurrentPageAccessState)

    return {
        set_layout,
        current_layout,
        current_page_access_state,
        set_page_access_state
    }
}