import { PageProps, Handlers } from "$fresh/server.ts";

let list: Array<string> = [];

export const handler: Handlers<Array<string>> = {
  async GET(req,ctx) {
    list.push(ctx.params.name);
    console.log(list);
    return await ctx.render(list);
  }
};

export default function Greet(props: PageProps) {
  const list = props.data.map((v: string) => {
    return (<div>Hello {v}</div>);
  });
  return (<div>{list}</div>);
}