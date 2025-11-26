// 启动 Mock 服务器
import http from 'http';
import { mockDemoApiData } from '../utils/mocks';

export const startMockServer = (port: number) => {

  http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    // 检查请求方法是否为 POST
    console.log("req.method", req.method);
    
    if (req.method === 'POST') {
      let body = '';

      // 监听 data 事件，逐块接收数据
      req.on('data', (chunk) => {
        body += chunk; // 累加接收到的数据块
      });

      // 监听 end 事件，数据接收完毕
      req.on('end', () => {
        // 输出接收到的 POST 数据
        console.log('Received POST data:', body);
        res.end(JSON.stringify(mockDemoApiData(body)));
      });

    }
    return res.end(JSON.stringify({ code: 404, message: 'Not Found' }));
  }).listen(port);
};
