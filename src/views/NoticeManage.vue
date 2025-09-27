<template>
  <div class="container">
    <div class="header">
      <span class="cate">
        <router-link to="/">관리자 메인 페이지</router-link>
      </span>
    </div>

    <div v-if="noticeList.length === 0" id="nonotice">
      공지사항이 없습니다.
    </div>

    <table v-else>
      <thead>
      <tr>
        <th class="no">번호</th>
        <th class="title">제목</th>
        <th class="writer">닉네임</th>
        <th class="regdt">등록일</th>
        <th class="actions">관리</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="notice in noticeList" :key="notice.nno">
        <td class="no">{{ notice.nno }}</td>
        <td class="title">
          <a :href="`/notice/read?nno=${notice.nno}`">{{ notice.title }}</a>
        </td>
        <td class="writer">{{ notice.writer }}</td>
        <td class="regdt">{{ formatDate(notice.createdAt) }}</td>
        <td class="actions">
          <button @click="goEdit(notice.nno)" class="delete-btn">수정</button>
          <button @click="removeNotice(notice.nno)" class="delete-btn">삭제</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NoticeManage',
  data() {
    return {
      noticeList: [],
    };
  },
  mounted() {
    this.fetchNoticeList();
  },
  methods: {
    async fetchNoticeList() {
      try {
        const response = await axios.get('/api/notice/manage', { withCredentials: true });
        this.noticeList = response.data;
      } catch (error) {
        console.error('공지사항 목록 불러오기 실패', error);
      }
    },
    goEdit(nno) {
      this.$router.push(`/notice/${nno}/edit`);
    },
    async removeNotice(nno) {
      if (!confirm('정말 삭제하시겠습니까?')) return;

      try {
        const response = await axios.delete(`/api/notice/${nno}/remove`, {
          withCredentials: true,
        });
        alert(response.data || '삭제 완료');
        await this.fetchNoticeList();
      } catch (error) {
        console.error('공지사항 삭제 실패', error);
        if (error.response && error.response.data) {
          alert(error.response.data);
        } else {
          alert('공지사항 삭제에 실패했습니다.');
        }
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date >= today) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        return date.toISOString().slice(0, 10);
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 1100px;
  margin: auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
.actions { width: 10%; }

#nonotice {
  margin-top: 100px;
  margin-bottom: 120px;
  text-align: center;
  font-size: 18px;
}

a {
  text-decoration: none;
  color: #333;
}

.delete-btn {
  background-color: darkgreen;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}
</style>
