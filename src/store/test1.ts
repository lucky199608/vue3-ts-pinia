import { defineStore } from 'pinia'

export interface TableData {
  aId?: string
  aName: string
  aAge?: string
  aTime: string
  aSex: string
  aOrg: string
  aPublic: string
}

export const useTest1Store = defineStore('test1', {
  state: () => {
    return {
      name: '王五',
      userInfo: {
        name: '',
        age: '',
        org: '知识运营室'
      },
      tableList: [] as TableData[]
    }
  },
  actions: {
    getInfo() {
      return new Promise((resolve, reject) => {
        const userInfo = {
          name: '张三',
          age: '18',
          org: '业务运营室'
        }
        resolve(userInfo)
      })
    },
    tableApi(searchForm: { current: number; size: number }) {
      return new Promise((resolve, reject) => {
        if (this.tableList && this.tableList.length == 0) {
          for (let i = 1; i < 100; i++) {
            this.tableList.push({
              aId: i + '',
              aName: '张' + i,
              aAge: '18',
              aTime: '1998-01-01',
              aSex: '1',
              aOrg: '综合室',
              aPublic: '单位'
            })
          }
        }

        setTimeout(() => {
          let start = 0 as number
          let end = 1 as number
          start = (searchForm.current - 1) * searchForm.size
          end = searchForm.current * searchForm.size
          resolve({
            data: this.tableList.slice(start, end),
            total: this.tableList.length
          })
        }, 500)
      })
    },
    editTable(addForm: any) {
      return new Promise((resolve, reject) => {
        const editIndex = this.tableList.findIndex(item => {
          return item.aId === addForm.aId
        })
        this.tableList.splice(editIndex, 1, { ...addForm })
        setTimeout(() => {
          resolve([])
        }, 500)
      })
    },
    delTable(id:string){
      return new Promise((resolve, reject) => {
        this.tableList = this.tableList.filter((item)=>{
          return item.aId !== id
        })

        setTimeout(() => {
          resolve([])
        }, 500)
      })
    },
  },
  getters: {
    userInfos: state => state.userInfo,
    names: state => state.name,
    tableLists: state => state.tableList
  },
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'test1Data',
    // 修改为 sessionStorage，默认为 localStorage
    storage: window.sessionStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['tableList']
  }
})
