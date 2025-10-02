<template>
  <div id="notice">
    <h2>공지사항 수정</h2>

    <form @submit.prevent="submitForm">
      <label for="title">제목:</label>
      <input
          type="text"
          id="title"
          v-model.trim="notice.title"
          maxlength="30"
          required
      />

      <label for="content">내용:</label>
      <textarea
          id="content"
          v-model.trim="notice.content"
          rows="8"
          required
      ></textarea>

      <button type="submit">공지사항 수정</button>
    </form>
  </div>
</template>

<script>

import axios from '@/utils/axios'


export default {
  name: 'NoticeEdit',
  props: {
    nno: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      notice: {
        nno: null,
        title: '',
        content: '',
      },
    };
  },

  async mounted() {
    await this.fetchNotice();
  },
  methods: {
    async fetchNotice() {
      try {
        const res = await axios.get(`/notice/${this.nno}/edit`);
        this.notice = res.data;
      } catch (err) {
        console.error('공지사항 불러오기 실패', err);
        alert('공지사항을 불러오는 데 실패했습니다.');
        this.$router.push('/');
      }
    },
    async submitForm() {
      const { title, content } = this.notice;

      if (!title || !content) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
      }

      try {
        await axios.put(`/notice/${this.notice.nno}/edit`, this.notice, {
          withCredentials: true, // 세션 필요 시
        });
        alert('공지사항 수정 완료');
        this.$router.push('/notice/manage'); // 수정 후 리스트로 이동
      } catch (err) {
        console.error('공지사항 수정 실패', err);
        alert('공지사항 수정에 실패했습니다.');
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f9;
  margin: 0;
  padding: 0;
}

#notice {
  max-width: 700px;
  margin: 100px auto;
  background-color: #fff;
  padding: 40px 50px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

input[type='text'],
textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
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
</style>
