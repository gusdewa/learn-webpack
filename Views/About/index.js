import './styles.scss';
import module1 from './module1';

const printConsole = () => {
  console.log('This is About-Index.js');
  console.log(`The value from module 1 is ${module1.value}`);  
};

printConsole();

