import React, { useState } from "react";
import BottomNav from "./BottomNav";
import "./Profile.css";

function MirLogo() {
  return <span style={{fontWeight:700, color:'#3c8c3c', fontSize:22, marginRight:8}}>МИР</span>;
}
function McLogo() {
  return <span style={{fontWeight:700, color:'#e74c3c', fontSize:22, marginRight:8}}>●●</span>;
}

export default function PaymentMethods() {
  const [active, setActive] = useState("mir");
  return (
    <div className="profile-page pay-page">
      <div className="pay-title">Способы оплаты</div>
      <div className="pay-cards-list">
        <div
          className={"pay-card" + (active === "mir" ? " active" : "")}
          onClick={()=>setActive("mir")}
        >
          <MirLogo /> <span className="pay-card-dots">.... 9924</span>
        </div>
        <div
          className={"pay-card" + (active === "mc" ? " active" : "")}
          onClick={()=>setActive("mc")}
        >
          <McLogo /> <span className="pay-card-dots">.... 2961</span>
        </div>
      </div>
      <div className="pay-add-link">Добавить способ оплаты →</div>
      <BottomNav />
    </div>
  );
} 