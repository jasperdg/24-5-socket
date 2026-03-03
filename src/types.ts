export interface FeedResultData {
  composite_rate: number;
  timestamp: number;
  active_session: string;
}

export interface ExecuteResponse {
  _tag: "ExecuteResponse";
  data: {
    result: FeedResultData;
    dataResult: { exitCode: number; result: string };
    signature: string;
  };
}

export interface FailedExecutionError {
  _tag: "FailedExecutionResponse";
  data: Record<string, unknown>;
}

export interface WsMessage {
  jsonrpc: string;
  id?: string;
  method?: string;
  result?: { feedId?: string } & ExecuteResponse;
  params?: {
    feedId?: string;
    result?: ExecuteResponse;
    error?: FailedExecutionError;
  };
  error?: {
    code?: number;
    message?: string;
    _tag?: string;
    data?: Record<string, unknown>;
  };
}
