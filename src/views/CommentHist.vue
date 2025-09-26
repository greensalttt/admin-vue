<template>
  <div class="container">
    <div class="domestic">
      <span class="cate">
        <router-link to="/">관리자 메인 페이지</router-link>
      </span>
    </div>

    <h2>댓글 이력 보기</h2>

    <div v-if="loading" style="text-align: center; margin: 20px;">로딩중...</div>

    <table v-else>
      <thead>
      <tr>
        <th>이력 번호</th>
        <th>댓글 번호</th>
        <th>게시글 번호</th>
        <th>작성자 ID</th>
        <th>변경 코드</th>
        <th>변경 전</th>
        <th>변경 후</th>
        <th>변경 일시</th>
        <th>수정자</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="hist in commentHistList" :key="hist.coHistNum">
        <td>{{ hist.coHistNum }}</td>
        <td>{{ hist.cno }}</td>
        <td>{{ hist.bno }}</td>
        <td>{{ hist.cid }}</td>
        <td>{{ hist.coCngCd }}</td>
        <td>{{ hist.coBf }}</td>
        <td>{{ hist.coAf }}</td>
        <td>{{ formatDateTime(hist.createdAt) }}</td>
        <td>{{ hist.createdBy }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CommentHistory',
  data() {
    return {
      commentHistList: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchCommentHist();
  },
  methods: {
    async fetchCommentHist() {
      this.loading = true;
      try {
        const res = await axios.get('/api/comments/hist');
        this.commentHistList = res.data || [];
      } catch (error) {
        console.error('댓글 이력 로딩 실패:', error);
      } finally {
        this.loading = false;
      }
    },
    formatDateTime(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f9f9f9;
}

.domestic {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.2rem;
}

.cate {
  margin-right: 12px;
}

.cate a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
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
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  word-break: break-word;
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
