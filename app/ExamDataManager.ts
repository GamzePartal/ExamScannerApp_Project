/**
 * Bu sınıf, uygulama genelinde veri taşımak yerine verileri hafızada tutmak için kullanılır.
 * Cevap Anahtarı ve Öğrenci Kağıtları burada saklanır.
 */
export class ExamDataManager {
    // Hafızada tutulacak veriler (Static: Uygulama kapanana kadar silinmez)
    static answerKeyPages: string[] = [];
    static studentPages: string[] = [];
  
    // Cevap Anahtarını Kaydet
    static setAnswerKey(pages: string[]) {
      this.answerKeyPages = pages;
      console.log("Cevap Anahtarı Kaydedildi. Sayfa Sayısı:", pages.length);
    }
  
    // Öğrenci Kağıtlarını Kaydet
    static setStudentPages(pages: string[]) {
      this.studentPages = pages;
      console.log("Öğrenci Kağıtları Kaydedildi. Sayfa Sayısı:", pages.length);
    }
  
    // Verileri Temizle (Yeni işlem başlatıldığında kullanılır)
    static clear() {
      this.answerKeyPages = [];
      this.studentPages = [];
      console.log("Hafıza Temizlendi.");
    }
  
    // Cevap Anahtarını Getir
    static getAnswerKey() {
      return this.answerKeyPages;
    }
  
    // Öğrenci Kağıtlarını Getir
    static getStudentPages() {
      return this.studentPages;
    }
}