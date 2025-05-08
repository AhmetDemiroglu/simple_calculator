# Sonsuz Hesap Makinesi (Infinite Calculator)

Bu proje, kullanıcıların satır satır sayılar ve temel aritmetik operatörler (+, -, *, /) ekleyerek dinamik hesaplamalar yapabildiği, React tabanlı interaktif bir web uygulamasıdır. Hesaplamalar, kullanıcı tarafından girilen satırların sırasına göre soldan sağa doğru yapılır.

## Özellikler

* **Dinamik Satır Ekleme:** Kullanıcılar istedikleri kadar hesaplama satırı ekleyebilir.
* **Sayı ve Operatör Girişi:** Her satır için bir sayısal değer ve bir aritmetik operatör (+, -, \*, /) seçilebilir.
* **Anlık Hesaplama Ekranı:** Girilen sayı ve operatörler, hesap makinesi ekranı benzeri bir alanda anlık olarak gösterilir.
* **Dinamik Sonuç:** Tüm satırlardaki verilere göre nihai sonuç anlık olarak hesaplanır ve görüntülenir.
* **Satır Silme:** Her bir hesaplama satırı tek tek silinebilir.
* **Tümünü Temizle:** Tüm hesaplama satırları tek bir butonla temizlenerek başlangıç durumuna dönülebilir.
* **Kullanıcı Uyarısı:** Hesaplamaların giriş sırasına göre yapıldığı ve standart matematiksel işlem önceliğinin (PEMDAS/BODMAS) uygulanmadığı belirtilir.

## Ekran Görüntüsü

Projeden bir ekran görüntüsü:
![Sonsuz Hesap Makinesi Ekran Görüntüsü](./screenshot.png)

## Kullanılan Teknolojiler

* **React:** Kullanıcı arayüzü için JavaScript kütüphanesi (Vite ile oluşturulmuştur).
* **TypeScript:** JavaScript için statik tip denetimi sağlar.
* **Tailwind CSS:** Hızlı ve modern arayüz geliştirme için bir CSS framework'ü.
* **use-immer:** React state'lerini daha kolay ve değişmez (immutable) bir şekilde yönetmek için kullanılmıştır.
* **Vite:** Hızlı geliştirme ve derleme süreçleri için modern bir frontend aracı.

## Yerelde Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1.  **Repoyu Klonlayın:**
    ```bash
git clone [https://github.com/AhmetDemiroglu/simple_calculator.git](https://github.com/AhmetDemiroglu/simple_calculator.git)
    
2.  **Proje Dizinine Gidin:**
    ```bash
    cd simple_calculator
    ```

3.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

4.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```
    Bu komut genellikle projeyi `http://localhost:5173` (veya benzeri bir portta) açacaktır.

## Notlar

* Bu hesap makinesi, matematiksel işlem önceliği (PEMDAS/BODMAS gibi kurallar) dikkate alınmadan, kullanıcı tarafından girilen satırların sırasına göre soldan sağa doğru işlem yapar.
