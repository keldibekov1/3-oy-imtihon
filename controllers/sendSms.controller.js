import axios from "axios";
let api = axios.create({
    baseURL:"https://notify.eskiz.uz/api",
    headers:{
      Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDI1MzAwMDYsImlhdCI6MTczOTkzODAwNiwicm9sZSI6InRlc3QiLCJzaWduIjoiZDk0NTNkZTU1NDEzYzZmZDM1ZjU5ODg3NGZjOWUyYjM2MDVlZjA3NGQzOGI4NTVkZDkzN2Y0MWNkYTdjMDgwZCIsInN1YiI6Ijk3MzQifQ.buZkrjDLmdkPbi7jI3YIOMCvGC0He4qZSoiKJ41JRbg"
    }
  })
  
  async function sendSMS(phone) {
      try {
        let message = "Bu Eskiz dan test" //bu yerda kursga yozilgan odamni name va phone bulishi mumkin
        let req = await api.post("/message/sms/send", {
          mobile_phone: phone,
          message: message,
          from: "4546",
        });
        // console.log(message);
        
        return message;
        
      } catch (error) {
        console.error("Xatolik yuz berdi:", error.response?.data || error.message);
        throw error;
      }
    };

    export default sendSMS;
