<template>
  <div class="performance-edit-container">
    <h2>공연 수정</h2>
    <div v-if="loading">로딩중...</div>
    <div v-else>
      <form @submit.prevent="submitEdit" enctype="multipart/form-data">
        <div>
          <label>공연 이미지 미리보기:</label><br />
          <img :src="previewImg || performance.img" alt="공연 이미지" style="max-width:200px; max-height:200px; object-fit:cover;" />
        </div>
        <div>
          <label for="imgFile">이미지 변경:</label>
          <input type="file" id="imgFile" @change="onFileChange" accept="image/*" />
        </div>

        <div>
          <label for="title">공연 제목:</label>
          <input type="text" id="title" v-model="form.title" required maxlength="30" />
        </div>
        <div>
          <label for="artist">아티스트:</label>
          <input type="text" id="artist" v-model="form.artist" required maxlength="20" />
        </div>
        <div>
          <label for="duration">공연 시간:</label>
          <input type="text" id="duration" v-model="form.duration" maxlength="10" />
        </div>
        <div>
          <label for="rating">관람 연령:</label>
          <input type="text" id="rating" v-model="form.rating" maxlength="10" />
        </div>
        <div>
          <label for="venue">공연장:</label>
          <input type="text" id="venue" v-model="form.venue" maxlength="20" />
        </div>
        <div>
          <label for="genre">장르:</label>
          <select id="genre" v-model="form.genre">
            <option value="">-- 선택하세요 --</option>
            <option value="콘서트">콘서트</option>
            <option value="스포츠">스포츠</option>
          </select>
        </div>
        <div>
          <label for="date">공연 날짜:</label>
          <input type="date" id="date" v-model="form.date" />
        </div>
        <div>
          <label for="price">가격:</label>
          <input type="text" id="price" v-model="form.price" maxlength="10" />
        </div>
        <div>
          <label for="content">공연 소개:</label>
          <textarea id="content" v-model="form.content" rows="10"></textarea>
        </div>

        <div>
          <button type="submit">수정 완료</button>
        </div>
        <div v-if="errorMsg" style="color:red; margin-top:10px;">{{ errorMsg }}</div>
        <div v-if="successMsg" style="color:green; margin-top:10px;">{{ successMsg }}</div>
      </form>
    </div>
  </div>
</template>

<script>

import axios from '@/utils/axios'


export default {
  name: 'PerformanceEdit',
  data() {
    return {
      performance: null,
      form: {
        title: '',
        artist: '',
        duration: '',
        rating: '',
        venue: '',
        genre: '',
        date: '',
        price: '',
        content: '',
        img: ''
      },
      selectedFile: null,
      previewImg: null,
      loading: true,
      errorMsg: '',
      successMsg: ''
    };
  },
  async mounted() {
    const pno = this.$route.params.pno;
    try {
      const res = await axios.get(`/performance/${pno}/edit`);
      this.performance = res.data;
      this.form.title = res.data.title;
      this.form.artist = res.data.artist;
      this.form.duration = res.data.duration;
      this.form.rating = res.data.rating;
      this.form.venue = res.data.venue;
      this.form.genre = res.data.genre;
      this.form.date = res.data.date;
      this.form.price = res.data.price;
      this.form.content = res.data.content;
      this.form.img = res.data.img;
      this.loading = false;
    } catch (err) {
      console.error("공연 정보 가져오기 오류:", err);
      this.errorMsg = "공연 정보를 불러오는데 실패했습니다.";
      this.loading = false;
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = e => {
          this.previewImg = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.selectedFile = null;
        alert("이미지 파일을 선택해주세요.");
      }
    },
    async submitEdit() {
      if (!this.form.title.trim() || !this.form.artist.trim()) {
        this.errorMsg = "필요한 항목을 모두 입력하세요.";
        return;
      }

      const formData = new FormData();

      formData.append("title", this.form.title);
      formData.append("artist", this.form.artist);
      formData.append("duration", this.form.duration);
      formData.append("rating", this.form.rating);
      formData.append("venue", this.form.venue);
      formData.append("genre", this.form.genre);
      formData.append("date", this.form.date);
      formData.append("price", this.form.price);
      formData.append("content", this.form.content);
      // 이미지가 선택됐다면
      if (this.selectedFile) {
        formData.append("imgFile", this.selectedFile);
      }

      try {
        await axios.put(`/performance/${this.$route.params.pno}/edit`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        });
        alert("공연 수정 성공!");
        this.$router.push("/performance/manage");
      } catch (error) {
        console.error("공연 수정 실패:", error);
        this.errorMsg = error.response?.data || "수정 중 오류가 발생했습니다.";
        this.successMsg = '';
      }
    }
  }
};
</script>

<style scoped>
.performance-edit-container {
  max-width: 700px;
  margin: 50px auto;
  background: #fff;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.performance-edit-container h2 {
  text-align: center;
  margin-bottom: 20px;
}
.performance-edit-container form > div {
  margin-bottom: 15px;
}
.performance-edit-container form label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}
.performance-edit-container form input[type="text"],
.performance-edit-container form input[type="date"],
.performance-edit-container form select,
.performance-edit-container form textarea {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
}
.performance-edit-container button {
  padding: 10px 15px;
  background-color: darkgreen;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
