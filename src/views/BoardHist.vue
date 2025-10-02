<template>
  <div class="container">
    <div class="domestic">
      <span class="cate">
        <router-link to="/dashboard">관리자 메인 페이지</router-link>
      </span>
    </div>

    <div v-if="loading" style="text-align:center; margin: 20px;">로딩중...</div>

    <div v-else>
      <div v-if="boardHistList.length === 0" id="noboard">게시글 이력이 없습니다.</div>

      <table v-else>
        <thead>
        <tr>
          <th class="no">이력 번호</th>
          <th class="bno">게시글 번호</th>
          <th class="cid">작성자 ID</th>
          <th class="code">변경 코드</th>
          <th class="before">변경 전</th>
          <th class="after">변경 후</th>
          <th class="time">변경 일시</th>
          <th class="user">수정자</th>
        </tr>
        </thead>
        <tbody>
<!--        잭슨 형식-->
        <tr v-for="hist in boardHistList">
          <td class="no">{{ hist.bhistNum }}</td>
          <td class="bno">{{ hist.bno }}</td>
          <td class="cid">{{ hist.cid }}</td>
          <td class="code">{{ hist.bcngCd }}</td>
          <td class="before">{{ hist.bbf }}</td>
          <td class="after">{{ hist.baf }}</td>
          <td class="time">{{ formatDate(hist.createdAt) }}</td>
          <td class="user">{{ hist.createdBy }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'


export default {
  name: 'BoardHistories',
  data() {
    return {
      boardHistList: [],
      loading: false
    };
  },
  created() {
    this.fetchBoardHistories();
  },
  methods: {
    async fetchBoardHistories() {
      this.loading = true;
      try {
        const response = await axios.get('/board/hist');
        this.boardHistList = response.data || [];
      } catch (error) {
        console.error('게시글 이력 조회 실패:', error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Seoul'
      };
      return new Date(dateString)
          .toLocaleString('ko-KR', options)
          .replace(/\./g, '-')
          .replace(/ /, ' ');
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

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  word-break: break-word;
  white-space: normal;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.no { width: 8%; }
.bno { width: 8%; }
.cid { width: 12%; }
.code { width: 10%; }
.before { width: 15%; }
.after { width: 15%; }
.time { width: 17%; }
.user { width: 15%; }

#noboard {
  margin-top: 100px;
  margin-bottom: 120px;
  text-align: center;
  font-size: 18px;
  color: #666;
}
</style>
