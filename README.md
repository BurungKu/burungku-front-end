## BurungKu - Preview
![Preview](https://github.com/user-attachments/assets/7cd92382-0055-4f94-861f-33006721d7a6)
![Preview](https://github.com/user-attachments/assets/a747432d-be09-44c4-be8f-5240174b89cb)
![Preview](https://github.com/user-attachments/assets/9013e696-febf-4459-9985-42170104f61e)

## Dibuat dengan
- React vite v19
- Axios
- Tanstack Query v5
- Talwind v4
- Shadcn

## Fitur
- Deteksi Spesies dari Gambar (input dari device atau camera)
- Analisis Kesehatan dari Kicauan (input dari device atau mikrofon)

## Instalasi
1. Clone repository ini:
   ```sh
    git clone https://github.com/threeanra/mobo-analyzer.git](https://github.com/BurungKu/burungku-front-end.git
   ```
2. Masuk ke folder project:
    ```sh
    cd burungku-front-end
    ```
3. Buat file .env:
    ```sh
    touch .env  # Untuk versi windows bisa untuk buat manual pada root project
    ```
4. Isi file .env:
    ```sh
    VITE_BACK_END_URL=YOUR_BACK_END_URL   # Isi dengan url Heroku yang sudah dideploy
    VITE_STATIC_API_KEY=YOUR_API_KEY      # Isi dengan API KEY yang didapat pada Config Vars Heroku
    ```
    Catatan: Pastikan API_KEY mempunyai value yang sama antara front-end dan back-end
5. Build & jalankan project
   ```sh
   bun install

   bun vite build

   bun dev          # Run development

   bun preview      # Run pra-production
   ```
