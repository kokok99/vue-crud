<template>
    <main class="about-page">
        <h1>CRUD</h1>

        <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="col">
          <input type="text" class="form-control" placeholder="name" v-model="student.name">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="course" v-model="student.course">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="rating" v-model="student.rating">
        </div>
        <button class="btn btn-primary">Submit</button>
      </div>
    </form> <br>
     <table class="table">
        <thead>
          <th>Name</th>
          <th>Course</th>
          <th>Rating</th>
          <th>Delete</th>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id" @dblclick="$data.student = student">
            <td>{{student.name}}</td>
            <td>{{student.course}}</td>
            <td>{{student.rating}}</td>
            <td>
              <button class="btn btn-outline-danger btn-sm" @click="deleteStudent(student)">X</button>
            </td>
          </tr>
        </tbody>
     </table>
    </main>

</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      student : {
        
      },

      students:[]
    }
  },
  async created(){
    await this.getStudents()
  },
  methods: {
    submitForm(){
        if (this.student.id === undefined){
          this.createStudent();
        } else {
          this.editStudent();
        }
    },
    async getStudents() {
      var response = await fetch('https://backendcrud.pythonanywhere.com/api/students/');
     this.students = await response.json();
    },
    async createStudent() {
        await this.getStudents();
        await fetch('https://backendcrud.pythonanywhere.com/api/students/', {
          method: 'post',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(this.student)
        });
        await this.getStudents();

    },
    async editStudent() {
      await this.getStudents();
        await fetch(`https://backendcrud.pythonanywhere.com/api/students/${this.student.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(this.student)
        });
        await this.getStudents();
        this.student = {};
    },
    async deleteStudent(student) {
      await this.getStudents();
        await fetch(`https://backendcrud.pythonanywhere.com/api/students/${student.id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(this.student)
        });
        await this.getStudents();
        this.student = {};
    }
  }
  
}
</script>