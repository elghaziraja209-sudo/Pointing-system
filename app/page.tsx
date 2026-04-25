"use client";
import { useEffect, useState, useMemo, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ACTIVATION_KEY = "VISION-2026-PREMIUM";

interface Employee { id: string; name: string; phone: string; hourlyRate: number; joinDate: string; }
interface Attendance { id: string; name: string; phone: string; checkIn: string; checkOut?: string; duration?: number; earnings?: number; }

export default function VisionTrackERP() {
  const [isActivated, setIsActivated] = useState(false);
  const [activationInput, setActivationInput] = useState("");
  const [lang, setLang] = useState<'ar' | 'fr'>('ar');
  const [view, setView] = useState<'dash' | 'emp' | 'logs'>('dash');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [form, setForm] = useState({ id: '', name: '', phone: '', hourlyRate: 0 });
  const [isEditing, setIsEditing] = useState(false);
  
  const qrInstanceRef = useRef<any>(null);
  const lastScannedCode = useRef<string>("");
  const lastScannedTime = useRef<number>(0);

  const translations = {
    ar: {
      brand: "VisionTrack", dash: "لوحة القيادة", emps: "الموظفين", logs: "السجل اليومي",
      totalPay: "إجمالي الأجور", activeNow: "حاضرون الآن", addNew: "إضافة موظف", 
      fullName: "الاسم الكامل", phone: "الهاتف", rate: "أجرة الساعة",
      save: "حفظ", update: "تعديل", scanner: "كاميرا المسح الذكي",
      statsTitle: "مخطط الأرباح والرواتب", earned: "المستحقات (DH)", absences: "أيام الغياب",
      nameCol: "الموظف", inCol: "دخول", outCol: "خروج", durCol: "ساعات", totalCol: "الأجر",
      currency: "درهم", activateBtn: "تفعيل النظام", keyPlaceholder: "أدخل كود التنشيط"
    },
    fr: {
      brand: "VisionTrack", dash: "Tableau de Bord", emps: "Employés", logs: "Historique",
      totalPay: "Total Salaires", activeNow: "Présents", addNew: "Ajouter",
      fullName: "Nom Complet", phone: "Tél", rate: "Taux/Hr",
      save: "Enregistrer", update: "Modifier", scanner: "Scanner QR",
      statsTitle: "Analyse des Gains", earned: "Gagné (DH)", absences: "Absences",
      nameCol: "Employé", inCol: "Entrée", outCol: "Sortie", durCol: "Hrs", totalCol: "Total",
      currency: "DH", activateBtn: "Activer", keyPlaceholder: "Clé de licence"
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const active = localStorage.getItem('vt_activated') === 'true';
    if (active) setIsActivated(true);
    setEmployees(JSON.parse(localStorage.getItem('vt_employees') || '[]'));
    setAttendance(JSON.parse(localStorage.getItem('vt_attendance') || '[]'));
  }, []);

  useEffect(() => {
    if (isActivated) {
      localStorage.setItem('vt_employees', JSON.stringify(employees));
      localStorage.setItem('vt_attendance', JSON.stringify(attendance));
    }
  }, [employees, attendance, isActivated]);

  // دالة النجاح المعدلة لتقبل أي نص وتشبهه بالموظفين
  const handleScanSuccess = (decodedText: string) => {
    const now = Date.now();
    const cleanText = decodedText.trim().toLowerCase(); // تنظيف النص المسحوب
    
    if (cleanText === lastScannedCode.current && (now - lastScannedTime.current) < 5000) return;
    
    // البحث عن الموظف بطريقة مرنة
    const emp = employees.find(e => e.name.trim().toLowerCase() === cleanText);
    
    if (!emp) {
      console.log("الموظف غير موجود في القائمة:", cleanText);
      return;
    }

    lastScannedCode.current = cleanText;
    lastScannedTime.current = now;
    const currentTime = new Date();
    
    setAttendance(prev => {
      const activeIdx = prev.findIndex(a => a.name.trim().toLowerCase() === cleanText && !a.checkOut);
      if (activeIdx !== -1) {
        const entry = prev[activeIdx];
        const hrs = Number(((currentTime.getTime() - new Date(entry.checkIn).getTime()) / 3600000).toFixed(2));
        const updated = [...prev];
        updated[activeIdx] = { 
            ...entry, 
            checkOut: currentTime.toISOString(), 
            duration: hrs, 
            earnings: Number((hrs * emp.hourlyRate).toFixed(2)) 
        };
        return updated;
      } else {
        return [{ id: Math.random().toString(36), name: emp.name, phone: emp.phone, checkIn: currentTime.toISOString() }, ...prev];
      }
    });

    new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(()=>{});
    if (navigator.vibrate) navigator.vibrate(200);
  };

  useEffect(() => {
    if (!isActivated || view !== 'dash') return;

    let html5QrCode: any;

    const startCamera = async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        html5QrCode = new Html5Qrcode("vt-scanner");
        qrInstanceRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          { 
            fps: 20, // سرعة عالية للقط
            qrbox: (viewWidth: number, viewHeight: number) => {
                return { width: viewWidth * 0.8, height: viewHeight * 0.8 }; // مربع مسح كبير
            },
            aspectRatio: 1.0
          },
          handleScanSuccess,
          () => {} // تفادي زحمة الأخطاء اللحظية
        );
      } catch (err) {
        console.error("Camera Error:", err);
      }
    };

    const timer = setTimeout(startCamera, 1000);
    return () => {
      clearTimeout(timer);
      if (qrInstanceRef.current) {
        qrInstanceRef.current.stop().catch(() => {});
      }
    };
  }, [isActivated, view, employees.length]);

  const stats = useMemo(() => {
    return employees.map(e => ({
      name: e.name,
      earned: attendance.filter(a => a.name === e.name).reduce((s, c) => s + (c.earnings || 0), 0)
    }));
  }, [attendance, employees]);

  if (!isActivated) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#020617' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '30px', textAlign: 'center', width: '350px' }}>
          <h2>VisionTrack</h2>
          <input type="password" placeholder="Key" value={activationInput} onChange={e => setActivationInput(e.target.value)} style={inputStyle} />
          <button onClick={() => { if(activationInput === ACTIVATION_KEY) { setIsActivated(true); localStorage.setItem('vt_activated', 'true'); } }} style={btnMain}>{t.activateBtn}</button>
        </div>
      </div>
    );
  }

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ display: 'flex', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <aside style={{ width: '260px', background: '#0f172a', color: '#fff', padding: '25px', position: 'fixed', height: '100vh' }}>
        <h2 style={{color: '#3b82f6', marginBottom: '40px'}}>VisionTrack</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setView('dash')} style={view === 'dash' ? sidebarActive : sidebarBtn}>{t.dash}</button>
          <button onClick={() => setView('emp')} style={view === 'emp' ? sidebarActive : sidebarBtn}>{t.emps}</button>
          <button onClick={() => setView('logs')} style={view === 'logs' ? sidebarActive : sidebarBtn}>{t.logs}</button>
          <button onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')} style={{ ...sidebarBtn, marginTop: '30px' }}>🌐 {lang === 'ar' ? 'Français' : 'العربية'}</button>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '40px', [lang === 'ar' ? 'marginRight' : 'marginLeft']: '260px' }}>
        {view === 'dash' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }}>
            <div style={card}>
              <h3 style={{marginBottom: '15px'}}>{t.scanner}</h3>
              <div id="vt-scanner" style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', background: '#000', border: '4px solid #3b82f6' }}></div>
              <p style={{textAlign:'center', marginTop: '10px', fontSize: '12px', color: '#64748b'}}>قرب الكود حتى يظهر واضحاً</p>
            </div>
            <div style={card}>
              <h3 style={{marginBottom: '15px'}}>{t.statsTitle}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="earned" fill="#3b82f6" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {view === 'emp' && (
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px' }}>
            <div style={card}>
              <h3>{t.addNew}</h3>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={t.fullName} style={inputStyle} />
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder={t.phone} style={inputStyle} />
              <input type="number" value={form.hourlyRate} onChange={e => setForm({ ...form, hourlyRate: Number(e.target.value) })} placeholder={t.rate} style={inputStyle} />
              <button onClick={() => {
                if (!form.name) return;
                setEmployees([...employees, { ...form, id: Math.random().toString(36), joinDate: new Date().toISOString() }]);
                setForm({ id: '', name: '', phone: '', hourlyRate: 0 });
              }} style={btnMain}>{t.save}</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
              {employees.map(emp => (
                <div key={emp.id} style={empCard}>
                  <div style={{background:'#fff', padding:'5px', borderRadius:'10px'}}>
                    <QRCodeSVG value={emp.name} size={110} />
                  </div>
                  <div style={{fontWeight: 'bold', marginTop: '10px'}}>{emp.name}</div>
                  <div style={{fontSize:'12px'}}>{emp.hourlyRate} {t.currency}/h</div>
                  <button onClick={() => setEmployees(employees.filter(e => e.id !== emp.id))} style={{color:'red', border:'none', background:'none', cursor:'pointer', marginTop:'10px'}}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'logs' && (
          <div style={card}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{borderBottom: '2px solid #f1f5f9'}}>
                  <th style={tdStyle}>{t.nameCol}</th>
                  <th style={tdStyle}>{t.inCol}</th>
                  <th style={tdStyle}>{t.outCol}</th>
                  <th style={tdStyle}>{t.totalCol}</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((log, i) => (
                  <tr key={i} style={{borderBottom: '1px solid #f1f5f9'}}>
                    <td style={tdStyle}>{log.name}</td>
                    <td style={tdStyle}><span style={badgeIn}>{new Date(log.checkIn).toLocaleTimeString()}</span></td>
                    <td style={tdStyle}>{log.checkOut ? <span style={badgeOut}>{new Date(log.checkOut).toLocaleTimeString()}</span> : '---'}</td>
                    <td style={{ ...tdStyle, fontWeight: 'bold', color: '#10b981' }}>{log.earnings || 0} DH</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

// الستايلات
const card = { background: '#fff', padding: '25px', borderRadius: '25px', border: '1px solid #e2e8f0' };
const inputStyle = { padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%', marginBottom: '15px' };
const btnMain = { background: '#3b82f6', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', cursor: 'pointer', width: '100%', fontWeight: 'bold' };
const sidebarBtn = { background: 'none', border: 'none', color: '#94a3b8', padding: '15px', borderRadius: '12px', textAlign: 'start' as const, cursor: 'pointer', width: '100%' };
const sidebarActive = { ...sidebarBtn, background: '#3b82f6', color: '#fff' };
const empCard = { background: '#fff', padding: '15px', borderRadius: '20px', textAlign: 'center' as const, border: '1px solid #e2e8f0' };
const iconBtn = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' };
const tdStyle = { padding: '15px', textAlign: 'start' as const };
const badgeIn = { background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' };
const badgeOut = { background: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' };