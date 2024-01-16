// разбирает пользовательский ввод
// принимает массив строк: команд и аргументов, возвращает объект: {имя команды: [параметры]}
type TParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArguments: string[]): TParsedCommand {
    const parsedCommand: TParsedCommand = {};
    let currentCommand = '';

    for (const argument of cliArguments) { // почему не map?
      if (argument.startsWith('--')) {
        parsedCommand[argument] = []; // создаем в словаре ключ = имя команды
        currentCommand = argument;
      } else if (currentCommand && argument) {
        parsedCommand[currentCommand].push(argument); // параметры, кот-е следуют непоср-нно за командой в польз вводе
      }
    }

    return parsedCommand;
  }
}
