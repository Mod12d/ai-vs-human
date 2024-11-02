export interface Theme {
    prompt: string;
    example?: string;
    maxLength: number;
  }
  
  export interface Response {
    content: string;
    timestamp: Date;
  }