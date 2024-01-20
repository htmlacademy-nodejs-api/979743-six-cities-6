import chalk from 'chalk';
import { Command } from './command.interface.js';
import { HELP_COMMAND } from './consts.js';

export class HelpCommand implements Command {
  public get name(): string {
    return HELP_COMMAND;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.green('Программа для подготовки данных для REST API сервера.')}
        Пример:
            main.cli.ts --<command> [--arguments]
        Команды:
            ${chalk.red('--version:')}                   # выводит в консоль номер версии данного приложения
            ${chalk.red('--help:')}                      # выводит в консоль список доступных команд
            ${chalk.red('--import <path>:')}             # импортирует данные из TSV-файла и выводит их в консоль, <path> - путь к файлу
            ${chalk.red('--generate <n> <path> <url>')}  # генерирует произвольное количество тестовых данных - не реализовано
    `);
  }
}
