<template>
  <div id="wrapper">
    <div id="performanceListContainer">
      <div class="domestic">
        <span class="cate">
          <router-link to="/">관리자 메인 페이지</router-link>
        </span>
      </div>

      <div class="list">
        <div v-if="performanceDtos.length === 0" id="noPerformance">
          등록된 공연이 없습니다.
        </div>

        <div v-for="performance in performanceDtos" :key="performance.pno" class="performance-card">
          <img :src="performance.img" :alt="performance.title" />
          <div class="info">
            <p class="artist">{{ performance.artist }}</p>
            <p class="title">{{ performance.title }}</p>
            <p class="date">Date: {{ performance.date }}</p>
            <p class="venue">{{ performance.venue }}</p>
          </div>
          <div class="performance-actions">
            <button @click="goToEdit(performance.pno)">수정</button>
            <button @click="confirmRemove(performance.pno)">삭제</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PerformanceManage",
  data() {
    return {
      performanceDtos: [],
      performanceRemoveFail: false,
      performanceRemove: false,
      performanceModify: false,
      testAid: false,
    };
  },
  methods: {
    fetchPerformances() {
      // 서버에서 공연 목록 받아오기
      axios
          .get("/api/performances")
          .then((response) => {
            this.performanceDtos = response.data;
          })
          .catch((error) => {
            console.error("공연 목록 불러오기 실패:", error);
          });
    },
    goToEdit(pno) {
      this.$router.push(`/admin/performance_edit?pno=${pno}`);
    },
    confirmRemove(pno) {
      if (confirm("정말 삭제하시겠습니까?")) {
        this.removePerformance(pno);
      }
    },
    removePerformance(pno) {
      // 삭제 API 호출 (예시)
      axios
          .post("/admin/performance_remove", { pno })
          .then(() => {
            alert("공연 삭제가 완료되었습니다.");
            this.fetchPerformances();
          })
          .catch(() => {
            alert("공연 삭제가 실패했습니다.");
          });
    },
  },
  mounted() {
    this.fetchPerformances();

    // JSP에서 플래그를 받아서 처리하는 부분 예시 (필요하면 props 등으로 구현)
    if (this.performanceRemoveFail) alert("공연 삭제가 실패했습니다.");
    if (this.performanceRemove) alert("공연 삭제가 완료되었습니다.");
    if (this.performanceModify) alert("공연 수정에 성공했습니다.");
    if (this.testAid) alert("테스트 아이디는 삭제할 수 없습니다.");
  },
};
</script>

<style scoped>
#wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#performanceListContainer {
  width: 70%;
  margin: 100px auto 100px auto;
  flex: 1;
}

.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.performance-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.performance-card img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.performance-card .info {
  padding: 10px;
}

.artist {
  font-size: 16px;
  font-weight: bold;
  color: black;
}

.title {
  color: grey;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.date,
.venue {
  font-size: 12px;
  color: #666;
}

.performance-actions {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid #eee;
}

.performance-actions button {
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#performanceListContainer .domestic {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.cate a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  margin: 0 5px;
}

</style>
