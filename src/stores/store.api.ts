import {
    plainToClass,
    plainToInstance,
  } from 'class-transformer';
  import router from '../router';
  export type Endpoints =
    | 'daily_json.js'
 ;
    
  
  export interface Query {
    key: string;
    value: string;
  }
  export interface ApiError extends Error {
    status: number;
  }
  
  export class Api {
    static shared = () => {
      const  isProd = import.meta.env.PROD
      const PORT = import.meta.env.VITE_SERVER_PORT || ''
      const HOST = import.meta.env.VITE_SERVER_HOST || `http://localhost`
   if(isProd)
   return new Api(import.meta.env.VITE_REMOTE_SERVER_HOST)
      return new Api(HOST+`:${PORT}/api`);
      };
    private rootPath: string;
    path: string = '';
    constructor(rootPath: string) {
      this.rootPath = rootPath;
    }
    child(endpoint: Endpoints, params?: string): Api {
      this.path = this.path + `/${endpoint}`;
      if (params) this.path = this.path + `/${params}`;
      return this;
    }
    async get<Entity>(
      queryParams: Array<Query> = [],
      constructor: any,
    ): Promise<Entity> {
      let url = new URL(`${this.rootPath}${this.path}`);      
      queryParams.forEach((q) => url.searchParams.append(q.key, q.value));
      const response: string = await fetch(url.toString(), {
        mode: "cors",
        method: 'GET',
      }).then((response) => {                
        return this.handleResponse(response);
      });
      return await plainToInstance<Entity, string>(constructor, response);
    }
  
  
    private handleResponse(response: Response): Promise<any> {
      return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('account');
  
            router.push('/auth');
            location.reload();
          }
          const error = (data && data.error) || response.statusText;
          const apiError: ApiError = {
            status: response.status,
            name: 'apiError',
            message: error,
          };
        
          throw apiError;
        }
        return data;
      });
    }
  }
    