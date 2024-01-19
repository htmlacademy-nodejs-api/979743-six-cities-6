import { Command } from './command.interface.js';
import { HELP_COMMAND } from '../../consts.js';

export class HelpCommand implements Command {
  public get name(): string {
    return HELP_COMMAND;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.cli.ts --<command> [--arguments]
        Команды:
            --version:                   # выводит в консоль номер версии данного приложения
            --help:                      # выводит в консоль список доступных команд
            --import <path>:             # импортирует данные из TSV-файла и выводит их в консоль? <path> - путь к файлу
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных - не реализовано
    `);
  }
}
