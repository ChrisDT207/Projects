using System.Reflection.PortableExecutable;

Console.WriteLine("Hello!");
Console.WriteLine("Input first number: ");

Console.WriteLine();

string userInputA = Console.ReadLine();
int userNumberA = int.Parse(userInputA);

Console.WriteLine();

Console.WriteLine("Input second number: ");

Console.WriteLine();

string userInputB = Console.ReadLine();
int userNumberB = int.Parse(userInputB);

Console.WriteLine();

Console.WriteLine("What do you want to do?");
Console.WriteLine("[A]dd numbers");
Console.WriteLine("[S]ubtract numbers"); 
Console.WriteLine("[M]ultiply numbers");

Console.WriteLine();

int addition = userNumberA + userNumberB;
int subtract = userNumberA - userNumberB;
int multiply = userNumberA * userNumberB;

string UserInput = Console.ReadLine();

if (UserInput == "A" || UserInput == "a")
{
    Console.WriteLine($"{userInputA} + {userInputB} = {addition}");
}

else if (UserInput == "S" || UserInput == "s")
{
    Console.WriteLine($"{userInputA} - {userInputB} = {subtract}");
}

else if (UserInput == "M" || UserInput == "m")
{
    Console.WriteLine($"{userInputA} * {userInputB} = {multiply}");
}

else
{
    Console.WriteLine("Invalid Option!");
}

Console.WriteLine("Press any key to close");
Console.ReadKey();