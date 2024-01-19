import { Command } from './command/command.interface.js';
import { CommandParser } from './command-parser.js';
import { HELP_COMMAND } from '../consts.js';

export class CLIApplication {
  private commands: Record<string, Command> = {};
  private readonly defaultCommand: string = HELP_COMMAND;

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.name)) {
        throw new Error(`Command ${command.name} is already registered`); // исключаем повторную регистрацию
      }
      this.commands[command.name] = command;
    });
  }

  public getDefaultCommand(): Command {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
