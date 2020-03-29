import request from '@/utils/request'

export function getInfo() {
    return request({
      url: '/ktv-userset/album/selectAll',
      method: 'get',
    }
  )
}
