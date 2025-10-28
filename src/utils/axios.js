import axios from 'axios'

// 배포와 로컬 개발 환경

const instance = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://greensalt.site/api',
    timeout: 5000,
})

// 요청 인터셉터: Authorization 헤더 자동 추가
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('adminToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

export default instance
