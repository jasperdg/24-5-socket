import WebSocket, { RawData } from "ws";
import { WsMessage } from "./types";
import { WS_URL, feedStartRequest } from "./config";

let feedId: string | null = null;

export function connect(): WebSocket {
  const ws = new WebSocket(WS_URL, {
    headers: { Authorization: `Bearer ${process.env.SEDA_FAST_API_KEY}` },
  });

  ws.on("open", () => console.log("Connected"));

  ws.on("message", (data: RawData) => {
    const msg: WsMessage = JSON.parse(data.toString());

    if (msg.method === "authorized") {
      console.log("Authorized");
      ws.send(JSON.stringify(feedStartRequest));
    }

    if (msg.id === "req-1" && msg.result?.feedId) {
      feedId = msg.result.feedId;
      console.log("Feed started:", feedId);
    }

    if (msg.method === "feed.result" && msg.params?.feedId === feedId) {
      if (msg.params.result) {
        const { composite_rate, timestamp, active_session } =
          msg.params.result.data.result;
        console.log(
          `new price received: ${composite_rate} at ${timestamp} for session ${active_session}`
        );
      }
      if (msg.params.error) {
        console.error(
          "Feed execution error:",
          JSON.stringify(msg.params.error, null, 2)
        );
      }
    }

    if (msg.error) {
      console.error("Error:", msg.error.code, msg.error.message);
      if (msg.error._tag === "FailedExecutionResponse") {
        console.error(
          "Execution details:",
          JSON.stringify(msg.error.data, null, 2)
        );
      }
    }
  });

  ws.on("error", (e: Error) => console.error("WebSocket error:", e));

  ws.on("close", (code: number, reason: Buffer) => {
    console.log(
      "Disconnected",
      code ? `(${code}${reason ? `: ${reason}` : ""})` : ""
    );
  });

  process.on("SIGINT", () => {
    if (feedId) {
      console.log("\nStopping feed...");
      ws.send(
        JSON.stringify({
          jsonrpc: "2.0",
          id: "req-stop",
          method: "feed.stop",
          params: { feedId },
        })
      );
    }
    setTimeout(() => ws.close(1000, "closed by client"), 500);
  });

  return ws;
}
