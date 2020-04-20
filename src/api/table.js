import request from '@/utils/request'

export function getList (params) {
    return request({
        url: '/test/students',
        method: 'get',
        params
    })
}

export function deleteStudent (params) {
    return request({
        url: '/test/deleteStudent',
        method: 'post',
        data: params
    })
}

export function saveStudent (params) {
    return request({
        url: '/test/addstudent',
        method: 'post',
        data: params
    })
}

export function updateStudent (params) {
    return request({
        url: '/test/updatestudent',
        method: 'post',
        data: params
    })
}
