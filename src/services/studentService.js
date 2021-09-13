import client from './client';

//Get Student
const getStudents = async () => {
  const endpoint = `/students`;

  try {
    const response = await client.get(endpoint);
    const data = response.data;
    return data;
  } catch (error) {
    return console.error(error);
  }
};

//Get Student By ID or Name
const getStudentById = async (text) => {
  const endpoint = `/students/search?text=${text}`;

  try {
    const response = await client.get(endpoint);
    const data = response.data;
    return data;
  } catch (error) {
    return console.error(error);
  }
};

//Admit Student
const admitStudent = async (data) => {
  const endpoint = `/students`;

  try {
    const response = await client.post(endpoint, data);
    console.log('Admit Student Res:', response);
    return response;
  } catch (error) {
    return console.error(error);
  }
};

export default {
  getStudents,
  getStudentById,
  admitStudent,
};
