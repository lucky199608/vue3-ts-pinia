export interface Sex {
    value:string
    label:string
}
export interface TreeData {
    value:string
    label:string
    children:TreeData[] | null
}
export const dicApi = (type:string)=>{
    return new Promise((resolve,reject)=>{
        let data
        switch (type){
            case 'sex':
                data = <Sex[]>[{
                    value:'1',
                    label:'男'
                },{
                    value:'2',
                    label:'女'
                }]
                break
            case 'tree':
                data = <TreeData[]>[{
                    value: '1',
                    label: 'Level one 1',
                    children:[
                        {
                            value:'1-1',
                            label: 'Level one 1-1',
                            children:null
                        },
                        {
                            value:'1-2',
                            label: 'Level one 1-2',
                            children:null
                        },
                    ]
                },{
                    value: '2',
                    label: 'Level one 2',
                    children:[
                        {
                            value:'2-1',
                            label: 'Level one 2-1',
                            children:null
                        },
                        {
                            value:'2-2',
                            label: 'Level one 2-2',
                            children:null
                        },
                    ]
                }]
                break
            default:
                break
        }
        resolve(data)
    })
 }

 export interface TableData {
     aId:string
     aName:string
     aAge:string
     aTime:string
     aSex:string
     aOrg:string
     aPublic:string
 }

 export const tableApi = (searchForm:{current:number;size:number})=>{
    return new Promise((resolve,reject)=>{
        let data = <TableData[]>[]
        for(let i = 1;i < 100;i++){
            data.push({
                aId:i + '',
                aName:'张' + i,
                aAge:'18',
                aTime:"1998-01-01",
                aSex:"1",
                aOrg:'综合室',
                aPublic:'单位'
            })
        }

        setTimeout(()=>{
            let start = <number>0
            let end = <number>1
            start = (searchForm.current - 1) * searchForm.size
            end = searchForm.current * searchForm.size
            resolve({
                data:data.slice(start,end),
                total:data.length
            })
        },500)
    })
 }
