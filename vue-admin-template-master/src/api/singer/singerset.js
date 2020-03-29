import request from '@/utils/request'

export function getInfo() {
    return request({
      url: '/ktv-userset/singer/selectAll',
      method: 'get',
    }
  )
}


