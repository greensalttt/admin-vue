<template>
  <div class="container">
    <div class="header">
      <span class="cate">
        <router-link to="/">관리자 메인 페이지</router-link>
      </span>
    </div>

    <h2>회원 목록 (상태 D는 탈퇴한 회원입니다.)</h2>

    <div class="table-wrapper" v-if="custList.length">
      <table>
        <thead>
        <tr>
          <th>회원번호</th>
          <th>상태</th>
          <th>이메일</th>
          <th>닉네임</th>
          <th>우편번호</th>
          <th>도로명 주소</th>
          <th>지번 주소</th>
          <th>상세 주소</th>
          <th>최종 로그인</th>
          <th>가입일</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cust in custList">
          <td>{{ cust.cid }}</td>
          <td>{{ cust.statCd }}</td>
          <td>{{ cust.cemail }}</td>
          <td>{{ cust.cnick }}</td>
          <td>{{ cust.czip }}</td>
          <td>{{ cust.croadA }}</td>
          <td>{{ cust.cjibunA }}</td>
          <td>{{ cust.cdetA }}</td>
          <td>{{ formatDateTime(cust.loginDt) }}</td>
          <td>{{ formatDate(cust.createdAt) }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else style="text-align:center; margin-top:50px;">
      <p>회원 정보가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CustList',
  data() {
    return {
      custList: [],
    };
  },
  mounted() {
    this.fetchCustList();
  },
  methods: {
    async fetchCustList() {
      try {
        const res = await axios.get('/api/cust/list');
        this.custList = res.data || [];
      } catch (err) {
        console.error('회원 목록 조회 실패:', err);
        alert('회원 정보를 불러오지 못했습니다.');
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return '-';
      return new Date(dateStr).toISOString().split('T')[0]; // yyyy-MM-dd
    },
    formatDateTime(dateStr) {
      if (!dateStr) return '-';
      const date = new Date(dateStr);
      return `${date.toLocaleDateString('ko-KR')} ${date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 80px auto;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 30px;
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
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
}

.table-wrapper {
  max-height: 500px;
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid #ddd;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

thead th {
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
  text-align: left;
  font-size: 13px;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  white-space: nowrap;
  font-size: 12px;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
