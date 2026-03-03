export const WS_URL = "wss://fast-ws.mainnet.seda.xyz/ws/v1";
export const PERIODICITY_MS = 250;

const execInputsHex =
  "0x" +
  Buffer.from(
    JSON.stringify({
      session_ids: [
        "0x61c4ca5b9731a79e285a01e24432d57d89f0ecdd4cd7828196ca8992d5eafef6",
        "0xb1073854ed24cbc755dc527418f52b7d271f6cc967bbf8d8129112b18860a593",
        "0x25719379353a508b1531945f3c466759d6efd866f52fbaeb3631decb70ba381f",
        "0xc949a96fd1626e82abc5e1496e6e8d44683ac8ac288015ee90bf37257e3e6bf6",
      ],
      weights: [100, 100, 100, 100],
    }),
    "utf8"
  ).toString("hex");

export const feedStartRequest = {
  jsonrpc: "2.0",
  id: "req-1",
  method: "feed.start",
  params: {
    execute: {
      execProgramId:
        "0xad880830f3d6a46024715640b1ffd80a373f61008003aaefbbdded06cd27e5ad",
      execInputs: execInputsHex,
      inputEncoding: "auto",
      includeDebugInfo: "true",
      injectLastResult: "success",
      encoding: "json",
    },
    periodicityMs: PERIODICITY_MS,
    mode: "FIXED",
  },
};
