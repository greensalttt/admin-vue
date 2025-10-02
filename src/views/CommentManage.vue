<template>
  <div class="container">
    <div class="domestic">
      <span class="cate">
        <router-link to="/dashboard">관리자 메인 페이지</router-link>
      </span>
    </div>

    <div v-if="loading" style="text-align:center; margin: 20px;">로딩중...</div>

    <div v-else>
      <div v-if="comments.length === 0" id="nocomment">댓글이 없습니다.</div>

      <table v-else>
        <thead>
        <tr>
          <th class="no">게시글 번호</th>
          <th class="title">댓글 내용</th>
          <th class="writer">닉네임</th>
          <th class="regdt">등록일</th>
          <th class="actions">관리</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="comment in comments" :key="comment.cno">
          <td class="no">
            <a :href="`/board/read?bno=${comment.bno}`">{{ comment.bno }}</a>
          </td>
          <td class="title">{{ comment.comment }}</td>
          <td class="writer">{{ comment.commenter }}</td>
          <td class="regdt">
            {{ formatDate(comment.createdAt) }}
          </td>
          <td class="actions">
            <button class="delete-btn" @click="deleteComment(comment)">삭제</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import axios from '@/utils/axios'


export default {
  name: 'CommentManage',
  data() {
    return {
      comments: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      this.loading = true;
      try {
        const res = await axios.get('/comments/manage');
        this.comments = res.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async deleteComment(comment) {
      if (!confirm('정말 삭제하시겠습니까?')) return;

      try {
        await axios.delete(`/comments/${comment.cno}/remove`, {
          data: {
            cno: comment.cno,
            bno: comment.bno,
            createdBy: comment.createdBy,
          }
        });
        alert('댓글 삭제가 완료되었습니다.');
        this.fetchComments();
      } catch (err) {
        if (err.response && err.response.status === 403) {
          alert('테스트 아이디는 삭제할 수 없습니다.');
        } else {
          alert('댓글 삭제가 실패했습니다.');
        }
        console.error(err);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();

      return isToday
          ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : date.toISOString().slice(0, 10);
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
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.no { width: 10%; }
.title { width: 40%; text-align: left; }
.writer { width: 15%; }
.regdt { width: 25%; }
.actions { width: 10%; }

#nocomment {
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
