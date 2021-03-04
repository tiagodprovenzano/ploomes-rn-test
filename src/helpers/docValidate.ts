export default class DocHelper {
  static validateDoc(cpf: string) {
    cpf = cpf.replace('-', '').replace('.', '').replace('.', '');

    if (
      cpf.length !== 11 ||
      [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
      ].includes(cpf)
    ) {
      return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto: number = 11 - (soma % 11);

    if (resto == 10 || resto == 11) {
      resto = 0;
    }

    if (resto != parseInt(cpf.charAt(9))) {
      return false;
    }

    soma = 0;
    for (let n = 0; n < 10; n++) {
      soma += parseInt(cpf.charAt(n)) * (11 - n);
    }

    resto = 11 - (soma % 11);
    if (resto == 10 || resto == 11) {
      resto = 0;
    }

    if (resto != parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }
}
