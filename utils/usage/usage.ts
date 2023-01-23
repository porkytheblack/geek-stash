import { IUsage } from './../../types/usage';

/**
 * @categorize_hourly_for_today
 * @param { Array<IUsage> } data
 * @returns { {[key: number]: number} }
 * 
 */

export const categorize_hourly_for_today = (data: Array<IUsage>) => {
    let _d = data as Array<IUsage>;
    
    let hours = Object.fromEntries([...Array(24).fill(0,)].map((_, i)=>[i + 1, 0]))
    
    hours = Object.fromEntries(Object.entries(hours).map(([hour, number])=>{
        let in_this_hour_of_today = _d?.filter(({timestamp})=>{
            let _date = new Date(timestamp)
            if ( 
                _date.getDate() !== new Date().getDate()  ||
                _date.getFullYear() !== new Date().getFullYear() ||
                _date.getMonth() !== new Date().getMonth()
            ) return false
            if( _date.getHours() !== parseInt(hour) ) return false
            return true
        })
        return [hour, in_this_hour_of_today?.length]
    }))
    return hours
}