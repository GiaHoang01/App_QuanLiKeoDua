import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';

// Bỏ qua cảnh báo về OverlayPanel đã bị deprecated
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    // Kiểm tra nếu cảnh báo có chứa thông báo về OverlayPanel đã bị deprecated
    if (args[0] && args[0].includes('OverlayPanel is deprecated')) {
      return; // Bỏ qua cảnh báo này
    }
  };
}

// Khởi tạo ứng dụng Angular với HTTP client và các providers từ appConfig
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    ...appConfig.providers // Thêm các providers từ appConfig (nếu có)
  ]
})
.catch(err => console.error(err));
