export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const walletAddress = searchParams.get("walletAddress");
  
      if (walletAddress) {
        // Fetch wallet stats for a specific wallet address
        const res = await fetch(
          `https://portal-api.plume.org/api/v1/stats/pp-totals?walletAddress=${walletAddress}`
        );
        if (!res.ok) {
          return Response.json({ error: "Upstream API error" }, { status: 500 });
        }
        const data = await res.json();
        return Response.json(data);
      } else {
        // Return an error if no walletAddress is provided
        return Response.json({ error: "No walletAddress provided" }, { status: 400 });
      }
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }