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
      <input v-model="album.genre" required maxlength="15" />

      <label>앨범 제목:</label>
      <input v-model="album.title" required maxlength="30" />

      <label>아티스트:</label>
      <input v-model="album.artist" required maxlength="20" />

      <label>내용:</label>
      <textarea v-model="album.content" rows="8"></textarea>

      <label>발매일:</label>
      <input type="date" v-model="album.released" />

      <label>앨범 이미지:</label>
      <input type="file" @change="handleImageUpload" />
      <img :src="preview" v-if="preview" width="100" />

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

        await axios.post('/api/admin/album', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert('앨범 등록 성공!');
        this.$router.push('/admin/page'); // 관리자 홈으로 리다이렉트
      } catch (err) {
        alert('앨범 등록 실패');
        console.error(err);
      }
    }
  }
};
</script>
