<template>
  <div class="performance-insert">
    <h2>공연 등록</h2>
    <form @submit.prevent="submitPerformance" enctype="multipart/form-data">
      <label>공연 제목:</label>
      <input type="text" v-model="form.title" maxlength="30" required />

      <label>아티스트명:</label>
      <input type="text" v-model="form.artist" maxlength="20" required />

      <label>장르:</label>
      <select v-model="form.genre" required>
        <option disabled value="">-- 선택하세요 --</option>
        <option>콘서트</option>
        <option>스포츠</option>
      </select>

      <label>공연장:</label>
      <input type="text" v-model="form.venue" maxlength="20" required />

      <label>관람 시간:</label>
      <input type="text" v-model="form.duration" maxlength="10" placeholder="예: 120분" required />

      <label>관람 등급:</label>
      <input type="text" v-model="form.rating" maxlength="10" placeholder="예: 전체관람가" required />

      <label>공연 날짜:</label>
      <input type="date" v-model="form.date" required />

      <label>가격:</label>
      <input type="text" v-model="form.price" maxlength="10" required />

      <label>공연 설명:</label>
      <textarea v-model="form.content" rows="6" required></textarea>

      <label>공연 포스터:</label>
      <input type="file" @change="handleImageUpload" accept="image/*" required />
      <img :src="preview" alt="미리보기 이미지" v-if="preview" />

      <button type="submit">공연 등록</button>
    </form>
  </div>
</template>

<script>

import axios from '@/utils/axios'

export default {
  name: 'PerformanceInsert',
  data() {
    return {
      form: {
        title: '',
        artist: '',
        genre: '',
        venue: '',
        duration: '',
        rating: '',
        date: '',
        price: '',
        content: ''
      },
      imgFile: null,
      preview: null
    };
  },
  methods: {
    handleImageUpload(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.imgFile = file;
        const reader = new FileReader();
        reader.onload = event => {
          this.preview = event.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.preview = null;
        this.imgFile = null;
      }
    },
    async submitPerformance() {
      try {
        const formData = new FormData();
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }
        formData.append('imgFile', this.imgFile);

        await axios.post('/performance/write', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert('공연 등록 성공!');
        this.$router.push('/'); // 필요에 따라 라우팅 조정
      } catch (err) {
        alert('공연 등록 실패');
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.performance-insert {
  max-width: 700px;
  margin: 100px auto;
  background-color: #fff;
  padding: 40px 50px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
input[type="date"],
select,
textarea,
input[type="file"] {
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

img {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
