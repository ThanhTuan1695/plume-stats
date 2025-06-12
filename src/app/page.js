"use client";
import React, { useState } from "react";

function StatBox({ label, value, color }) {
  return (
    <div
      style={{
        borderRadius: 12,
        padding: 20,
        margin: 10,
        minWidth: 150,
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <div style={{ fontWeight: 600, color: "#333", fontSize: 14 }}>{label}</div>
      <div style={{ fontSize: 22, color: "#2B68F8", fontWeight: 700, marginTop: 8 }}>{value}</div>
    </div>
  );
}

function PlumeStatsView({ data }) {
  const stats = data.stats || {};
  console.log(data)
  const season = data.seasonOneAllocation || {};
  return (
    <div style={{
      marginTop: 32,
      background: "#f3f6fa",
      borderRadius: 16,
      padding: 28,
      boxShadow: "0 4px 32px #cad3dd40",
      maxWidth: 900,
      marginLeft: "auto",
      marginRight: "auto",
    }}>
      <h2 style={{ color: "#2B68F8" }}>
        Wallet: <span style={{ fontWeight: 400, color: "#333" }}>{data.walletAddress}</span>
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        <StatBox label="Bridged Total" value={stats.bridgedTotal} color="#e1eaff" />
        <StatBox label="Swap Volume" value={stats.swapVolume} color="#e6f7e6" />
        <StatBox label="TVL Total USD" value={Number(stats.tvlTotalUsd).toLocaleString()} color="#ffeae6" />
        <StatBox label="Protocols Used" value={stats.protocolsUsed} color="#fff4e6" />
        <StatBox label="Total XP" value={stats.totalXp} color="#e6eaff" />
        <StatBox label="Daily Spin Streak" value={stats.dailySpinStreak} color="#f0e6ff" />
        <StatBox label="XP Rank" value={stats.xpRank} color="#e6fffa" />
        <StatBox label="Completed Quests" value={stats.completedQuests} color="#ffe6f2" />
        <StatBox label="TVL Levels" value={stats.currentTvlLevels} color="#e6fffa" />
      </div>

      <div style={{ marginTop: 28 }}>
        <h3 style={{ color: "#2B68F8", marginBottom: 10 }}>Detail XP Tracking</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <StatBox label="referral Number" value={stats.referralCount} color="#e1eaff" />
          <StatBox label="referral Bonus PP" value={stats.referralBonusXp} color="#e6f7e6" />
          <StatBox label="PP TX DAPP" value={stats.userSelfXp} color="#e1eaff" />
        </div>
      </div>
      <div style={{ marginTop: 28 }}>
        <h3 style={{ color: "#2B68F8", marginBottom: 10 }}>Staking Tracking</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <StatBox label="Staking amount" value={stats.plumeStaked} color="#e1eaff" />
          <StatBox label="Staking Streak" value={stats.plumeStakingStreak} color="#e6f7e6" />   
          <StatBox label="PP Staking" value={stats.plumeStakingPointsEarned} color="#e6f7e6" />
          <StatBox label="PP Staking Bonus" value={stats.plumeStakingBonusPointsEarned} color="#e6f7e6" />
        </div>
      </div>
      <div style={{ marginTop: 28 }}>
        <h3 style={{ color: "#2B68F8", marginBottom: 10 }}>Streak Tracking</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <StatBox label="Longest Swap Weeks" value={stats.longestSwapStreakWeeks} color="#e1eaff" />
          <StatBox label="Longest TVL" value={stats.longestTvlStreak} color="#e6f7e6" />
          <StatBox label="Longest Stake Days" value={stats.plumeStakingLongestStreakDays} color="#e1eaff" />
          {season.airdropClaim && (
            <StatBox label="Quest Bonus Activated" value={season.airdropClaim.questBonusActivatedCount} color="#ffeae6" />
          )}
        </div>
      </div>
      <div style={{ marginTop: 32, fontSize: 13, color: "#888",textAlign: "center" }}>
        
        <b>Referral Code:</b> {stats.referralCode}  <br />
        <b>Last Updated:</b> {stats.dateStr}
      </div>
    </div>
  );
}

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setErr("");
    setData(null);
    try {
      const res = await fetch(`/api/wallet?walletAddress=${wallet}`);
      const json = await res.json();
      if (json.data) setData(json.data);
      else setErr("Không tìm thấy wallet hoặc lỗi dữ liệu!");
    } catch (e) {
      setErr("Có lỗi xảy ra khi gọi API!");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", padding: 0, fontFamily: "Montserrat, Arial, sans-serif" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", paddingTop: 50 }}>
        <h1 style={{
          color: "#2B68F8",
          fontWeight: 800,
          fontSize: 32,
          letterSpacing: 1.2,
          marginBottom: 24,
          fontFamily: "Montserrat, Arial, sans-serif"
        }}>Plume Wallet Stats</h1>
        <div style={{
          display: "flex",
          gap: 10,
          marginBottom: 24,
          alignItems: "center"
        }}>
          <input
            value={wallet}
            onChange={e => setWallet(e.target.value)}
            placeholder="Nhập wallet address (0x...)"
            style={{
              flex: 1,
              padding: "12px 18px",
              borderRadius: 8,
              border: "1px solid #c6d0ed",
              fontSize: 16,
              outline: "none"
            }}
            onKeyDown={e => e.key === "Enter" && handleFetch()}
          />
          <button
            onClick={handleFetch}
            disabled={loading || !wallet}
            style={{
              background: "#2B68F8",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 22px",
              fontWeight: 700,
              fontSize: 16,
              cursor: loading || !wallet ? "not-allowed" : "pointer",
              opacity: loading || !wallet ? 0.6 : 1,
              boxShadow: "0 2px 8px #2B68F820"
            }}
          >
            {loading ? "Đang tải..." : "Xem"}
          </button>
        </div>
        {err && <div style={{ color: "#f44336", marginBottom: 20 }}>{err}</div>}
        {data && <PlumeStatsView data={data} />}
        {!data && !loading && (
          <div style={{
            marginTop: 60,
            color: "#aaa",
            textAlign: "center",
            fontSize: 18
          }}>
            Nhập địa chỉ ví Ethereum để xem thống kê Plume.
          </div>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 80, color: "#aaa", fontSize: 13 }}>
        Made with ❤️ by Leiz95 | Plume Mod
        Buy Me Coffee: 0x518A7ED92B00884aF1b94201307a8218BC4d5edf
      </div>
    </div>
  );
}