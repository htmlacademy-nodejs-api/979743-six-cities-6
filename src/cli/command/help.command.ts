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
            ${chalk.blue('--version:')}                   # выводит в консоль номер версии данного приложения
            ${chalk.blue('--help:')}                      # выводит в консоль список доступных команд
            ${chalk.blue('--import <path>:')}             # импортирует данные из TSV-файла и выводит их в консоль, <path> - путь к файлу
            ${chalk.blue('--generate <n> <path> <url>')}  # генерирует тестовые данные,
                                      # <n> - количество строк
                                      # <path> - путь к файлу, в который будут записаны данные
                                      # <url> - адрес json сервера, который вернет данные для генерации
    `);
  }
}
