import axios from '@/plugins/axios';

const resource = '/users';

export default {
  getUser(id) {
      return axios.get(`${resource}/${id}`);
  },
};