<template>
  <div class="album-insert">
    <h2>앨범 등록</h2>
    <form @submit.prevent="submitAlbum" enctype="multipart/form-data">
      <label>유형:</label>
      <select v-model="album.type" required>
        <option disabled value="">-- 선택하세요 --</option>
        <option>싱글</option>
        <option>EP</option>
        <option>정규</option>
        <option>믹스테잎</option>
      </select>

      <label>장르:</label>
      <input type="text" v-model="album.genre" required maxlength="15" />

      <label>앨범 제목:</label>
      <input type="text" v-model="album.title" required maxlength="30" />

      <label>아티스트:</label>
      <input type="text" v-model="album.artist" required maxlength="20" />


      <label>내용:</label>
      <textarea v-model="album.content" rows="8"></textarea>

      <label>발매일:</label>
      <input type="date" v-model="album.released" />

      <label>앨범 이미지:</label>
      <input type="file" @change="handleImageUpload" />
      <img :src="preview" alt="앨범 미리보기 이미지" v-if="preview" width="100" />


      <button type="submit">앨범 등록</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AlbumInsert',
  data() {
    return {
      album: {
        type: '',
        genre: '',
        title: '',
        artist: '',
        content: '',
        released: '',
      },
      imgFile: null,
      preview: null
    };
  },

  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.imgFile = file;
        const reader = new FileReader();
        reader.onload = e => this.preview = e.target.result;
        reader.readAsDataURL(file);
      }
    },
    async submitAlbum() {
      try {
        const formData = new FormData();
        for (const key in this.album) {
          formData.append(key, this.album[key]);
        }
        formData.append('imgFile', this.imgFile);

        await axios.post('/api/album/write', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert('앨범 등록 성공!');
        this.$router.push('/'); // 관리자 홈으로 리다이렉트
      } catch (err) {
        alert('앨범 등록 실패');
        console.error("에러:" + err);
      }
    }
  }
};

</script>

<style scoped>

.album-insert {
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

