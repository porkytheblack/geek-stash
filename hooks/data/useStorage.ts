import { generate_random_number } from './../../utils/general-util-functions';
import { isEmpty } from 'lodash';
import { supabase } from './../../supabase/init.config';


export function useStorage() {

    /**
     * @name uploadToBucket
     * @params {string} folder
     * @params { File } file
     * @returns { Promise<string> }
     */

    const uploadToBucket = async (folder: string, file: File): Promise<any>  => new Promise(async (res, rej)=>{
        const { data, error } = await supabase.storage.from("assets").upload(`${folder}/assets-${generate_random_number(2000, 10000)}`, file, {
            cacheControl: "3600",
            upsert: false
        })
        if (error) {
            // // console.log(error)
            rej(error)
        }else { 
            if(!isEmpty(data)){ 
                const { path } = data
                const { data: { publicUrl } } = supabase.storage.from("assets").getPublicUrl(path)
                res(publicUrl)
            }else {
                rej("no data")
            }
        }
    }) 

    return {
        uploadToBucket
    }
}