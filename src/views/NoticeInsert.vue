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
        const response = await fetch("/api/notice/write", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.notice),
          credentials: "include" // 세션 유지용
        });

        if (!response.ok) {
          const errorMsg = await response.text();
          alert(`등록 실패: ${errorMsg}`);
          this.loading = false;
          return;
        }

        const result = await response.text();
        alert(result); // "공지사항 등록 완료"

        // 등록 완료 후 초기화 또는 페이지 이동
        // this.notice.title = "";
        // this.notice.content = "";
        this.$router.push('/') // 라우터 사용 시
      } catch (err) {
        alert("서버 오류가 발생했습니다.");
        console.error(err);
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
  background-color: #fff;
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
