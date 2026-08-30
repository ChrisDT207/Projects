using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    abstract class ResturantServices
    {
        private int serviceNumber;
        private int numberOfGuests;
        private string serviceType;
        private int timeLimit;
        private string currentStatus;

        protected ResturantServices(int serviceNumber, int numberOfGuests, string serviceType, int timeLimit, string currentStatus)
        {
            this.ServiceNumber = serviceNumber;
            this.NumberOfGuests = numberOfGuests;
            this.ServiceType = serviceType;
            this.TimeLimit = timeLimit;
            this.CurrentStatus = currentStatus;
        }

        public int ServiceNumber { get => serviceNumber; set => serviceNumber = value; }
        public int NumberOfGuests { get => numberOfGuests; set => numberOfGuests = value; }
        public string ServiceType { get => serviceType; set => serviceType = value; }
        public int TimeLimit { get => timeLimit; set => timeLimit = value; }
        public string CurrentStatus { get => currentStatus; set => currentStatus = value; }

        public abstract void Services();
    }
}
