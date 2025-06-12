export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const walletAddress = searchParams.get("walletAddress");
      if (!walletAddress) {
        return Response.json({ error: "Missing walletAddress" }, { status: 400 });
      }
      const res = await fetch(
        `https://portal-api.plume.org/api/v1/stats/wallet?walletAddress=${walletAddress}`
      );
      if (!res.ok) {
        return Response.json({ error: "Upstream API error" }, { status: 500 });
      }
      const data = await res.json();
      return Response.json(data);
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }