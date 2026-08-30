using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class Challenge : ResturantServices
    {
        public Challenge(int serviceNumber, int numberOfGuests, string serviceType, int timeLimit, string currentStatus) : base(serviceNumber, numberOfGuests, serviceType, timeLimit, currentStatus)
        {
        }

        public override void Services()
        {
            Console.WriteLine($"#{ServiceNumber} | Number of Guests: {NumberOfGuests} | Service Type: {ServiceType} | Time Limit: {TimeLimit} | Current Status: {CurrentStatus} | Challenge Service: Contestants must prepare for specific dishes.");
        }
    }
}
