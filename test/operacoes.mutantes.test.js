const {
  divisao, raizQuadrada, fatorial, mediaArray, maximoArray, minimoArray,
  isPar, isImpar, isPrimo, clamp, isDivisivel, celsiusParaFahrenheit,
  fahrenheitParaCelsius, inverso, isMaiorQue, isMenorQue, isEqual, medianaArray
} = require('../src/operacoes');

describe('Testes adicionais para matar mutantes sobreviventes', () => {
  describe('divisao', () => {
    test('lança erro com a mensagem correta para divisão por zero', () => {
      expect(() => divisao(5, 0)).toThrow('Divisão por zero não é permitida.');
    });
  });

  describe('raizQuadrada', () => {
    test('lança erro para número negativo', () => {
      expect(() => raizQuadrada(-1)).toThrow('Não é possível calcular a raiz quadrada de um número negativo.');
    });
    test('zero é válido (fronteira de n < 0)', () => {
      expect(raizQuadrada(0)).toBe(0);
    });
  });

  describe('fatorial', () => {
    test('lança erro para número negativo', () => {
      expect(() => fatorial(-1)).toThrow('Fatorial não é definido para números negativos.');
    });
    test('fatorial(0) é 1 (fronteira de n < 0)', () => {
      expect(fatorial(0)).toBe(1);
    });
    test('fatorial(1) é 1 (documenta o caso base)', () => {
      expect(fatorial(1)).toBe(1);
    });
  });

  describe('mediaArray', () => {
    test('array vazio retorna 0 (sem o if, daria NaN)', () => {
      expect(mediaArray([])).toBe(0);
    });
  });

  describe('maximoArray / minimoArray', () => {
    // A mensagem original contém caracteres cirílicos ("не"); por isso
    // comparamos só o trecho final, que é ASCII/latino.
    test('maximoArray lança erro para array vazio', () => {
      expect(() => maximoArray([])).toThrow('possui valor máximo.');
    });
    test('minimoArray lança erro para array vazio', () => {
      expect(() => minimoArray([])).toThrow('possui valor mínimo.');
    });
  });

  describe('isPar / isImpar (casos negativos)', () => {
    test('isPar(3) é false', () => { expect(isPar(3)).toBe(false); });
    test('isImpar(4) é false', () => { expect(isImpar(4)).toBe(false); });
  });

  describe('isPrimo', () => {
    test.each([-7, 0, 1])('isPrimo(%i) é false (n <= 1)', (n) => {
      expect(isPrimo(n)).toBe(false);
    });
    test('isPrimo(2) é true (menor primo)', () => {
      expect(isPrimo(2)).toBe(true);
    });
    test.each([4, 9, 15])('isPrimo(%i) é false (composto)', (n) => {
      expect(isPrimo(n)).toBe(false);
    });
  });

  describe('clamp', () => {
    test('valor abaixo do mínimo retorna o mínimo', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });
    test('valor acima do máximo retorna o máximo', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('isDivisivel', () => {
    test('isDivisivel(10, 3) é false', () => {
      expect(isDivisivel(10, 3)).toBe(false);
    });
  });

  describe('conversões de temperatura (valores que não zeram o termo)', () => {
    test('100 °C = 212 °F', () => { expect(celsiusParaFahrenheit(100)).toBe(212); });
    test('212 °F = 100 °C', () => { expect(fahrenheitParaCelsius(212)).toBe(100); });
  });

  describe('inverso', () => {
    test('lança erro para zero', () => {
      expect(() => inverso(0)).toThrow('Não é possível inverter o número zero.');
    });
  });

  describe('comparações (casos false e fronteira)', () => {
    test('isMaiorQue(5, 10) é false', () => { expect(isMaiorQue(5, 10)).toBe(false); });
    test('isMaiorQue(5, 5) é false', () => { expect(isMaiorQue(5, 5)).toBe(false); });
    test('isMenorQue(10, 5) é false', () => { expect(isMenorQue(10, 5)).toBe(false); });
    test('isMenorQue(5, 5) é false', () => { expect(isMenorQue(5, 5)).toBe(false); });
    test('isEqual(1, 2) é false', () => { expect(isEqual(1, 2)).toBe(false); });
  });

  describe('medianaArray', () => {
    test('lança erro para array vazio', () => {
      expect(() => medianaArray([])).toThrow('possui mediana.');
    });
    test('array ímpar DESORDENADO usa o sort', () => {
      expect(medianaArray([3, 1, 2])).toBe(2);
    });
    test('array par ordenado faz a média dos dois centrais', () => {
      expect(medianaArray([1, 2, 3, 4])).toBe(2.5);
    });
    test('array par desordenado', () => {
      expect(medianaArray([4, 1, 3, 2])).toBe(2.5);
    });
  });
});