<template>
  <div class="container">
    <div class="adminPage-header">
      <div class="title">관리자 대시보드</div>
      <button @click="logout" id="adminlogoutLink">로그아웃</button>
    </div>

    <!-- 통계 카드 -->
    <div class="stats">
      <div class="stat-card" v-for="(item, index) in stats" :key="index">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </div>

    <!-- 관리 기능 + 차트 -->
    <div class="action-section">
      <!-- 버튼 그룹 -->
      <div class="button-section">
        <h2>앨범 관리</h2>
        <div class="action-buttons">
          <a class="btn" href="/admin/album">앨범 업로드</a>
          <a class="btn" href="/admin/album/manage">앨범 관리</a>
        </div>

        <h2>공연 관리</h2>
        <div class="action-buttons">
          <a class="btn" href="/admin/performance">공연 업로드</a>
          <a class="btn" href="/admin/performance/manage">공연 관리</a>
        </div>

        <h2>게시판 관리</h2>
        <div class="action-buttons two-column">
          <a class="btn" href="/admin/board/manage">게시글 관리</a>
          <a class="btn" href="/admin/board/hist">게시글 로그</a>
          <a class="btn" href="/admin/comment/manage">댓글 관리</a>
          <a class="btn" href="/admin/comment/hist">댓글 로그</a>
        </div>

        <h2>회원 관리</h2>
        <div class="action-buttons">
          <a class="btn" href="/admin/cust/list">회원 목록</a>
          <a class="btn" href="/admin/cust/hist">회원 로그</a>
        </div>

        <h2>공지사항 관리</h2>
        <div class="action-buttons">
          <a class="btn" href="/admin/notice">공지사항 등록</a>
          <a class="btn" href="/admin/notice/manage">공지사항 관리</a>
        </div>
      </div>

      <!-- 차트 -->
      <div class="chart-container">
        <canvas id="donutChart" width="500" height="500"></canvas>
      </div>


    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import axios from '@/utils/axios'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      stats: []
    }
  },
  mounted() {
    this.fetchStats()
  },
  methods: {
    async fetchStats() {
      try {
        const response = await axios.get('/admin/dashboard') // 인터셉터가 토큰 자동 추가

        const data = response.data

        this.stats = [
          { label: '회원 수', value: data.custCount },
          { label: '게시글 수', value: data.boardCount },
          { label: '댓글 수', value: data.commentCount },
          { label: '앨범 수', value: data.albumCount },
          { label: '공연 수', value: data.performanceCount },
        ]

        this.renderChart(data)
      } catch (error) {
        console.error('통계 데이터를 불러오는 데 실패했습니다:', error)
      }
    },
    renderChart(data) {
      Chart.register(...registerables)
      const ctx = document.getElementById('donutChart')
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['회원', '게시글', '댓글', '앨범', '공연'],
          datasets: [{
            data: [
              data.custCount,
              data.boardCount,
              data.commentCount,
              data.albumCount,
              data.performanceCount
            ],
            backgroundColor: ['#3498db', '#e67e22', '#f1c40f', '#2ecc71', '#9b59b6'],
            borderColor: '#ffffff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      })
    },
    logout() {
      if (confirm('관리자 페이지를 나가시겠습니까?')) {
        localStorage.removeItem('adminToken')
        alert('로그아웃이 되어 메인페이지로 이동합니다.')
        window.location.href = '/'
      }
    }
  }
}
</script>


<style scoped>
.container {
  max-width: 1100px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.adminPage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
}

#adminlogoutLink {
  padding: 10px 20px;
  background-color: darkgreen;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #f9fafc;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.stat-card span {
  display: block;
  font-size: 16px;
  color: #888;
  margin-bottom: 8px;
}

.stat-card strong {
  font-size: 22px;
  color: #2c3e50;
  font-weight: 700;
}

.action-section {
  display: flex;
  gap: 40px;
  flex-wrap: nowrap;
  align-items: flex-start;
}

.button-section {
  flex: 1;
}

.button-section h2 {
  font-size: 20px;
  margin: 20px 0 15px;
  color: #2c3e50;
  border-left: 4px solid darkgreen;
  padding-left: 10px;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.btn {
  flex: 0 1 220px;
  background-color: darkgreen;
  color: white;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
  box-sizing: border-box;
}

.chart-container {
  margin-top: 75px;
  flex: 0 0 520px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
