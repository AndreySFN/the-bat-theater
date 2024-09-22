import fs from 'fs';
import { execSync } from 'child_process';

// Удаляем директорию .next
fs.rmSync('.next', { recursive: true, force: true });

// Запускаем сборку проекта
execSync('npm run build', { stdio: 'inherit' });

// Создаем директорию build, если ее нет
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

// Копируем необходимые файлы и директории в build
const filesToCopy = ['package-lock.json', 'package.json', '.next', 'public'];

filesToCopy.forEach((file) => {
  const srcPath = './'.concat(file);
  const destPath = './build'.concat(file);

  if (fs.existsSync(srcPath)) {
    fs.cpSync(srcPath, destPath, { recursive: true });
  } else {
    console.warn(`Предупреждение: ${file} не найден и не был скопирован.`);
  }
});

// Модифицируем package.json в директории build
const pkgPath = './build/package.json';
const pkgData = fs.readFileSync(pkgPath, 'utf8');
const pkg = JSON.parse(pkgData);

// Удаляем devDependencies
delete pkg.devDependencies;

// Добавляем скрипт start
pkg.scripts = pkg.scripts || {};
pkg.scripts.start = 'next start -p $PORT';

// Сохраняем изменения в package.json
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

console.log('Скрипт успешно выполнен.');
