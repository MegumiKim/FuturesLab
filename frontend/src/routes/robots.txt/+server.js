const robotsDefault = `User-agent: *
Disallow: /`;

const robotsProduction = `User-agent: *
Disallow:`;

export async function GET() {
	return new Response(process.env.SST_STAGE === 'production' ? robotsProduction : robotsDefault);
}

export const prerender = true;
