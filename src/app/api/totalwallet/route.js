// export async function GET() {
//     let offset = 0;
//     const count = 9999;
//     let totalWallets = 0;
//     let hasMoreData = true;
  
//     try {
//       while (hasMoreData) {
//         const res = await fetch(
//           `https://portal-api.plume.org/api/v1/stats/leaderboard?offset=${offset}&count=${count}&walletAddress=undefined&overrideDay1Override=false&preview=false`
//         );
//         if (!res.ok) {
//           throw new Error(`Upstream API error with status: ${res.status}`);
//         }
//         const json = await res.json();
//         console.log(json);
  
//         if (json.data.leaderboard && json.data.leaderboard.length > 0) {
//           totalWallets += json.data.leaderboard.length;
//           offset += count;
//           console.log(offset)
//         } else {
//           hasMoreData = false;
//         }
//       }
//       totalWallets += offset;
//       return new Response(JSON.stringify({ totalWallets }), { status: 200 });
//     } catch (error) {
//       return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }
//   }
export async function GET() {
    let offset = 0;
    const count = 9999;
    let totalWallets = 0;
    let totalXP = 0; // Biến để lưu tổng XP
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
  
        if (json.data.leaderboard && json.data.leaderboard.length > 0) {
          // Cộng dồn số lượng ví
          totalWallets += json.data.leaderboard.length;
  
          // Cộng dồn tổng XP
          for (const item of json.data.leaderboard) {
            totalXP += item.totalXp || 0; // Lấy giá trị totalXp, nếu không có thì mặc định là 0
          }
  
          offset += count;
        } else {
          hasMoreData = false;
        }
      }
      
    //   totalWallets += offset;
      console.log(`Offset: ${totalWallets}, Total XP: ${totalXP}`);
      // Trả về tổng số ví và tổng XP
      return new Response(JSON.stringify({ totalWallets, totalXP }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }