<!DOCTYPE html>
<html lang="ar" dir="rtl" id="mainHtml">
<head>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta charset="UTF-8">
    <title>Agora Team - Dashboard Pro 2026</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --gold: #d4af37;
            --gold-dark: #b8860b;
            --black: #121212;
            --bg: #f8fafc;
            --white: #ffffff;
            --red: #ef4444;
            --green: #22c55e;
            --blue: #3b82f6;
            --wa-green: #25d366;
            --purple: #8b5cf6;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }
        body { background-color: var(--bg); display: flex; height: 100vh; overflow: hidden; color: #334155; }

        .sidebar { width: 260px; background: var(--black); color: white; padding: 25px; display: flex; flex-direction: column; box-shadow: 4px 0 10px rgba(0,0,0,0.1); }
        .logo-section { text-align: center; margin-bottom: 40px; }
        .logo-circle { width: 60px; height: 60px; background: linear-gradient(135deg, var(--gold), #fff); color: black; margin: 0 auto 10px; border-radius: 18px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 22px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3); }
        .center-title { color: var(--gold); font-size: 18px; font-weight: 800; letter-spacing: 1px; }

        .nav-link { background: none; border: none; color: #94a3b8; width: 100%; text-align: right; padding: 14px 18px; margin: 4px 0; cursor: pointer; border-radius: 12px; font-weight: 600; transition: 0.3s; display: flex; align-items: center; gap: 12px; }
        html[dir="ltr"] .nav-link { text-align: left; } 
        
        .nav-link i { font-size: 18px; width: 25px; text-align: center; color: var(--gold); }
        .nav-link:hover { background: #1e1e1e; color: white; }
        .nav-link.active { background: var(--gold); color: black; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2); }
        .nav-link.active i { color: black; }

        .lang-switch { margin-top: auto; padding: 10px; border: 1px dashed var(--gold); border-radius: 10px; text-align: center; cursor: pointer; color: var(--gold); font-weight: bold; }

        main { flex: 1; padding: 35px; overflow-y: auto; scroll-behavior: smooth; }
        .welcome-msg { margin-bottom: 30px; }
        .welcome-msg h2 { font-size: 26px; color: var(--black); }

        .stats-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: var(--white); padding: 25px; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; transition: transform 0.3s; position: relative; overflow: hidden; }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-card i.bg-icon { position: absolute; left: -10px; bottom: -10px; font-size: 80px; color: rgba(212, 175, 55, 0.1); transform: rotate(-15deg); }
        .stat-val { font-size: 32px; font-weight: 800; color: var(--black); margin-bottom: 5px; }
        .stat-label { font-size: 14px; color: #64748b; font-weight: 700; }

        .section-card { background: var(--white); border-radius: 24px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.02); margin-bottom: 30px; }
        .section-card h3 { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: inherit; padding: 15px; color: #94a3b8; font-size: 13px; font-weight: 700; border-bottom: 2px solid #f1f5f9; }
        td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }

        .user-pic { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold); vertical-align: middle; margin-left: 10px; }
        html[dir="ltr"] .user-pic { margin-left: 0; margin-right: 10px; }

        .filter-bar { display: flex; gap: 8px; margin-bottom: 15px; flex-wrap: wrap; }
        .filter-btn { padding: 8px 18px; border-radius: 20px; border: 1px solid #e2e8f0; background: white; cursor: pointer; font-size: 12px; font-weight: 600; transition: 0.3s; }
        .filter-btn.active { background: var(--black); color: var(--gold); border-color: var(--black); }

        .badge { padding: 6px 12px; border-radius: 10px; font-size: 11px; font-weight: 700; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 5px; }
        .badge-pay { background: #ecfdf5; color: #059669; }
        .badge-abs { background: #fef2f2; color: #dc2626; }
        .badge-sched { background: #fffbeb; color: #b45309; font-size: 12px; border: 1px solid #fde68a; }
        .badge-reg { background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; }
        
        .btn-add { background: var(--black); color: white; padding: 12px 24px; border-radius: 15px; border: none; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
        .btn-add:hover { background: var(--gold); color: black; }
        
        .wa-notify { cursor: pointer; margin-right: 8px; font-size: 16px; transition: 0.2s; text-decoration: none; vertical-align: middle; display: inline-block; }
        .wa-notify:hover { transform: scale(1.2); }
        .wa-pay { color: var(--wa-green); }
        .wa-abs { color: var(--red); }

        .action-btns { display: flex; gap: 12px; }
        .btn-edit { background: none; border: none; cursor: pointer; color: var(--blue); font-size: 18px; transition: 0.2s; }
        .btn-del { background: none; border: none; cursor: pointer; color: var(--red); font-size: 18px; transition: 0.2s; }
        .btn-arch { background: none; border: none; cursor: pointer; color: #f59e0b; font-size: 18px; transition: 0.2s; }
        .btn-restore { background: none; border: none; cursor: pointer; color: var(--green); font-size: 18px; transition: 0.2s; }

        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: none; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(6px); }
        .modal { background: white; width: 95%; max-width: 500px; padding: 35px; border-radius: 30px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
        .modal label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 8px; color: #64748b; margin-top: 10px; }
        .modal input, .modal select { width: 100%; padding: 14px; border: 2px solid #f1f5f9; border-radius: 14px; outline: none; transition: 0.3s; font-size: 15px; }

        .tab-content { display: none; }
        .active-tab { display: block; animation: slideUp 0.4s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .upload-area { text-align: center; padding: 15px; border: 2px dashed var(--gold); border-radius: 15px; cursor: pointer; margin-bottom: 10px; }
        .preview-img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; display: none; margin: 10px auto; border: 3px solid var(--gold); }
		
    </style>
	
</head>
<body>

    <aside class="sidebar">
        <div class="logo-section">
            <div class="logo-circle">AG</div>
            <h1 class="center-title">AGORA TEAM</h1>
        </div>
        <nav>
            <button onclick="showTab('dashboard')" id="btn-dashboard" class="nav-link active"><i class="fa-solid fa-chart-line"></i> <span data-key="nav_dash">لوحة التحكم</span></button>
            <button onclick="showTab('teachers')" id="btn-teachers" class="nav-link"><i class="fa-solid fa-user-tie"></i> <span data-key="nav_teachers">الأساتذة</span></button>
            <button onclick="showTab('trainees')" id="btn-trainees" class="nav-link"><i class="fa-solid fa-graduation-cap"></i> <span data-key="nav_trainees">المتدربات\المتدربين</span></button>
            <button onclick="showTab('students')" id="btn-students" class="nav-link"><i class="fa-solid fa-book-open-reader"></i> <span data-key="nav_students">التلاميذ</span></button>
            <button onclick="showTab('firstaid')" id="btn-firstaid" class="nav-link"><i class="fa-solid fa-kit-medical"></i> <span data-key="nav_firstaid">الإسعافات</span></button>
            <button onclick="showTab('archived')" id="btn-archived" class="nav-link"><i class="fa-solid fa-user-slash"></i> <span data-key="nav_archived">المغادرون</span></button>
            <button onclick="showTab('inquiries')" id="btn-inquiries" class="nav-link"><i class="fa-solid fa-comments"></i> <span data-key="nav_inquiries">المتسائلين</span></button>
            <button onclick="showTab('expenses')" id="btn-expenses" class="nav-link" style="margin-top:20px; border-top:1px solid #333;"><i class="fa-solid fa-wallet"></i> <span data-key="nav_expenses">المصاريف</span></button>
        </nav>
        <div class="lang-switch" onclick="toggleLanguage()">
            <i class="fa-solid fa-language"></i> <span id="langText">Français</span>
        </div>
    </aside>

    <main>
        <div id="dashboard" class="tab-content active-tab">
            <div class="welcome-msg">
                <h2 data-key="welcome_title">مرحبا بكم في مركز أكورا تيم</h2>
                <p><span data-key="welcome_sub">تتبع حالة المركز لشهر</span> <span id="currentMonthLabel" style="color: var(--gold-dark); font-weight: bold;"></span></p>
            </div>
            
            <div class="stats-container">
                <div class="stat-card"><i class="fa-solid fa-user-tie bg-icon"></i><div class="stat-val" id="count-teachers">0</div><div class="stat-label" data-key="stat_teachers">إجمالي الأساتذة</div></div>
                <div class="stat-card"><i class="fa-solid fa-graduation-cap bg-icon"></i><div class="stat-val" id="count-trainees">0</div><div class="stat-label" data-key="stat_trainees">المتدربات\\المتدربين</div></div>
                <div class="stat-card"><i class="fa-solid fa-book-open-reader bg-icon"></i><div class="stat-val" id="count-students">0</div><div class="stat-label" data-key="stat_students">إجمالي التلاميذ</div></div>
                <div class="stat-card"><i class="fa-solid fa-kit-medical bg-icon"></i><div class="stat-val" id="count-firstaid">0</div><div class="stat-label" data-key="stat_firstaid">الإسعافات</div></div>
            </div>

            <div class="stats-container" style="grid-template-columns: 1fr 1fr;">
                <div class="stat-card" style="background: linear-gradient(135deg, #121212, #333); color: white; border: none;">
                    <p style="color: #94a3b8;"><i class="fa-solid fa-sack-dollar" style="color:var(--gold);"></i> <span data-key="stat_profit">صافي الأرباح المتوقعة</span></p>
                    <div class="stat-val" id="netProfit">0 DH</div>
                </div>
                <div class="stat-card">
                    <p class="stat-label"><i class="fa-solid fa-check-double" style="color: var(--green);"></i> <span data-key="stat_ratio">نسبة التحصيل</span></p>
                    <div class="stat-val" id="paidRatio">0 / 0</div>
                </div>
            </div>

            <div class="section-card" id="unpaid-section" style="border-right: 5px solid var(--red);">
                <h3 style="color: var(--red);"><i class="fa-solid fa-circle-exclamation"></i> <span data-key="unpaid_list_title">لائحة غير المسددين (الشهر الحالي)</span></h3>
                <table>
                    <thead>
                        <tr>
                            <th data-key="th_name">الإسم</th>
                            <th data-key="th_phone">الهاتف</th>
                            <th data-key="th_price">المبلغ</th>
                            <th>WhatsApp</th>
                        </tr>
                    </thead>
                    <tbody id="unpaid-table"></tbody>
                </table>
            </div>

            <div class="section-card">
                <h3><i class="fa-solid fa-calendar-days" style="color: var(--gold);"></i> <span data-key="table_sched_title">جدول الحصص وتوزيع التلاميذ</span></h3>
                <table>
                    <thead><tr><th data-key="th_teacher">الأستاذ</th><th data-key="th_spec">التخصص والمستوى</th><th data-key="th_time">التوقيت</th><th data-key="th_count">عدد التلاميذ\المتدربين</th></tr></thead>
                    <tbody id="schedule-summary-table"></tbody>
                </table>
            </div>
        </div>

        <div id="teachers" class="tab-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 data-key="list_teachers">لائحة الأساتذة</h2>
                <button class="btn-add" onclick="openAddModal('teachers')"><i class="fa-solid fa-plus"></i> <span data-key="add_teacher">إضافة أستاذ</span></button>
            </div>
            <div class="filter-bar">
                <button class="filter-btn active" onclick="filterData('teachers', 'الكل', this)" data-key="f_all">الكل</button>
                <button class="filter-btn" onclick="filterData('teachers', 'تكوين مهني', this)" data-key="f_voc">تكوين مهني</button>
                <button class="filter-btn" onclick="filterData('teachers', 'ابتدائي', this)" data-key="f_pri">ابتدائي</button>
                <button class="filter-btn" onclick="filterData('teachers', 'إعدادي', this)" data-key="f_mid">إعدادي</button>
                <button class="filter-btn" onclick="filterData('teachers', 'ثانوي', this)" data-key="f_high">ثانوي</button>
            </div>
            <div class="section-card"><table><thead><tr><th data-key="th_teacher">الأستاذ</th><th data-key="th_cat">الفئة</th><th data-key="th_spec">التخصص</th><th data-key="th_phone">الهاتف</th><th data-key="th_pay">أداء الشهر</th><th data-key="th_actions">إجراءات</th></tr></thead><tbody id="teachers-table"></tbody></table></div>
        </div>

        <div id="trainees" class="tab-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 data-key="list_trainees">سجل المتدرب(ة)</h2>
                <button class="btn-add" onclick="openAddModal('trainees')"><i class="fa-solid fa-plus"></i> <span data-key="add_trainee">تسجيل متدرب(ة)</span></button>
            </div>
            <div class="filter-bar" id="trainee-filters"></div>
            <div class="section-card"><table><thead><tr><th data-key="th_name">الإسم</th><th data-key="th_spec">التخصص</th><th data-key="th_phone">الهاتف</th><th data-key="th_reg_fee">واجب التسجيل</th><th data-key="th_pay">الأداء</th><th data-key="th_abs">الغياب</th><th data-key="th_actions">إجراءات</th></tr></thead><tbody id="trainees-table"></tbody></table></div>
        </div>

        <div id="students" class="tab-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 data-key="list_students">لائحة التلاميذ</h2>
                <button class="btn-add" onclick="openAddModal('students')"><i class="fa-solid fa-plus"></i> <span data-key="add_student">تلميذ جديد</span></button>
            </div>
            <div class="filter-bar">
                <button class="filter-btn active" onclick="filterData('students', 'الكل', this)" data-key="f_all">الكل</button>
                <button class="filter-btn" onclick="filterData('students', 'ابتدائي', this)" data-key="f_pri">ابتدائي</button>
                <button class="filter-btn" onclick="filterData('students', 'إعدادي', this)" data-key="f_mid">إعدادي</button>
                <button class="filter-btn" onclick="filterData('students', 'ثانوي', this)" data-key="f_high">ثانوي</button>
            </div>
            <div class="section-card"><table><thead><tr><th data-key="th_name">الإسم</th><th data-key="th_level">المستوى</th><th data-key="th_spec">التخصص</th><th data-key="th_phone">الهاتف</th><th data-key="th_reg_fee">واجب التسجيل</th><th data-key="th_pay">الأداء</th><th data-key="th_abs">الغياب</th><th data-key="th_actions">إجراءات</th></tr></thead><tbody id="students-table"></tbody></table></div>
        </div>

        <div id="firstaid" class="tab-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 data-key="list_firstaid">مشاركي الإسعافات</h2>
                <button class="btn-add" onclick="openAddModal('firstaid')"><i class="fa-solid fa-plus"></i> <span data-key="add_participant">إضافة مشارك</span></button>
            </div>
            <div class="section-card"><table><thead><tr><th data-key="th_name">الإسم</th><th data-key="th_phone">الهاتف</th><th data-key="th_amount">المبلغ</th><th data-key="th_status">الحالة</th><th data-key="th_actions">إجراءات</th></tr></thead><tbody id="firstaid-table"></tbody></table></div>
        </div>

        <div id="archived" class="tab-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 data-key="list_archived">سجل المغادرين</h2>
            </div>
            <div class="section-card"><table><thead><tr><th data-key="th_name">الإسم</th><th data-key="th_orig_cat">الفئة الأصلية</th><th data-key="th_spec">التخصص</th><th data-key="th_phone">الهاتف</th><th data-key="th_actions">إجراءات</th></tr></thead><tbody id="archived-table"></tbody></table></div>
        </div>

        <div id="inquiries" class="tab-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 data-key="list_inquiries">سجل المتسائلين</h2>
                <button class="btn-add" onclick="openAddModal('inquiries')"><i class="fa-solid fa-plus"></i> <span data-key="add_inquiry">إضافة متسائل</span></button>
            </div>
            <div class="section-card"><table><thead><tr><th data-key="th_name">الإسم</th><th data-key="th_phone">الهاتف</th><th data-key="th_spec">التخصص</th><th>WhatsApp</th><th data-key="th_actions">إجراءات</th></tr></thead><tbody id="inquiries-table"></tbody></table></div>
        </div>

        <div id="expenses" class="tab-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 data-key="list_expenses">سجل المصاريف</h2>
                <button class="btn-add" onclick="openAddModal('expenses')"><i class="fa-solid fa-plus"></i> <span data-key="add_expense">إضافة مصروف</span></button>
            </div>
            <div class="section-card"><table><thead><tr><th data-key="th_desc">الوصف</th><th data-key="th_amount">المبلغ</th><th data-key="th_date">التاريخ</th><th data-key="th_actions">إجراءات</th></tr></thead><tbody id="expenses-table"></tbody></table></div>
        </div>
    </main>

    <div id="modalOverlay" class="overlay">
        <div id="mainForm" class="modal">
            <h3 id="formTitle" data-key="form_title">بيانات جديدة</h3>
            <div id="formInputs">
                <div id="photoGroup">
                    <label><i class="fa-solid fa-camera"></i> <span data-key="label_photo">صورة الشخص</span></label>
                    <div class="upload-area" onclick="document.getElementById('fileInput').click()">
                        <i class="fa-solid fa-cloud-upload-alt"></i> <span data-key="btn_upload">اضغط لرفع صورة</span>
                        <input type="file" id="fileInput" hidden accept="image/*" onchange="previewImage(this)">
                        <img id="imgPreview" class="preview-img">
                    </div>
                </div>

                <label><i class="fa-solid fa-user"></i> <span data-key="label_name">الإسم الكامل / الوصف</span></label>
                <input type="text" id="name">
                <div id="phoneGroup">
                    <label><i class="fa-solid fa-phone"></i> <span data-key="label_phone">رقم الهاتف</span></label>
                    <input type="text" id="phone">
                </div>
                <div id="levelContainer">
                    <label><i class="fa-solid fa-layer-group"></i> <span data-key="label_level">المستوى الدراسي</span></label>
                    <select id="level"></select>
                </div>
                <div id="specGroup">
                    <label><i class="fa-solid fa-star"></i> <span data-key="label_spec">التخصص / المادة</span></label>
                    <div id="specInputContainer"></div>
                </div>
                <div id="timeGroup">
                    <label><i class="fa-solid fa-clock"></i> <span data-key="label_time">التوقيت</span></label>
                    <input type="text" id="schedule">
                </div>
                <div id="registrationFeeContainer">
                    <label><i class="fa-solid fa-id-card"></i> <span data-key="label_reg_fee">واجب التسجيل (DH)</span></label>
                    <input type="number" id="regFee" placeholder="0">
                </div>
                <div id="priceGroup">
                    <label><i class="fa-solid fa-money-bill-wave"></i> <span data-key="label_price">المبلغ الشهري (DH)</span></label>
                    <input type="number" id="price">
                </div>
                <label><i class="fa-solid fa-calendar"></i> <span data-key="label_date">التاريخ</span></label>
                <input type="date" id="regDate">
            </div>
            <button class="btn-add" style="width: 100%; margin-top:15px;" onclick="handleSave()"><i class="fa-solid fa-floppy-disk"></i> <span data-key="btn_save">حفظ</span></button>
            <button onclick="closeModal()" style="width: 100%; background: none; border: none; margin-top: 15px; cursor: pointer; color:gray;" data-key="btn_cancel">إلغاء</button>
        </div>

        <div id="payModal" class="modal" style="display:none;">
            <h3><i class="fa-solid fa-file-invoice-dollar" style="color:var(--green);"></i> <span data-key="title_pay">سجل الأداء</span></h3>
            <div id="teacherPriceInput" style="display:none; margin-bottom:20px;">
                <label data-key="label_salary">أجرة الأستاذ (DH)</label>
                <input type="number" id="customPrice">
            </div>
            <div id="monthsGrid" style="display:grid; grid-template-columns: 1fr; gap: 12px;"></div>
            <button class="btn-add" style="width: 100%; margin-top: 25px;" onclick="closeModal()" data-key="btn_close">إغلاق</button>
        </div>

        <div id="absModal" class="modal" style="display:none;">
            <h3><i class="fa-solid fa-user-clock" style="color:var(--red);"></i> <span data-key="title_abs">إدارة الغياب</span></h3>
            <div style="display:flex; flex-direction: column; gap:10px; margin-bottom:20px;">
                <div style="display:flex; gap:10px;">
                    <input type="date" id="newAbsDate" style="flex:2;">
                    <input type="time" id="newAbsTime" style="flex:1;">
                    <button class="btn-add" onclick="processAddAbs()"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div id="absListContainer"></div>
            <button class="btn-add" style="width: 100%; margin-top: 25px;" onclick="closeModal()" data-key="btn_close">إغلاق</button>
        </div>
    </div>

    <script>
        const vocationalSpecs = [
            { ar: "الحلاقة والتجميل", fr: "Coiffure & Esthétique" },
            { ar: "المحاسبة", fr: "Comptabilité" },
            { ar: "مساعد صيدلي", fr: "Aide Pharmacie" },
            { ar: "التجارة الإلكترونية", fr: "E-commerce" },
            { ar: "المعلوماتية", fr: "L'informatique" },
            { ar: "إصلاح الهواتف", fr: "Réparation téléphone" },
            { ar: "كاميرات المراقبة", fr: "Caméra surveillance" },
            { ar: "سكرتارية", fr: "Secrétaire" },
            { ar: "الحجامة والطب البديل", fr: "Hijama & Médecine Alternative" },
            { ar: "التعليم الأولي", fr: "Enseignement Préscolaire" },
            { ar: "الخياطة والفصالة", fr: "Couture & Coupe" },
            { ar: "الطبخ والحلويات", fr: "Cuisine & Pâtisserie" }
        ];

        const schoolSubjects = [
            { ar: "الحساب الذهني", fr: "Calcul Mental" },
            { ar: "اللغة العربية", fr: "Arabe" },
            { ar: "اللغة الفرنسية", fr: "Français" },
            { ar: "الرياضيات", fr: "Mathématiques" },
            { ar: "اللغة الإنجليزية", fr: "Anglais" },
            { ar: "الفيزياء", fr: "Physique" },
            { ar: "علوم الحياة والأرض", fr: "SVT" }
        ];

        const translations = {
            ar: {
                nav_dash: "لوحة التحكم", nav_teachers: "الأساتذة", nav_trainees: "المتدربين و المتدريبات", nav_students: "التلاميذ",
                nav_firstaid: "الإسعافات", nav_archived: "المغادرون", nav_inquiries: "المتسائلين", nav_expenses: "المصاريف",
                welcome_title: "مرحبا بكم في مركز أكورا تيم", welcome_sub: "تتبع حالة المركز لشهر",
                stat_teachers: "إجمالي الأساتذة", stat_trainees: "المتدربات\\المتدربين", stat_students: "إجمالي التلاميذ", stat_firstaid: "الإسعافات",
                stat_profit: "صافي الأرباح المتوقعة", stat_ratio: "نسبة التحصيل",
                table_sched_title: "جدول الحصص وتوزيع التلاميذ", th_teacher: "الأستاذ", th_spec: "التخصص والمستوى", th_time: "التوقيت", th_count: "العدد",
                list_teachers: "لائحة الأساتذة", add_teacher: "إضافة أستاذ", f_all: "الكل", f_voc: "تكوين مهني", f_pri: "ابتدائي", f_mid: "إعدادي", f_high: "ثانوي",
                th_cat: "الفئة", th_phone: "الهاتف", th_pay: "الأداء", th_actions: "إجراءات", list_trainees: "سجل المتدربين و المتدريبات", add_trainee: "تسجيل متدرب(ة)",
                th_name: "الإسم", th_abs: "الغياب", list_students: "لائحة التلاميذ", add_student: "تلميذ جديد", th_level: "المستوى",
                list_firstaid: "مشاركي الإسعافات", add_participant: "إضافة مشارك", th_amount: "المبلغ", th_status: "الحالة",
                list_archived: "سجل المغادرين", th_orig_cat: "الفئة الأصلية", th_phone: "الهاتف", th_desc: "الوصف",
                list_inquiries: "سجل المتسائلين", add_inquiry: "إضافة متسائل", list_expenses: "سجل المصاريف", add_expense: "إضافة مصروف",
                th_date: "التاريخ", form_title: "بيانات جديدة", label_name: "الإسم الكامل", label_phone: "رقم الهاتف",
                label_level: "المستوى الدراسي", label_spec: "التخصص / المادة", label_time: "التوقيت", label_price: "المبلغ", label_date: "التاريخ",
                label_reg_fee: "واجب التسجيل", btn_save: "حفظ", btn_cancel: "إلغاء", title_pay: "سجل الأداء", title_abs: "إدارة الغياب", btn_close: "إغلاق",
                label_salary: "أجرة الأستاذ", pay_done: "تم", pay_wait: "انتظار", confirm_del: "حذف نهائي؟", confirm_arch: "نقل للأرشيف؟",
                lang_btn: "Français", months: ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليو", "غشت", "شتنبر", "أكتوبر", "نوفمبر", "دجنبر"],
                th_reg_fee: "واجب التسجيل", th_price: "المبلغ", unpaid_list_title: "لائحة غير المسددين (الشهر الحالي)",
                msg_pay: "مرحبا {name}، نذكركم بضرورة تسوية واجبات شهر {month} لمركز Agora Team. شكرا لكم.",
                msg_abs: "مرحبا، نخبركم أن {name} قد غاب(ت) عن حصة مادة ({spec}) بتاريخ ووقت: {time} بمركز Agora Team. نرجو التواصل معنا للتوضيح.",
                msg_firstaid: "مرحبا {name}، نذكركم بضرورة تسوية واجبات الإسعافات الأولية لمركز Agora Team. شكرا لكم.",
                label_photo: "صورة الشخص", btn_upload: "اضغط لرفع صورة"
            },
            fr: {
                nav_dash: "Tableau de bord", nav_teachers: "Enseignants", nav_trainees: "Stagiaires", nav_students: "Élèves",
                nav_firstaid: "Secourisme", nav_archived: "Archives", nav_inquiries: "Demandes", nav_expenses: "Dépenses",
                welcome_title: "Bienvenue au Centre Agora Team", welcome_sub: "État du centre pour le mois de",
                stat_teachers: "Total Enseignants", stat_trainees: "Total Stagiaires", stat_students: "Total Élèves", stat_firstaid: "Secourisme",
                stat_profit: "Bénéfice Net Prévu", stat_ratio: "Taux de Recouvrement",
                table_sched_title: "Emploi du temps", th_teacher: "Enseignant", th_spec: "Spécialité", th_time: "Horaire", th_count: "Nombre",
                list_teachers: "Liste Enseignants", add_teacher: "Ajouter", f_all: "Tout", f_voc: "Prof.", f_pri: "Prim.", f_mid: "Coll.", f_high: "Lycée",
                th_cat: "Catégorie", th_phone: "Téléphone", th_pay: "Paiement", th_actions: "Actions", list_trainees: "Stagiaires", add_trainee: "Ajouter",
                th_name: "Nom", th_abs: "Absence", list_students: "Élèves", add_student: "Ajouter", th_level: "Niveau",
                list_firstaid: "Secourisme", add_participant: "Ajouter", th_amount: "Montant", th_status: "État",
                list_archived: "Départs", th_orig_cat: "Origine", th_phone: "Tél", th_desc: "Description",
                list_inquiries: "Demandes", add_inquiry: "Ajouter", list_expenses: "Dépenses", add_expense: "Ajouter",
                th_date: "Date", form_title: "Nouveau", label_name: "Nom / Description", label_phone: "Téléphone",
                label_level: "Niveau", label_spec: "Spécialité", label_time: "Horaire", label_price: "Montant", label_date: "Date",
                label_reg_fee: "Inscription", btn_save: "Sauvegarder", btn_cancel: "Annuler", title_pay: "Paiement", title_abs: "Absence", btn_close: "Fermer",
                label_salary: "Salaire", pay_done: "Payé", pay_wait: "Attente", confirm_del: "Supprimer ?", confirm_arch: "Archiver ?",
                lang_btn: "العربية", months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                th_reg_fee: "Frais Inscription", th_price: "Prix", unpaid_list_title: "Liste des non-payés (Mois actuel)",
                msg_pay: "Bonjour {name}, nous vous rappelons de régler les frais du mois {month} pour le centre Agora Team. Merci.",
                msg_abs: "Bonjour, nous vous informons que {name} était absent(e) au cours de ({spec}) le : {time} au centre Agora Team. Merci de nous contacter.",
                msg_firstaid: "Bonjour {name}, nous vous rappelons de régler les frais de Secourisme pour le centre Agora Team. Merci.",
                label_photo: "Photo de profil", btn_upload: "Cliquer pour uploader"
            }
        };

        let currentLang = localStorage.getItem('agora_lang') || 'ar';
        let db = JSON.parse(localStorage.getItem('agora_beauty_db')) || { teachers: [], trainees: [], students: [], firstaid: [], inquiries: [], expenses: [], archived: [] };
        let activeTab = 'dashboard', currentIdx = -1;
        let filters = { teachers: 'الكل', students: 'الكل', trainees: 'الكل' };
        let currentPhotoBase64 = "";

        // دالة الترتيب الأبجدي
        function sortDB(tab) {
            db[tab].sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }

        function applyLanguage() {
            const t = translations[currentLang];
            document.getElementById('mainHtml').dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
            document.getElementById('mainHtml').lang = currentLang;
            document.getElementById('langText').innerText = t.lang_btn;
            document.querySelectorAll('[data-key]').forEach(el => {
                const key = el.getAttribute('data-key');
                if (t[key]) el.innerText = t[key];
            });
            const now = new Date();
            document.getElementById('currentMonthLabel').innerText = t.months[now.getMonth()];
            
            const traineeFilterBar = document.getElementById('trainee-filters');
            if(traineeFilterBar) {
                let filterHtml = `<button class="filter-btn ${filters.trainees === 'الكل' ? 'active' : ''}" onclick="filterData('trainees', 'الكل', this)">${t.f_all}</button>`;
                vocationalSpecs.forEach(spec => {
                    const specLabel = currentLang === 'ar' ? spec.ar : spec.fr;
                    filterHtml += `<button class="filter-btn ${filters.trainees === spec.ar ? 'active' : ''}" onclick="filterData('trainees', '${spec.ar}', this)">${specLabel}</button>`;
                });
                traineeFilterBar.innerHTML = filterHtml;
            }
            render();
        }

        function toggleLanguage() {
            currentLang = (currentLang === 'ar') ? 'fr' : 'ar';
            localStorage.setItem('agora_lang', currentLang);
            applyLanguage();
        }

        function showTab(tabId) {
            activeTab = tabId;
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active-tab'));
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.getElementById(tabId).classList.add('active-tab');
            document.getElementById('btn-' + tabId).classList.add('active');
            render();
        }

        function filterData(tab, val, btn) {
            filters[tab] = val;
            btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            render();
        }

        function previewImage(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentPhotoBase64 = e.target.result;
                    const preview = document.getElementById('imgPreview');
                    preview.src = currentPhotoBase64;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        function openAddModal(tab) { currentIdx = -1; activeTab = tab; resetForm(); prepareModalUI(tab, translations[currentLang].form_title); }

        function openEditModal(idx, tab) {
            currentIdx = idx; activeTab = tab;
            const item = db[tab][idx];
            prepareModalUI(tab, translations[currentLang].form_title);
            document.getElementById('name').value = item.name || '';
            document.getElementById('phone').value = item.phone || '';
            if(document.getElementById('level')) document.getElementById('level').value = item.level || '';
            document.getElementById('schedule').value = item.schedule || '';
            document.getElementById('regFee').value = item.regFee || 0;
            document.getElementById('price').value = item.price || 0;
            document.getElementById('regDate').value = item.regDate || '';
            
            if(item.photo) {
                currentPhotoBase64 = item.photo;
                const preview = document.getElementById('imgPreview');
                preview.src = item.photo;
                preview.style.display = 'block';
            } else {
                currentPhotoBase64 = "";
                document.getElementById('imgPreview').style.display = 'none';
            }
            
            setTimeout(() => { if(document.getElementById('spec')) document.getElementById('spec').value = item.spec || ''; }, 50);
        }

        function prepareModalUI(tab, title) {
            document.getElementById('modalOverlay').style.display = 'flex';
            document.getElementById('mainForm').style.display = 'block';
            document.getElementById('payModal').style.display = 'none';
            document.getElementById('absModal').style.display = 'none';
            document.getElementById('formTitle').innerText = title;

            // إظهار حقل الصورة فقط للمعلمين والمتدربين والتلاميذ والمتسائلين
            document.getElementById('photoGroup').style.display = (tab === 'expenses') ? 'none' : 'block';

            document.getElementById('phoneGroup').style.display = (tab === 'expenses') ? 'none' : 'block';
            document.getElementById('levelContainer').style.display = (tab === 'teachers' || tab === 'students') ? 'block' : 'none';
            document.getElementById('registrationFeeContainer').style.display = (tab === 'trainees' || tab === 'students') ? 'block' : 'none';
            document.getElementById('specGroup').style.display = (tab === 'firstaid' || tab === 'expenses') ? 'none' : 'block';
            document.getElementById('timeGroup').style.display = (tab === 'firstaid' || tab === 'expenses' || tab === 'inquiries') ? 'none' : 'block';
            document.getElementById('priceGroup').style.display = (tab === 'inquiries') ? 'none' : 'block';

            const t = translations[currentLang];
            const selectLevel = document.getElementById('level');
            if(tab === 'students') selectLevel.innerHTML = `<option value="ابتدائي">${t.f_pri}</option><option value="إعدادي">${t.f_mid}</option><option value="ثانوي">${t.f_high}</option>`;
            else if(tab === 'teachers') selectLevel.innerHTML = `<option value="تكوين مهني">${t.f_voc}</option><option value="ابتدائي">${t.f_pri}</option><option value="إعدادي">${t.f_mid}</option><option value="ثانوي">${t.f_high}</option>`;

            const specCont = document.getElementById('specInputContainer');
            const updateSpecs = () => {
                if(tab === 'students' || (tab === 'teachers' && selectLevel.value !== 'تكوين مهني')) {
                    let options = schoolSubjects.map(s => `<option value="${s.ar}">${currentLang === 'ar' ? s.ar : s.fr}</option>`).join('');
                    specCont.innerHTML = `<select id="spec">${options}</select>`;
                } 
                else if(tab === 'trainees' || (tab === 'teachers' && selectLevel.value === 'تكوين مهني') || tab === 'inquiries') {
                    let options = vocationalSpecs.map(s => `<option value="${s.ar}">${currentLang === 'ar' ? s.ar : s.fr}</option>`).join('');
                    specCont.innerHTML = `<select id="spec">${options}</select>`;
                } else {
                    specCont.innerHTML = `<input type="text" id="spec">`;
                }
            };
            if(tab === 'teachers') selectLevel.onchange = updateSpecs;
            updateSpecs();
        }

        function handleSave() {
            const data = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value || '',
                level: document.getElementById('level') ? document.getElementById('level').value : '',
                spec: document.getElementById('spec') ? document.getElementById('spec').value : '',
                schedule: document.getElementById('schedule').value || '',
                regFee: parseFloat(document.getElementById('regFee').value) || 0,
                price: parseFloat(document.getElementById('price').value) || 0,
                regDate: document.getElementById('regDate').value || new Date().toISOString().split('T')[0],
                photo: currentPhotoBase64
            };
            if(!data.name) return;
            if(currentIdx > -1) db[activeTab][currentIdx] = { ...db[activeTab][currentIdx], ...data };
            else { data.id = Date.now(); data.payments = {}; data.absences = []; db[activeTab].push(data); }
            
            sortDB(activeTab); // الترتيب الأبجدي بعد كل حفظ
            save(); closeModal();
        }

        function render() {
            const t = translations[currentLang];
            const currentMonthAr = translations.ar.months[new Date().getMonth()];
            const currentMonthLocal = t.months[new Date().getMonth()];
            
            document.getElementById('count-teachers').innerText = db.teachers.length;
            document.getElementById('count-trainees').innerText = db.trainees.length;
            document.getElementById('count-students').innerText = db.students.length;
            document.getElementById('count-firstaid').innerText = db.firstaid.length;

            const monthlyIncome = [...db.trainees, ...db.students].reduce((a, x) => a + (x.payments[currentMonthAr] ? x.price : 0), 0);
            const totalRegFees = [...db.trainees, ...db.students].reduce((a, x) => a + (x.regFee || 0), 0);
            const firstAidIncome = db.firstaid.reduce((a, x) => a + (x.payments[currentMonthAr] ? x.price : 0), 0);
            const income = monthlyIncome + totalRegFees + firstAidIncome;
            const expensesTotal = db.expenses.reduce((a, e) => a + e.price, 0) + db.teachers.reduce((a, tc) => a + (tc.payments[currentMonthAr] || 0), 0);
            document.getElementById('netProfit').innerText = (income - expensesTotal) + " DH";

            const people = [...db.trainees, ...db.students];
            document.getElementById('paidRatio').innerText = `${people.filter(x => x.payments[currentMonthAr]).length} / ${people.length}`;

            const unpaidTable = document.getElementById('unpaid-table');
            const unpaidList = people.filter(x => !x.payments[currentMonthAr]);
            
            if(unpaidList.length === 0) {
                document.getElementById('unpaid-section').style.display = 'none';
            } else {
                document.getElementById('unpaid-section').style.display = 'block';
                unpaidTable.innerHTML = unpaidList.map(x => {
                    const whatsappNumber = x.phone ? (x.phone.startsWith('0') ? '212' + x.phone.substring(1) : x.phone) : '';
                    const payMsg = t.msg_pay.replace('{name}', x.name).replace('{month}', currentMonthLocal);
                    const photoHtml = x.photo ? `<img src="${x.photo}" class="user-pic">` : `<i class="fa-solid fa-circle-user" style="font-size:35px; color:#ddd; vertical-align:middle; margin-left:10px;"></i>`;
                    return `<tr>
                        <td>${photoHtml} <b>${x.name}</b></td>
                        <td>${x.phone}</td>
                        <td><b style="color:var(--red)">${x.price} DH</b></td>
                        <td><a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(payMsg)}" target="_blank" class="wa-notify wa-pay"><i class="fa-brands fa-whatsapp"></i></a></td>
                    </tr>`;
                }).join('');
            }

            const schedTbody = document.getElementById('schedule-summary-table');
            schedTbody.innerHTML = db.teachers.map(tc => {
                let count = 0;
                if(tc.level === 'تكوين مهني') {
                    count = db.trainees.filter(tr => tr.spec === tc.spec).length;
                } else {
                    count = db.students.filter(st => st.spec === tc.spec && st.level === tc.level).length;
                }
                let specLabel = tc.spec;
                const found = [...vocationalSpecs, ...schoolSubjects].find(s => s.ar === tc.spec);
                if(found) specLabel = currentLang === 'ar' ? found.ar : found.fr;
                let levelLabel = tc.level;
                if(currentLang === 'fr'){
                    if(tc.level === 'تكوين مهني') levelLabel = 'Prof.';
                    else if(tc.level === 'ابتدائي') levelLabel = 'Prim.';
                    else if(tc.level === 'إعدادي') levelLabel = 'Coll.';
                    else if(tc.level === 'ثانوي') levelLabel = 'Lycée';
                }
                const photoHtml = tc.photo ? `<img src="${tc.photo}" class="user-pic">` : `<i class="fa-solid fa-circle-user" style="font-size:35px; color:#ddd; vertical-align:middle; margin-left:10px;"></i>`;
                return `<tr><td>${photoHtml} <b>${tc.name}</b></td><td><span style="color:var(--gold-dark);">${specLabel}</span> <small>(${levelLabel})</small></td><td><span class="badge badge-sched">${tc.schedule || '--'}</span></td><td><b style="color:var(--blue)">${count}</b></td></tr>`;
            }).sort().join('');

            const drawTable = (id, data) => {
                const tbody = document.getElementById(id + '-table');
                if(!tbody) return;
                let filtered = data;
                if(id === 'trainees' && filters.trainees !== 'الكل') filtered = data.filter(x => x.spec === filters.trainees);
                else if(filters[id] && filters[id] !== 'الكل') filtered = data.filter(x => x.level === filters[id]);

                tbody.innerHTML = filtered.map((x, i) => {
                    const gIdx = db[id].indexOf(x);
                    const photoHtml = x.photo ? `<img src="${x.photo}" class="user-pic">` : `<i class="fa-solid fa-circle-user" style="font-size:35px; color:#ddd; vertical-align:middle; margin-left:10px;"></i>`;
                    const whatsappNumber = x.phone ? (x.phone.startsWith('0') ? '212' + x.phone.substring(1) : x.phone) : '';
                    let actions = `<div class="action-btns"><button class="btn-edit" onclick="openEditModal(${gIdx}, '${id}')"><i class="fa-solid fa-pen"></i></button>${(id==='trainees'||id==='students') ? `<button class="btn-arch" onclick="moveToArchive('${id}', ${gIdx})"><i class="fa-solid fa-door-open"></i></button>` : ''}<button class="btn-del" onclick="del('${id}', ${gIdx})"><i class="fa-solid fa-trash"></i></button></div>`;

                    if(id === 'expenses') return `<tr><td><b>${x.name}</b></td><td><b style="color:var(--red)">${x.price} DH</b></td><td>${x.regDate}</td><td>${actions}</td></tr>`;
                    if(id === 'archived') return `<tr><td>${photoHtml} <b>${x.name}</b></td><td><span class="badge" style="background:#eee;">${x.originalTab || '---'}</span></td><td>${x.spec}</td><td>${x.phone}</td><td><div class="action-btns"><button class="btn-restore" onclick="restoreFromArchive(${gIdx})"><i class="fa-solid fa-rotate-left"></i></button><button class="btn-del" onclick="del('archived', ${gIdx})"><i class="fa-solid fa-trash"></i></button></div></td></tr>`;

                    const isPaid = !!x.payments[currentMonthAr];
                    const payStatus = isPaid ? `<i class="fa-solid fa-check"></i> ${t.pay_done}` : `<i class="fa-solid fa-clock"></i> ${t.pay_wait}`;
                    let specLabel = x.spec;
                    const found = [...vocationalSpecs, ...schoolSubjects].find(s => s.ar === x.spec);
                    if(found) specLabel = currentLang === 'ar' ? found.ar : found.fr;

                    if(id === 'inquiries') return `<tr><td>${photoHtml} <b>${x.name}</b></td><td>${x.phone}</td><td>${specLabel}</td><td><a href="https://wa.me/${whatsappNumber}" target="_blank" class="wa-notify wa-pay"><i class="fa-brands fa-whatsapp"></i></a></td><td>${actions}</td></tr>`;
                    
                    if(id === 'firstaid') {
                        const msg = t.msg_firstaid.replace('{name}', x.name);
                        return `<tr><td>${photoHtml} <b>${x.name}</b></td><td>${x.phone}</td><td><b style="color:var(--gold-dark)">${x.price} DH</b></td><td><button class="badge badge-pay" onclick="openPay(${gIdx}, 'firstaid')">${payStatus}</button><a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}" target="_blank" class="wa-notify wa-pay"><i class="fa-brands fa-whatsapp"></i></a></td><td>${actions}</td></tr>`;
                    }

                    const payMsg = t.msg_pay.replace('{name}', x.name).replace('{month}', currentMonthLocal);
                    let lastAbs = (x.absences && x.absences.length > 0) ? x.absences[x.absences.length-1] : (currentLang === 'ar' ? "اليوم" : "Aujourd'hui");
                    const absMsg = t.msg_abs.replace('{name}', x.name).replace('{spec}', specLabel).replace('{time}', lastAbs);

                    let catLabel = x.level;
                    if(currentLang === 'fr' && id === 'teachers'){
                         if(x.level === 'تكوين مهني') catLabel = 'Prof.';
                         else if(x.level === 'ابتدائي') catLabel = 'Prim.';
                         else if(x.level === 'إعدادي') catLabel = 'Coll.';
                         else if(x.level === 'ثانوي') catLabel = 'Lycée';
                    }

                    return `<tr><td>${photoHtml} <b>${x.name}</b></td>${id === 'students' ? `<td><span class="badge" style="background:#eee;">${x.level}</span></td>` : ''}${id === 'teachers' ? `<td><span class="badge" style="background:#f1f5f9;">${catLabel}</span></td>` : ''}<td><b>${specLabel || '---'}</b></td><td>${x.phone}</td>${id !== 'teachers' ? `<td><span class="badge badge-reg">${x.regFee || 0} DH</span></td>` : ''}<td><button class="badge badge-pay" onclick="openPay(${gIdx}, '${id}')">${payStatus}</button>${id !== 'teachers' ? `<a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(payMsg)}" target="_blank" class="wa-notify wa-pay"><i class="fa-brands fa-whatsapp"></i></a>` : ''}</td>${(id === 'trainees' || id === 'students') ? `<td><button class="badge badge-abs" onclick="openAbs(${gIdx}, '${id}')">${x.absences.length}</button><a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(absMsg)}" target="_blank" class="wa-notify wa-abs"><i class="fa-brands fa-whatsapp"></i></a></td>` : ''}<td>${actions}</td></tr>`;
                }).join('');
            };
            ['teachers', 'trainees', 'students', 'firstaid', 'inquiries', 'expenses', 'archived'].forEach(id => drawTable(id, db[id]));
        }

        function moveToArchive(tab, idx) { if(confirm(translations[currentLang].confirm_arch)) { let item = db[tab][idx]; item.originalTab = tab; db.archived.push(item); db[tab].splice(idx, 1); save(); } }
        function restoreFromArchive(idx) { const item = db.archived[idx]; const targetTab = item.originalTab; if (targetTab && db[targetTab]) { db[targetTab].push(item); db.archived.splice(idx, 1); sortDB(targetTab); save(); } }
        function save() { localStorage.setItem('agora_beauty_db', JSON.stringify(db)); render(); }
        function closeModal() { document.getElementById('modalOverlay').style.display = 'none'; }
        function resetForm() { 
            ['name', 'phone', 'schedule', 'price', 'regFee'].forEach(id => { if(document.getElementById(id)) document.getElementById(id).value = ''; }); 
            document.getElementById('regDate').valueAsDate = new Date();
            document.getElementById('imgPreview').style.display = 'none';
            currentPhotoBase64 = "";
            document.getElementById('fileInput').value = "";
        }
        function del(t, i) { if(confirm(translations[currentLang].confirm_del)) { db[t].splice(i, 1); save(); } }
        
        function openAbs(i, t) { 
            currentIdx = i; activeTab = t; 
            document.getElementById('modalOverlay').style.display='flex'; document.getElementById('mainForm').style.display='none'; document.getElementById('payModal').style.display='none'; document.getElementById('absModal').style.display='block'; 
            document.getElementById('newAbsDate').valueAsDate = new Date();
            const now = new Date(); document.getElementById('newAbsTime').value = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            renderAbsList(); 
        }

        function renderAbsList() { 
            const u = db[activeTab][currentIdx]; 
            document.getElementById('absListContainer').innerHTML = (u.absences || []).map((d, i) => `<div style="display:flex; justify-content:space-between; margin-bottom:8px; background:#f8fafc; padding:10px; border-radius:10px; border:1px solid #eee;"><span><i class="fa-solid fa-clock" style="color:var(--gold); font-size:12px;"></i> ${d}</span><button onclick="removeAbs(${i})" style="border:none; background:none; color:var(--red); cursor:pointer;"><i class="fa-solid fa-trash"></i></button></div>`).join('') || (currentLang === 'ar' ? 'لا يوجد غياب' : 'Aucune absence'); 
        }

        function processAddAbs() { 
            const d = document.getElementById('newAbsDate').value; const t = document.getElementById('newAbsTime').value;
            if(d) { const fullDateTime = d + (t ? ' | ' + t : ''); db[activeTab][currentIdx].absences.push(fullDateTime); save(); renderAbsList(); } 
        }

        function removeAbs(i) { db[activeTab][currentIdx].absences.splice(i, 1); save(); renderAbsList(); }

        function openPay(i, t) {
            currentIdx = i; activeTab = t;
            document.getElementById('modalOverlay').style.display='flex'; document.getElementById('mainForm').style.display='none'; document.getElementById('absModal').style.display='none'; document.getElementById('payModal').style.display='block';
            const u = db[t][i]; const isTeacher = (t === 'teachers');
            document.getElementById('teacherPriceInput').style.display = isTeacher ? 'block' : 'none';
            if(isTeacher) document.getElementById('customPrice').value = u.payments[translations.ar.months[new Date().getMonth()]] || '';
            renderMonthsGrid();
        }

        function renderMonthsGrid() {
            const u = db[activeTab][currentIdx]; const isTeacher = (activeTab === 'teachers'); const monthsAr = translations.ar.months;
            document.getElementById('monthsGrid').innerHTML = monthsAr.map((m, idx) => {
                const amount = u.payments[m];
                return `<div style="display:flex; justify-content:space-between; padding:12px; background:#f8fafc; border-radius:14px; border:1px solid #eee; align-items:center;"><div style="display:flex; align-items:center;"><span style="font-weight:600; min-width:80px;">${translations[currentLang].months[idx]}</span>${(isTeacher && amount) ? `<span style="color:var(--green); font-weight:bold; margin:0 10px;">${amount} DH</span>` : ''}</div><input type="checkbox" style="width:22px; height:22px; cursor:pointer;" ${amount ? 'checked' : ''} onchange="togglePay('${m}')"></div>`;
            }).join('');
        }

        function togglePay(m) {
            const u = db[activeTab][currentIdx];
            if(u.payments[m]) { delete u.payments[m]; } 
            else { 
                if(activeTab === 'teachers') { 
                    const pr = parseFloat(document.getElementById('customPrice').value); 
                    if(!pr) { alert(currentLang === 'ar' ? 'المرجو إدخال المبلغ أولاً' : 'Veuillez saisir le montant'); renderMonthsGrid(); return; }
                    u.payments[m] = pr; 
                } else { u.payments[m] = true; }
            }
            save(); renderMonthsGrid();
        }

        applyLanguage();
        showTab('dashboard');
		
    </script>
</body>
</html>