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
                },{
                    value:'3',
                    label:'未知'
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





