import axios from 'axios';

class HelloWorldService {
  executeHelloWorldService(name) {
    return axios.get(`http://localhost:8080/hello-world/${name}`);
  }
}

export default new HelloWorldService();
