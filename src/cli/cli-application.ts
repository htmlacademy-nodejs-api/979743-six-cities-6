// регистрирует список команд
// принимает массив сущностей с интерфейсом Command, сохраняет словарь: {имя команды: класс Command}
// запускает соответствующую команду

import { Command } from './command/command.interface.js';
import { CommandParser } from './command-parser.js';

type TCommandCollection = Record<string, Command>; //объект, ключ = имя команды = string

export class CLIApplication {
  private commands: TCommandCollection = {}; // словарь зарегистрированных команд

  constructor(
    private readonly defaultCommand: string = '--help'
  ) {}

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`); // исключаем повторную регистрацию
      }
      this.commands[command.getName()] = command;
    });
  }

  public getDefaultCommand(): Command | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand(); // если commands[commandName] = null и не undefined, возвр defaultCommand
  }

  public processCommand(argv: string[]): void { // на основе польз ввода находит команду, выделяет параметры и запускает ее  этими параметрами
    const parsedCommand = CommandParser.parse(argv); //возвращает объект: {имя команды: [параметры]}
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
