import { createServer, type IncomingMessage, type ServerResponse } from 'http';

export interface MockServerOptions {
  port?: number;
  mockData?: Record<string, any>;
}

export class MockServer {
  private server: ReturnType<typeof createServer> | null = null;
  private port: number;
  private mockData: Record<string, any>;

  constructor(options: MockServerOptions = {}) {
    this.port = options.port || 3001;
    this.mockData = options.mockData || {};
  }

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        console.log(`[Mock Server] 服务器已在端口 ${this.port} 运行`);
        resolve();
        return;
      }

      this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
        this.handleRequest(req, res);
      });

      this.server.listen(this.port, () => {
        console.log(`[Mock Server] 服务器已启动在 http://localhost:${this.port}`);
        resolve();
      });

      this.server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
          console.warn(`[Mock Server] 端口 ${this.port} 已被占用，尝试使用其他端口...`);
          this.port += 1;
          this.start().then(resolve).catch(reject);
        } else {
          console.error('[Mock Server] 服务器启动失败:', error);
          reject(error);
        }
      });
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          console.log(`[Mock Server] 服务器已停止`);
          this.server = null;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    const url = req.url || '/';
    const method = req.method || 'GET';

    console.log(`[Mock Server] ${method} ${url}`);

    // 查找匹配的 mock 数据
    const mockKey = `${method} ${url}`;
    const mockResponse = this.mockData[mockKey] || this.mockData[url] || this.getDefaultResponse(url);

    // 设置响应头
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 模拟延迟
    setTimeout(() => {
      res.writeHead(mockResponse.status || 200);
      res.end(JSON.stringify(mockResponse.data || mockResponse));
    }, mockResponse.delay || 0);
  }

  private getDefaultResponse(url: string) {
    // 默认响应
    if (url.startsWith('/api/')) {
      return {
        status: 200,
        data: {
          code: 0,
          message: 'success',
          data: {
            url,
            timestamp: Date.now(),
            message: '这是来自 Mock Server 的默认响应',
          },
        },
      };
    }
    return {
      status: 404,
      data: {
        error: 'Not Found',
        message: `未找到 ${url} 的 mock 数据`,
      },
    };
  }

  // 添加 mock 数据
  addMockData(path: string, data: any, method: string = 'GET') {
    const key = `${method.toUpperCase()} ${path}`;
    this.mockData[key] = data;
    console.log(`[Mock Server] 添加 mock 数据: ${key}`);
  }

  // 获取当前端口
  getPort(): number {
    return this.port;
  }
}

