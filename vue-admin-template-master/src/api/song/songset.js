import request from '@/utils/request'

export function getInfos() {
    return request({
      url: '/ktv-userset/song/selectAll',
      method: 'get',
    }
  )
}


