import { MiddlewareHandlerContext } from "$fresh/server.ts";

export type WSData = {
    is_websocket: boolean,
    socket?: WebSocket
}

export async function handler(req: Request, ctx: MiddlewareHandlerContext<WSData>) {
    const upgrade = req.headers.get("upgrade") || "";
    if (upgrade.toLowerCase() != "websocket") {
        ctx.state = {
            is_websocket: false
        }
        // return HTTP Response
        return await ctx.next();
    }
    console.log("Received websocket request");
    console.log(req);

    const { socket, response } = Deno.upgradeWebSocket(req);
    ctx.state = {
        is_websocket: true,
        socket: socket
    }
    await ctx.next();
    // return WebSocket Response
    return response;
}