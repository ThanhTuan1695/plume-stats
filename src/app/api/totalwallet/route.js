export async function GET() {
    let offset = 179982;
    const count = 9999;
    let totalWallets = 0;
    let hasMoreData = true;
  
    try {
      while (hasMoreData) {
        const res = await fetch(
          `https://portal-api.plume.org/api/v1/stats/leaderboard?offset=${offset}&count=${count}&walletAddress=undefined&overrideDay1Override=false&preview=false`
        );
        if (!res.ok) {
          throw new Error(`Upstream API error with status: ${res.status}`);
        }
        const json = await res.json();
        console.log(json);
  
        if (json.data.leaderboard && json.data.leaderboard.length > 0) {
          totalWallets += json.data.leaderboard.length;
          offset += count;
          console.log(offset)
        } else {
          hasMoreData = false;
        }
      }
      totalWallets += offset;
      return new Response(JSON.stringify({ totalWallets }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }