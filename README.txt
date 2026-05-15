PlayStation Cafe Manager V5.2 Stable Rebuild

تشغيل محلي:
1) افتح Start.bat
أو:
node server.js
ثم افتح http://localhost:8000/index.html

بيانات الدخول:
admin / 1234
cashier / 1234

رفع GitHub Pages:
ارفع كل الملفات الموجودة في هذا المجلد إلى الريبو.

Supabase اختياري للديمو.
الجدول المطلوب إذا أردت المزامنة:
public.ps_cafe_state
id text primary key
data jsonb not null
updated_at timestamptz default now()
