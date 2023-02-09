import {defineStore} from "pinia";

export const useTestStore = defineStore('test1',{
    state:()=>{
        return {
            aaa:''
        }
    },
    actions:{
        aaaEvent(){
            console.log('走不走？？？？？？？')
            this.aaa = '啊啊啊'
            return this.aaa
        }
    },
    getters:{
        aaa:(state)=> state.aaa
    },
    persist: {
        // 修改存储中使用的键名称，默认为当前 Store的 id
        key: 'test1',
        // 修改为 sessionStorage，默认为 localStorage
        storage: window.sessionStorage,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['aaa'],
    },
})
