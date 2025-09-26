<template>
  <div class="container">
    <div class="domestic">
      <span class="cate">
        <router-link to="/">관리자 메인 페이지</router-link>
      </span>
    </div>

    <div v-if="loading" style="text-align:center; margin: 20px;">로딩중...</div>

    <div v-else>
      <div v-if="boardDtos.length === 0" id="noboard">게시글이 없습니다.</div>

      <table v-else>
        <thead>
        <tr>
          <th class="no">번호</th>
          <th class="title">제목</th>
          <th class="writer">닉네임</th>
          <th class="regdt">등록일</th>
          <th class="viewcnt">조회수</th>
          <th class="actions">관리</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="boardDto in boardDtos" :key="boardDto.bno">
          <td class="no">{{ boardDto.bno }}</td>
          <td class="title">
            <a :href="`/board/read?bno=${boardDto.bno}`">{{ boardDto.title }}</a>
          </td>
          <td class="writer">{{ boardDto.writer }}</td>
          <td class="regdt">
            {{ formatDate(boardDto.createdAt) }}
          </td>
          <td class="viewcnt">{{ boardDto.viewCnt }}</td>
          <td class="actions">
            <button
                class="delete-btn"
                @click="confirmDelete(boardDto.bno, boardDto.createdBy)"
            >
              삭제
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BoardManage',
  data() {
    return {
      boardDtos: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchBoards();
  },
  methods: {
    async fetchBoards() {
      this.loading = true;
      try {
        const res = await axios.get('/api/board/manage');
        this.boardDtos = res.data || [];
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const now = new Date();

      // 오늘 시작 시점 구하기
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (date >= startOfToday) {
        // 오늘이면 시간(HH:mm) 표시
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
      } else {
        // 오늘 이전이면 날짜(yyyy-MM-dd) 표시
        return date.toISOString().slice(0, 10);
      }
    },
    async confirmDelete(bno, createdBy) {
      if (!confirm('정말 삭제하시겠습니까?')) return;

      try {
        const formData = new FormData();
        formData.append('bno', bno);
        formData.append('createdBy', createdBy);

        await axios.delete(`/api/board/${bno}/remove`, {
          withCredentials: true,
        });
        alert('게시글 삭제가 완료되었습니다.');
        this.fetchBoards(); // 삭제 후 목록 재조회
        this.$router.push('/board/manage');
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 403) {
          alert('테스트 아이디는 삭제할 수 없습니다.');
        } else {
          alert('게시글 삭제가 실패했습니다.');
        }
      }
    },
  },
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
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.no { width: 8%; }
.title { width: 35%; text-align: left; }
.writer { width: 15%; }
.regdt { width: 15%; }
.viewcnt { width: 10%; }
.actions { width: 10%; }

#noboard {
  margin-top: 100px;
  margin-bottom: 120px;
  text-align: center;
  font-size: 18px;
  color: #666;
}

a {
  color: #333;
  text-decoration: none;
}

.delete-btn {
  background-color: darkgreen;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
