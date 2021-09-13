import client from './client';

//Get Teacher
const getTeachers = async (data) => {
  const endpoint = `/teachers`;

  try {
    const response = await client.get(endpoint);
    const data = response.data;
    return data;
  } catch (error) {
    return console.error(error);
  }
};

//Get Teacher By ID or Name
const getTeacherById = async (text) => {
  const endpoint = `/teachers/search?text=${text}`;

  try {
    const response = await client.get(endpoint);
    const data = response.data;
    return data;
  } catch (error) {
    return console.error(error);
  }
};

//Admit Teacher
const admitTeacher = async (data) => {
  const endpoint = `/teachers`;

  try {
    const response = await client.post(endpoint, data);
    console.log('Admit Teacher Res:', response);
    return response;
  } catch (error) {
    return console.error(error);
  }
};

export default {
  getTeachers,
  getTeacherById,
  admitTeacher,
};
