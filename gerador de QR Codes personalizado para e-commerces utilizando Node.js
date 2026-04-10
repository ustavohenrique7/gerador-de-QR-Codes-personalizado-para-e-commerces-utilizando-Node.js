// qr-generator.js
// Gerador de QR Codes para e-commerce (terminal)

const readline = require('readline');
const QRCode = require('qrcode');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log(`\n===== GERADOR DE QR CODE =====
1 - Gerar QR Code de produto
0 - Sair`);

  rl.question('Escolha uma opção: ', opcao => {
    switch(opcao) {
      case '1': gerarQRCode(); break;
      case '0': rl.close(); break;
      default:
        console.log('Opção inválida!');
        menu();
    }
  });
}

function gerarQRCode() {
  rl.question('Nome do produto: ', nome => {
    rl.question('Link do produto: ', link => {
      const fileName = nome.replace(/\s+/g, '_').toLowerCase();

      QRCode.toFile(`./${fileName}.png`, link, {
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      }, (err) => {
        if (err) {
          console.log('Erro ao gerar QR Code:', err);
        } else {
          console.log(`QR Code gerado com sucesso: ${fileName}.png`);
        }
        menu();
      });
    });
  });
}

menu();
