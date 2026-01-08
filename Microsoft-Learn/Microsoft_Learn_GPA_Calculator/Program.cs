using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft_Learn_GPA_Calculator
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int grade1 = 4;
            int grade2 = 3;
            int grade3 = 3;
            int grade4 = 3;
            int grade5 = 4;

            int gradeTotal = grade1 + grade2 + grade3 + grade4 + grade5;

            int credit1 = 3;
            int credit2 = 3;
            int credit3 = 4;
            int credit4 = 4;
            int credit5 = 3;

            int creditTotal = credit1 + credit2 + credit3 + credit4 + credit5;

            int totalGpa = grade1 * credit1 + grade2 * credit2 + grade3 * credit3 + grade4 * credit4 + grade5 * credit5;

            double gpaOne = (double) totalGpa/creditTotal;
            
            double gpaFinal = Math.Round(gpaOne, 2); 

            Console.WriteLine("Student: Sophia Johnson");

            Console.WriteLine("");

            Console.WriteLine("Course\t\tGrade\t\tCredit Hours");
            Console.WriteLine($"English 101\t\t{grade1}\t\t{credit1}");
            Console.WriteLine($"Algebra 101\t\t{grade2}\t\t{credit2}");
            Console.WriteLine($"Biology 101\t\t{grade3}\t\t{credit3}");
            Console.WriteLine($"Computer Science I\t{grade4}\t\t{credit4}");
            Console.WriteLine($"Psychology 101\t\t{grade5}\t\t{credit5}");

            Console.WriteLine("");

            Console.WriteLine($"Final GPA: \t\t{gpaFinal}");

        }
    }
}
