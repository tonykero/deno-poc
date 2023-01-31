import { Handlers } from "$fresh/server.ts"
import { WSData } from "./_middleware.ts";

export const handler: Handlers<any, WSData> = {
    async GET(req,ctx) {
        const state = await ctx.state;
        if(state.is_websocket && typeof state.socket !== 'undefined') {
            console.log("websocket request");
            state.socket.onopen = () => console.log("websocket opened");
            state.socket.onmessage = (e) => {
                console.log("message: " + e.data);
            }
        }

        console.log("http request");
        return new Response("This route is a websocket route")
    }
};