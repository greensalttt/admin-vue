<template>
  <div class="container">
    <div class="header">
      <span class="cate">
        <router-link to="/">관리자 메인 페이지</router-link>
      </span>
    </div>

    <h2>회원 이력 보기</h2>

    <table v-if="histories.length">
      <thead>
      <tr>
        <th>이력 번호</th>
        <th>회원 번호</th>
        <th>변경 코드</th>
        <th>변경 전</th>
        <th>변경 후</th>
        <th>변경 일시</th>
        <th>수정자</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in histories">
        <td>{{ item.chistNum }}</td>
        <td>{{ item.cid }}</td>
        <td>{{ item.ccngCd }}</td>
        <td>{{ item.cbf }}</td>
        <td>{{ item.caf }}</td>
        <td>{{ formatDateTime(item.createdAt) }}</td>
        <td>{{ item.createdBy }}</td>
      </tr>
      </tbody>
    </table>

    <div v-else style="text-align: center; margin-top: 50px;">
      회원 이력 정보가 없습니다.
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CustHistory',
  data() {
    return {
      histories: [],
    };
  },
  mounted() {
    this.fetchHistories();
  },
  methods: {
    async fetchHistories() {
      try {
        const res = await axios.get('/api/cust/hist');
        this.histories = res.data || [];
      } catch (err) {
        console.error('회원 이력 조회 실패:', err);
        alert('회원 이력 정보를 불러오지 못했습니다.');
      }
    },
    formatDateTime(dateStr) {
      if (!dateStr) return '-';
      const date = new Date(dateStr);
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 40px auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f9f9f9;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 18px;
}

.cate a {
  color: #333;
  font-weight: bold;
  text-decoration: none;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  border-left: 5px solid darkgreen;
  padding-left: 15px;
  color: #2c3e50;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  word-break: break-all;
  white-space: normal;
  font-size: 14px;
}

th {
  background-color: #2c3e50;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

</style>
