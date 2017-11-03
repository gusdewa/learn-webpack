import module1 from './module1';
import './styles.scss';

const printConsole = () => {
  console.log('This is About-Index.js');
  console.log(`The value from module 1 is ${module1.value}`);
};

$('#pickme').text('Hohohoho');

printConsole();
