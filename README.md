# TripFinder Boat App

React + Vite ile geliştirilmiş tekne kiralama ve tur hizmetleri uygulaması.

## Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Environment Variables Ayarlayın

Proje root dizininde `.env` dosyası oluşturun:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

**Supabase bilgilerinizi nereden bulabilirsiniz?**
1. [Supabase Dashboard](https://app.supabase.com/)'a giriş yapın
2. Projenizi seçin
3. Settings > API bölümüne gidin
4. `Project URL` ve `anon public` key'i kopyalayın

### 3. Development Server'ı Başlatın

```bash
npm run dev
```

## Vercel Deployment

Vercel'de deploy ederken environment variable'ları ayarlamanız gerekiyor:

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. **Settings** > **Environment Variables** bölümüne gidin
4. Aşağıdaki variable'ları ekleyin:

   - **Name**: `VITE_SUPABASE_URL`
     **Value**: Supabase projenizin URL'i
   
   - **Name**: `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
     **Value**: Supabase projenizin anon/public key'i

5. **Environment** seçeneklerinden **Production**, **Preview**, ve **Development** için uygun olanları seçin
6. **Save** butonuna tıklayın
7. Yeni bir deployment tetikleyin (örneğin, bir commit push edin)

**Önemli**: Vercel'de environment variable'ları ekledikten sonra yeni bir deployment yapmanız gerekiyor. Mevcut deployment'lar eski variable'larla build edilmiş olabilir.

## Scripts

- `npm run dev` - Development server'ı başlatır
- `npm run build` - Production build oluşturur
- `npm run preview` - Production build'i local'de test eder
- `npm run lint` - ESLint ile kod kontrolü yapar
- `npm test` - Testleri çalıştırır

## Teknolojiler

- React 19
- Vite
- React Router
- TanStack Query (React Query)
- Supabase
- Tailwind CSS
- Swiper
- React Hook Form + Zod
