import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
import { treeData } from './data/tree-select'
const Random = Mock.Random

export const getTableData = req => {
    let tableData = []
    doCustomTimes(18, () => {
        tableData.push(Mock.mock({
            number: '31714',
            name: '@cname',
            jobtitle: '教师',
            createTime: '@date',
            dpartment: '教务处',
            workload: '200'
        }))
    })
    return tableData
}

export const getDragList = req => {
    let dragList = []
    doCustomTimes(5, () => {
        dragList.push(Mock.mock({
            name: Random.csentence(10, 13),
            id: Random.increment(5)
        }))
    })
    return dragList
}

export const uploadImage = req => {
    return Promise.resolve()
}

export const getOrgData = req => {
    return orgData
}

export const getTreeSelectData = req => {
    return treeData
}