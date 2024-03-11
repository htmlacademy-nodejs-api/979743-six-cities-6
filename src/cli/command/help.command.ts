import chalk from 'chalk';
import { Command } from './command.interface.js';
import { CommandName } from './command.consts.js';

export class HelpCommand implements Command {
  public get name(): string {
    return CommandName.HELP;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.green('Программа для подготовки данных для REST API сервера.')}
        Пример:
            main.cli.ts --<command> [--arguments]
        Команды:
            ${chalk.blue('--version:')}                   # выводит в консоль номер версии данного приложения
            ${chalk.blue('--help:')}                      # выводит в консоль список доступных команд
            ${chalk.blue('--import <filename> <login> <password> <host> <dbname> <salt>')}
                                          # импортирует данные из TSV-файла и сохраняет их в БД,
                                          # <filename> - путь к файлу, из которого импортируются данныеб
                                          # <login>, <password> - логин и пароль для подключения к БД,
                                          # <host>, <dbname> - хост и имя БД,
                                          # <salt> - доп параметр для чэширования пароля
            ${chalk.blue('--generate <n> <path> <url>')}  # генерирует тестовые данные,
                                          # <n> - количество строк
                                          # <path> - путь к файлу, в который будут записаны данные
                                          # <url> - адрес json сервера, который вернет данные для генерации
    `);
  }
}
