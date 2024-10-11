import { constant } from "@/app/util/constant";
import { useEffect } from "react";

export const controller = (value) => {
    if (constant.MAIN === value) {

    }

    if (constant.LIST === value) {
        StorageRouter()
    }

    if (constant.DETAIL === value) {
        StorageRouter()
    }

    if (constant.JOIN === value) {
        StorageRouter()
    }
    
    if (constant.JOIN === value) {
        StorageRouter()
    }

    function StorageRouter () {

        useEffect(() => {
            if (localStorage.getItem('users')) {
                const name = JSON.parse(localStorage.getItem('users'))
                setUserName(name.loginName)
            
            } else {
                Router.push('/intro')
            }
    
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    }
}

