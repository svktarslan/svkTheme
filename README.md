# @svkTheme – Kurulum ve Gerekli Paketler

Bu paket; `CustomText`, `CustomTextInput`, `CustomAsyncButton`, `CustomModal`, `CustomBottomSheet`, `CustomKeyboardAvoidingView`, `CustomSelectList`, `CustomMultiButton`, `StarRating`, `Avatars` gibi yeniden kullanılabilir React Native bileşenleri sağlar.

## Gerekli NPM Paketleri

Projede aşağıdaki bağımlılıkların kurulu olması gerekir:

Temel (çoğu projede zaten vardır):
- react
- react-native
- react-native-gesture-handler
- react-native-reanimated
- react-native-safe-area-context
- react-native-screens

Bu kütüphane için ek olarak:
- @gorhom/bottom-sheet
- react-native-vector-icons
- react-hook-form
- react-native-keyboard-controller
- i18next
- react-i18next

Kurulum (npm):
```bash
npm i @gorhom/bottom-sheet react-native-vector-icons react-hook-form react-native-keyboard-controller i18next react-i18next
npm i react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens
```

Kurulum (yarn):
```bash
yarn add @gorhom/bottom-sheet react-native-vector-icons react-hook-form react-native-keyboard-controller i18next react-i18next
yarn add react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens
```

iOS için:
```bash
cd ios && pod install
```

Notlar:
- `react-native-reanimated` için Babel eklentisinin en sonda olduğundan emin olun:
  ```js
  // babel.config.js
  plugins: [
    'react-native-reanimated/plugin',
    // module-resolver vs...
  ]
  ```
- `react-native-vector-icons` RN 0.60+ ile otomatik linklenir. iOS’ta `pod install` yeterlidir.

## Yol (Alias) ve Metro Ayarı
Paket proje kökünde `svkTheme/` klasöründe duruyorsa, RN app içinde aşağıdaki alias ve metro ayarları gerekir.

- `babel.config.js`:
```js
// ListifyMobile/babel.config.js
alias: {
  '@': './src',
  '@svkTheme': '../svkTheme',
}
```

- `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@svkTheme/*": ["../svkTheme/*"]
    }
  }
}
```

- `metro.config.js`:
```js
// ListifyMobile/metro.config.js
const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const config = {
  watchFolders: [path.resolve(__dirname, '..', 'svkTheme')],
};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

- `svkTheme/tsconfig.json` (editörde tiplerin doğru çözülmesi için):
```json
{
  "extends": "../ListifyMobile/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@svkTheme/*": ["./*"] },
    "types": ["react", "react-native"]
  },
  "include": ["**/*"]
}
```

Metro’yu cache temizleyerek başlatın:
```bash
npm run start -- --reset-cache
```

## Kullanım Örneği
```tsx
import React from 'react';
import { ThemeProvider, CustomText, CustomTextInput } from '@svkTheme';
import { useForm } from 'react-hook-form';

export default function Example() {
  const { control } = useForm({ defaultValues: { name: '' } });
  return (
    <ThemeProvider initialMode="light">
      <CustomText text="Hello" />
      <CustomTextInput
        title="Name"
        name="name"
        control={control}
        rules={{ required: 'Required' }}
        placeholder="Write..."
      />
    </ThemeProvider>
  );
}
```


