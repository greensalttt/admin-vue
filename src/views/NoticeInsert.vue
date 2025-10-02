<template>
  <div id="notice" class="container">
    <h2>공지사항 등록</h2>
    <form @submit.prevent="submitNotice">
      <label for="title">제목:</label>
      <input
          type="text"
          id="title"
          v-model="notice.title"
          maxlength="30"
          required
          autocomplete="off"
      />

      <label for="content">내용:</label>
      <textarea
          id="content"
          v-model="notice.content"
          rows="8"
          required
      ></textarea>

      <button type="submit" :disabled="loading">
        {{ loading ? "등록 중..." : "공지사항 등록" }}
      </button>
    </form>
  </div>
</template>
<script>

import axios from '@/utils/axios'

export default {
  name: "NoticeWrite",
  data() {
    return {
      notice: {
        title: "",
        content: ""
      },
      loading: false
    };
  },
  methods: {
    async submitNotice() {
      if (!this.notice.title.trim()) {
        alert("제목 항목을 입력해주세요.");
        return;
      }
      if (!this.notice.content.trim()) {
        alert("내용 항목을 입력해주세요.");
        return;
      }

      this.loading = true;

      try {
        const response = await axios.post("/notice/write", this.notice, {
          withCredentials: true // 세션/쿠키 인증 유지
        });

        alert(response.data || "등록이 완료되었습니다.");
        this.$router.push('/');
      } catch (error) {
        if (error.response) {
          // 서버 응답이 있고, 에러 메시지를 전달하는 경우
          alert(`등록 실패: ${error.response.data}`);
        } else {
          // 네트워크 에러 또는 다른 오류
          alert("서버 오류가 발생했습니다.");
        }
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 100px auto;
  padding: 40px 50px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f9;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

label {
  font-weight: bold;
  display: block;
  margin-top: 20px;
  margin-bottom: 5px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

button {
  margin-top: 30px;
  width: 100%;
  padding: 12px;
  background-color: darkgreen;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
