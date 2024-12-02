import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";
import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import { siteConfig } from "@/site-config";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

// OGP画像生成の設定
const ogOptions: SatoriOptions = {
	fonts: [
		{
			data: Buffer.from(RobotoMono),
			name: "Roboto Mono",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(RobotoMonoBold),
			name: "Roboto Mono",
			style: "normal",
			weight: 700,
		},
	],
	height: 630,
	width: 1200,
};

// 固定ページ用のOGPマークアップ
const markup = () =>
	html`<div tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]">
		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<div tw="flex items-center">
				<img src="https://pbs.twimg.com/profile_images/1692602187795554304/KOy7bS--_400x400.png" width="150" height="150" tw="object-cover rounded-full" alt="Dokudami">
				<h1 tw="text-8xl ml-5 font-semibold">${siteConfig.title}</h1>
			</div>
			<p tw="text-2xl mt-6">:)</p>
		</div>
		<div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
		</div>
	</div>`;

// 固定のOGP画像生成
export async function GET() {
	// 固定ページの情報
	const title = "About Us";
	const description = "Learn more about our team and mission.";

	const svg = await satori(markup(title, description), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(png, {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}
