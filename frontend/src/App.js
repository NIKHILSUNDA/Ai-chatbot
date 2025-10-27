import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import { FaLaptopCode, FaExternalLinkAlt, FaUserGraduate } from 'react-icons/fa';

const dashboardBgUrl = '/maindash.png';
const cuLogoUrl = '/culogo.png'; // CU logo file in public folder

function App() {
  const [showFounders, setShowFounders] = useState(false);
  const [studentAngle, setStudentAngle] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setStudentAngle(a => a + 8), 130);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{minHeight:'100vh', width:'100vw', position:'relative', background:'#3f3f3f'}}>
      {/* Blurred dashboard background image */}
      <img
        src={dashboardBgUrl}
        alt="Dashboard Background"
        style={{
          position: 'fixed',
          left: 0, top: 0, width: '100vw', height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.80,
          filter: 'blur(8px) brightness(0.92)'
        }}
      />

      {/* HEADER: Logo + Centered Title */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: 85,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'#a9a9a9',
        boxShadow:'0 2px 10px #0008',
        zIndex: 10
      }}>
        {/* CU Logo */}
        <div style={{position:'absolute', left:38, top:'18px', display:'flex',alignItems:'center'}}>
          <img src={cuLogoUrl} alt="CU Logo" style={{height:48, marginRight:10}}/>
        </div>
        {/* Center title */}
        <span style={{
          color:'#fff',
          fontWeight:'bold',
          fontSize: '1.7rem',
          letterSpacing:2,
        }}>
          Your Smart Campus Assistant
        </span>
      </div>

      {/* Admission helpline box */}
      <div style={{
        position:'fixed', top:10, right:39,
        zIndex:13,
        background:'#ED1C24', color:'#fff',
        borderRadius:12, boxShadow:'0 2px 12px #ED1C2480',
        display:'flex', alignItems:'center',
        fontWeight:'bold', fontSize:18,
        padding:'8px 24px 8px 10px', minWidth:220
      }}>
        <FaUserGraduate style={{
          color:'#FFD600',
          fontSize:'1.45em',
          marginRight:13,
          marginLeft:2,
          transform:`rotate(${studentAngle}deg)`,
          transition:'transform 0.14s'
        }} />
        <div style={{textAlign:'left', flex:'1'}}>
          <div style={{fontSize:15}}>Admission Helpline</div>
          <div style={{fontSize:22, fontWeight:'bold', letterSpacing:'1.1px'}}>1800121288800</div>
        </div>
      </div>

      {/* Chat Dashboard box + footer G A P */}
      <div style={{
        paddingTop: 110, 
        position: 'relative', 
        zIndex: 10, 
        paddingBottom: 58 // ---- Footer se 58px ka gap guaranteed
      }}>
        <ChatInterface />
      </div>

      {/* Footer - highlighted line at bottom */}
      <div style={{
        position: 'fixed', left: 0, bottom: 0, width: '100%',
        padding: '13px 0 13px 0',
        textAlign: 'center',
        fontSize: 12.3,
        color: '#fff',
        fontWeight:'bold',
        fontFamily:'monospace',
        background: '#3f3f3f',
        zIndex: 22,
        letterSpacing:1
      }}>
        Developed by Nikhil Sunda & Krishna Pareek
      </div>
      
      {/* Animated Floating Founders Button (footer se upar) */}
      <div
        style={{
          position:'fixed', bottom: 54, right: 27, zIndex: 20,
          cursor:'pointer', pointerEvents: 'all', animation:'float 1.8s infinite linear alternate'
        }}
        onClick={()=>setShowFounders(true)}
        title="Meet the Founders"
      >
        <FaLaptopCode size={36} color="#FFD600" />
      </div>
      {/* Founders Modal */}
      {showFounders &&
        <div style={{
          position: 'fixed', bottom: 92, right: 28, minWidth: 265,
          background: '#fff', boxShadow: '0 8px 24px #3332',
          borderRadius: 12, border: '1.5px solid #FFD600', zIndex:30,
          padding:'16px 20px', fontFamily:'sans-serif', color:'#222'
        }}>
          <div style={{fontWeight:'bold', marginBottom:8, color:'#D32F2F'}}>Meet Devlopers </div>
          {/* Nikhil Sunda */}
          <div style={{marginBottom:6, display: 'flex', alignItems:'center'}}>
            <FaUserGraduate size={18} style={{marginRight: 6}} color="#1E88E5"/> Nikhil Sunda
          </div>
          <div style={{fontSize:13, color:'#333', marginLeft: 25}}>UID: 25MCI10163</div>
          <a
            href="https://www.linkedin.com/in/nikhilsunda"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color:'#0A66C2', display:'flex', alignItems:'center', marginLeft:25,
              textDecoration:'none', fontSize:13, marginTop:3
            }}>
            <FaExternalLinkAlt style={{marginRight:5}}/> LinkedIn{' '}
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn" style={{
                    marginLeft:5, width:16, height:16,
                    animation: 'shake 1.3s infinite'
                  }}/>
          </a>
          {/* Krishna Pareek */}
          <div style={{marginTop:13, marginBottom:6, display:'flex', alignItems:'center'}}>
            <FaUserGraduate size={18} style={{marginRight: 6}} color="#1E88E5"/> Krishna Pareek
          </div>
          <div style={{fontSize:13, color:'#333', marginLeft: 25}}>UID: 25MCI10162</div>
          <a
            href="https://www.linkedin.com/in/krishna-pareek-097908338"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color:'#0A66C2', display:'flex', alignItems:'center', marginLeft:25,
              textDecoration:'none', fontSize:13, marginTop:3
            }}>
            <FaExternalLinkAlt style={{marginRight:5}}/> LinkedIn{' '}
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn" style={{
                    marginLeft:5, width:16, height:16,
                    animation: 'shake 1.3s infinite'
                  }}/>
          </a>
          {/* Close button */}
          <div style={{marginTop:13, textAlign:'right'}}>
            <button onClick={()=>setShowFounders(false)}
              style={{background:'#FFD600', color:'#B71C1C', fontWeight:'bold', border:'none', borderRadius:8, padding:'7px 18px', cursor:'pointer'}}>Close</button>
          </div>
        </div>
      }
      {/* Animations */}
      <style>{`
        @keyframes float {
          0%{transform:translateY(0);}
          100%{transform:translateY(-15px);}
        }
        @keyframes shake {
          0%,100%{ transform:rotate(-9deg);}
          50%{ transform:rotate(9deg);}
        }
      `}</style>
    </div>
  );
}

export default App;
